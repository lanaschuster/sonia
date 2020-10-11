<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div v-if="adding()" class="title">Cadastrando planejamento</div>
          <div v-else-if="editing" class="title">Editando planejamento</div>
          <div v-else-if="detailing" class="title">Detalhando planejamento</div>
          <div v-else-if="deleting" class="title">Excluindo planejamento</div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <router-link :to="{ name: 'home' }">
                  <b-icon size="is-small" icon="home"/>
                  Home
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'shopping' }">Compras</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'plannings' }">Planejamentos</router-link>
              </li>
              <li class="is-active">
                <a v-if="adding()" href="#" aria-current="page"> Cadastrar </a>
                <a v-else-if="editing" href="#" aria-current="page"> Editar </a>
                <a v-else-if="detailing" href="#" aria-current="page"> Detalhar </a>
                <a v-else-if="deleting" href="#" aria-current="page"> Excluir </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <validation-observer ref="formObserver" v-slot="{ passes, invalid }" class="columns is-multiline">
      <div class="column is-6">
        <b-field
          label="Solicitante"
          type="is-success">
          <b-input disabled="true" v-model="planning.requester.name" />
        </b-field>
      </div>
      <div class="column is-6">
        <b-field
          label="Departamento"
          type="is-success">
          <b-input disabled="true" v-model="planning.department.name" />
        </b-field>
      </div>
      <div class="column is-4">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Data da compra" >
          <b-field
            label="Data da compra"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-datepicker
              expanded
              :disabled="detailing || deleting" 
              v-model="planning.purchaseDate" 
              placeholder="Selecione a data prevista da compra">
            </b-datepicker>
          </b-field>
        </validation-provider>
      </div>
       <div class="column is-4">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Tipo" >
          <b-field 
            label="Categoria"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-select
              required
              expanded
              :disabled="detailing || deleting"
              v-model="planning.category">
              <option
                v-for="(category, index) in categories"
                :key="index"
                :value="category">
                  {{ category }}
              </option>
            </b-select>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-4">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Valor total estimado" >
          <b-field
            label="Valor total estimado"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-input
              type="number"
              :disabled="detailing || deleting" 
              v-model="planning.budget">
            </b-input>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-12">
        <b-field
          label="Descrição"
          type="is-success">
          <b-input
            type="textarea"
            :disabled="detailing || deleting"
            v-model="planning.description"
            placeholder="Descrição e justificativa da compra prevista"/>
        </b-field>
      </div>
      <div class="column is-12 has-text-right">
        <span v-if="deleting"
          class="is-inline has-margin-right-5 has-text-danger delete-message">
          Tem certeza que deseja excluir esse planejamento? A operação não poderá ser desfeita.
        </span>
        <b-button
          v-if="adding()"
          :disable="invalid"
          @click.prevent="passes(createPlanning)"
          type="is-success">
          Salvar
        </b-button>
        <b-button
          v-if="editing"
          :disable="invalid"
          @click.prevent="passes(updatePlanning)"
          type="is-success">
          Atualizar
        </b-button>
        <b-button
          v-if="deleting"
          @click.prevent="deletePlanning"
          type="is-danger">
          Excluir
        </b-button>
        <b-button
          @click.prevent="goBack(-1)"
          type="is-primary has-margin-left-7">
          Voltar
        </b-button>
      </div>
    </validation-observer>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop } from "vue-property-decorator";
import FormUtilities from '../../../mixins/form-utilities.mixin'

import { Category } from '../../../model/registration/category.enum'
import { Planning } from '../../../model/shopping/planning.model'
import { PlanningClient } from '../../../client/shopping/planning.client'
import { UserClient } from '../../../client/administration/user.client'

import UserSessionModule from '../../../store/user-session.module'
import { getModule } from "vuex-module-decorators";

@Component
export default class PlanningForm extends Mixins(FormUtilities) {
  private planning: Planning = new Planning()
  private planningClient!: PlanningClient
  private userClient!: UserClient
  private categories = Object.keys(Category)

  private userSessionModule!: UserSessionModule

  @Prop({
    type: String,
    required: false
  })
  private readonly id!: string
  @Prop({
    type: Boolean,
    required: false
  })
  private readonly editing!: boolean
  @Prop({
    type: Boolean,
    required: false
  })
  private readonly detailing!: boolean
  @Prop({
    type: Boolean,
    required: false
  })
  private readonly deleting!: boolean

  private created(): void {
    this.planningClient = new PlanningClient()
    this.userClient = new UserClient()
    this.userSessionModule = getModule(UserSessionModule, this.$store)

    if (!this.adding()) {
      this.loadPlanning()
    } else {
      this.loadRequesterData()
    }

  }

  private adding(): boolean {
    return (!this.editing && !this.deleting && !this.detailing)
  }

  private loadRequesterData(): void {    
    if (!this.userSessionModule.principal) return

    this.loading = true
    const username = this.userSessionModule.principal.username

    this.userClient.findByUsername(username)
      .then(success => {
        this.planning.requester = success
        this.planning.department = success.workers[0].department
      }).catch(error => {
        this.shouldLog(error)
      })
  }

  private loadPlanning(): void {
    this.planningClient.findById(+this.id)
      .then((success) => {
        this.planning = success
        this.planning.purchaseDate = new Date(success.purchaseDate)
      }).catch(error => {
        this.shouldLog(error)
      })
  }

  private createPlanning(): void {
    this.planningClient.save(this.planning)
      .then((success) => {
        this.toastSuccess('Planejamento cadastrado com sucesso.')
        this.$router.push({ name: 'plannings' })
      }).catch(error => {
        this.shouldLog(error)
      })
  }

  private updatePlanning(): void {
    this.planningClient.update(this.planning)
      .then((success) => {
        this.toastSuccess('Planejamento atualizado com sucesso.')
        this.$router.push({ name: 'plannings' })
      }).catch(error => {
        this.shouldLog(error)
      })
  }

  private deletePlanning(): void {
    this.planningClient.delete(+this.id)
      .then((success) => {
        this.toastSuccess('Planejamento excluído com sucesso.')
        this.$router.push({ name: 'plannings' })
      }).catch(error => {
        this.shouldLog(error)
      })
  }
}
</script>
