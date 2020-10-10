<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div v-if="adding()" class="title">Cadastrando usuário</div>
          <div v-else-if="editing" class="title">Editando usuário</div>
          <div v-else-if="detailing" class="title">Detalhando usuário</div>
          <div v-else-if="deleting" class="title">Excluindo usuário</div>
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
                <router-link :to="{ name: 'administration' }">Administração</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'users' }">Usuários</router-link>
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
      <div class="column is-4">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Nome" >
          <b-field
            label="Nome"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-input :disabled="detailing" v-model="user.name" />
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-4">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Username" >
          <b-field
            label="Username"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-input :disabled="detailing"  v-model="user.username"/>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-4">
        <validation-provider
          rules="required|email"
          v-slot="{ errors, valid }"
          name="E-mail" >
          <b-field 
            label="E-mail"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-input :disabled="detailing" v-model="user.email"/>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-4">
        <validation-provider
          vid="password"
          :rules="{ required: !editing, min: 6 }"
          v-slot="{ errors, valid }"
          name="Senha" >
          <b-field 
            label="Senha"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-input type="password" 
              :disabled="detailing" 
              v-model="user.password"/>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-4">
        <validation-provider
          :rules="{ required: !editing, matchPassword: '@password' }"
          v-slot="{ errors, valid }"
          name="Confirmação de senha" >
          <b-field 
            label="Confirmação de senha"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-input type="password" 
              :disabled="detailing"
              v-model="user.confirmPassword"/>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-4">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Tipo" >
          <b-field 
            label="Permissão"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-taginput
              autocomplete
              :data="permissions"
              v-model="user.permissions"
              maxtags="1"
              icon="label"
              placeholder="Selecione uma permissão">
            </b-taginput>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-12 has-text-right">
        <span v-if="deleting"
          class="is-inline has-margin-right-5 has-text-danger delete-message">
          Tem certeza que deseja excluir esse usuário? A operação não poderá ser desfeita.
        </span>
        <b-button
          v-if="adding()"
          :disable="invalid"
          @click.prevent="passes(createUser)"
          type="is-success">
          Salvar
        </b-button>
        <b-button
          v-if="editing"
          :disable="invalid"
          @click.prevent="passes(updateUser)"
          type="is-success">
          Atualizar
        </b-button>
        <b-button
          v-if="deleting"
          @click.prevent="deleteUser"
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

import { User } from '../../../model/administration/user.model'
import { UserClient } from '../../../client/administration/user.client'
import { PermissionType } from '../../../model/administration/permission.enum';

@Component
export default class UserForm extends Mixins(FormUtilities) {
  private user: User = new User()
  private userClient!: UserClient

  private permissions = Object.keys(PermissionType)

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
    this.userClient = new UserClient()
    if (!this.adding()) {
      this.loadUser()
    }
  }

  private adding(): boolean {
    return (!this.editing && !this.deleting && !this.detailing)
  }

  private loadUser(): void {
    this.userClient.findById(+this.id)
      .then((success) => {
        this.user = success
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }

  private createUser(): void {
    
    this.userClient.save(this.user)
      .then((success) => {
        this.toastSuccess('Usuário cadastrado com sucesso.')
        this.$router.push({ name: 'users' })
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }

  private updateUser(): void {
    this.userClient.update(this.user)
      .then((success) => {
        this.toastSuccess('Usuário atualizado com sucesso.')
        this.$router.push({ name: 'users' })
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }

  private deleteUser(): void {
    this.userClient.delete(+this.id)
      .then((success) => {
        this.toastSuccess('Usuário excluído com sucesso.')
        this.$router.push({ name: 'users' })
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }
}
</script>
