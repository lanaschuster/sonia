<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div v-if="adding()" class="title">Cadastrando departamento</div>
          <div v-else-if="editing" class="title">Editando departamento</div>
          <div v-else-if="detailing" class="title">Detalhando departamento</div>
          <div v-else-if="deleting" class="title">Excluindo departamento</div>
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
                <router-link :to="{ name: 'registration' }">Cadastro</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'departments' }">Departamentos</router-link>
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
      <div class="column is-12">
        <h3 class="subtitle" style="margin: 0; display: inline-block;">
          Dados do departamento
        </h3>
        <hr>
      </div>
      <div class="column is-6">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Nome" >
          <b-field
            label="Nome"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-input :disabled="detailing" v-model="department.name" />
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-6">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Código" >
          <b-field
            label="Código"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-input :disabled="detailing"  v-model="department.code"/>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-12">
        <h3 class="subtitle" style="margin: 0; display: inline-block;">
          Gerência
        </h3>
        <hr>
      </div>
      <div class="column is-6">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Gerente" >
          <b-field
            label="Gerente"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-autocomplete
              :readonly="detailing"
              v-model="manager.user.name"
              placeholder="Buscar por nome"
              :data="managerPageResponse.content"
              field="name"
              icon="magnify"
              :keep-first="false"
              :open-on-focus="false"
              :loading="managerLoading"
              :check-infinite-scroll="true"
              @input="searchManager"
              @infinite-scroll="searchManager($event, true)"
              @select="option => selectManager(option)">
              <template slot-scope="props">
                <p>{{ props.option.name }}</p>
              </template>
              <template slot="empty">
                <span v-if="managerLoading">Carregando...</span>
                <span v-else>Nenhum resultado encontrado</span>
              </template>
              <template slot="footer">
                <span
                  v-show="managerPageRequest.page > managerPageResponse.totalPages"
                  class="has-text-grey">
                  Todos os itens já foram listados
                </span>
              </template>
            </b-autocomplete>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-6">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Substituto" >
          <b-field
            label="Substituto"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-autocomplete
              :readonly="detailing"
              v-model="substitute.user.name"
              placeholder="Buscar por nome"
              :data="substitutePageResponse.content"
              field="name"
              icon="magnify"
              :keep-first="false"
              :open-on-focus="false"
              :loading="substituteLoading"
              :check-infinite-scroll="true"
              @input="searchSubstitute"
              @infinite-scroll="searchSubstitute($event, true)"
              @select="option => selectSubstitute(option)">
              <template slot-scope="props">
                <p>{{ props.option.name }}</p>
              </template>
              <template slot="empty">
                <span v-if="substituteLoading">Carregando...</span>
                <span v-else>Nenhum resultado encontrado</span>
              </template>
              <template slot="footer">
                <span
                  v-show="substitutePageRequest.page > substitutePageResponse.totalPages"
                  class="has-text-grey">
                  Todos os itens já foram listados
                </span>
              </template>
            </b-autocomplete>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-12">
        <h3 class="subtitle" style="margin: 0; display: inline-block;">
          Colaboradores
        </h3>
        <hr>
      </div>
      <div class="column is-6" v-if="!detailing && !deleting">
        <b-field>
          <b-autocomplete
            v-model="user.name"
            placeholder="Buscar por nome"
            :data="pageResponse.content"
            field="name"
            icon="magnify"
            :keep-first="false"
            :open-on-focus="false"
            :loading="userLoading"
            :check-infinite-scroll="true"
            @input="searchUser"
            @infinite-scroll="searchUser($event, true)"
            @select="option => selectUser(option)">
            <template slot-scope="props">
              <p>{{ props.option.name }}</p>
            </template>
            <template slot="empty">
              <span v-if="userLoading">Carregando...</span>
              <span v-else>Nenhum resultado encontrado</span>
            </template>
            <template slot="footer">
              <span
                v-show="pageRequest.page > pageResponse.totalPages"
                class="has-text-grey">
                Todos os itens já foram listados
              </span>
            </template>
          </b-autocomplete>
        </b-field>
      </div>
      <div class="column is-6" v-if="!detailing && !deleting">
        <div class="buttons">
          <b-button
            @click.prevent="addUser()"
            type="is-primary">
            Adicionar
          </b-button>
        </div>
      </div>
      <div class="column is-full">
        <b-table
          hoverable
          :loading="loading"
          :data="department.workers">
          <template slot-scope="props">
            <b-table-column field="name" label="Nome">
              {{ props.row.user.name }}
            </b-table-column>
            <b-table-column field="username" label="Username">
              {{ props.row.user.username }}
            </b-table-column>
            <b-table-column field="email" label="Email">
              {{ props.row.user.email }}
            </b-table-column>
            <b-table-column field="actions" label="Ações">
              <div class="buttons">
                <b-button
                  v-if="!detailing && !deleting"
                  data-tooltip="Excluir"
                  type="is-danger"
                  class="has-margin-left-7"
                  icon-left="trash-can-outline"
                  @click.prevent="removeMember(props.row.id)"/>
              </div>
            </b-table-column>
          </template>
          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p><b-icon pack="far" icon="sad-tear" size="is-large"/></p>
                <p>Nenhum colaborador adicionado</p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
      <div class="column is-12 has-text-right">
        <span v-if="deleting"
          class="is-inline has-margin-right-5 has-text-danger delete-message">
          Tem certeza que deseja excluir esse departamento? A operação não poderá ser desfeita.
        </span>
        <b-button
          v-if="adding()"
          :disable="invalid"
          @click.prevent="passes(createDepartment)"
          type="is-success">
          Salvar
        </b-button>
        <b-button
          v-if="editing"
          :disable="invalid"
          @click.prevent="passes(updateDepartment)"
          type="is-success">
          Atualizar
        </b-button>
        <b-button
          v-if="deleting"
          @click.prevent="deleteDepartment"
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

import { Department } from '../../../model/registration/department.model'
import { DepartmentClient } from '../../../client/registration/department.client'
import { UserClient } from '../../../client/administration/user.client'
import { WorkerClient } from '../../../client/registration/worker.client'
import { User } from "../../../model/administration/user.model";
import { UserPageRequest } from "../../../model/utils/user.page-request";
import { PageResponse } from "../../../model/utils/page-response";
import { Worker } from "../../../model/registration/worker.model";

@Component
export default class DepartmentForm extends Mixins(FormUtilities) {
  private department: Department = new Department()
  private departmentClient!: DepartmentClient
  private workerClient!: WorkerClient
  private userClient!: UserClient
  
  private managerLoading = false
  private manager: Worker = new Worker()
  private managerPageRequest: UserPageRequest = new UserPageRequest()
  private managerPageResponse: PageResponse<User> = new PageResponse()

  private substituteLoading = false
  private substitute: Worker = new Worker()
  private substitutePageRequest: UserPageRequest = new UserPageRequest()
  private substitutePageResponse: PageResponse<User> = new PageResponse()

  private userLoading = false
  private user: User = new User()
  private pageRequest: UserPageRequest = new UserPageRequest()
  private pageResponse: PageResponse<User> = new PageResponse()

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
    this.departmentClient = new DepartmentClient()
    this.workerClient = new WorkerClient()
    this.userClient = new UserClient()

    this.manager.user = new User()
    this.substitute.user = new User()

    if (!this.adding()) {
      this.loadDepartment()
      this.loadWorkers()
    }
  }

  private adding(): boolean {
    return (!this.editing && !this.deleting && !this.detailing)
  }

  private loadDepartment(): void {
    this.loading = true
    this.departmentClient.findById(+this.id)
      .then((success) => {
        this.department = success
        this.loading = false
      }).catch(error => {
        this.toastWarning(error)
        this.loading = false
      })
  }

  private loadWorkers(): void {
    this.loading = true
    this.workerClient.findByDepartmentId(+this.id)
      .then((success) => {
        this.department.workers = success
        success.forEach(worker => {
          if (worker.isManager) {
            this.manager = worker
          }

          if (worker.isSubstitute) {
            this.substitute = worker
          }
        })

        this.loading = false
      }).catch(error => {
        console.log(error)
        this.toastWarning(error.data.error)
        this.loading = false
      })
  }

  private searchManager(event: string, scrollEnd = false): void {
    if (event === '') {
      this.manager.user = new User()
      return
    }

    this.managerLoading = true
    if (scrollEnd) this.managerPageRequest.page++
    else this.managerPageResponse.content = []

    if (this.managerPageRequest.filter !== this.manager.user.name) {
      this.managerPageRequest.filter = this.manager.user.name
      this.managerPageRequest.page = 0
      this.managerPageResponse.content = []
      this.managerPageResponse.totalPages = 0
    }

    if (!this.manager.user.name || this.manager.user.name === '') {
      this.managerPageRequest.page = 0
      this.managerPageResponse.content = []
      this.managerPageResponse.totalPages = 0
      this.managerLoading = false
      return
    }

    this.userClient.find(this.managerPageRequest)
      .then(
        success => {
          success.content.forEach(user => this.managerPageResponse.content.push(user))
          this.managerPageResponse.totalPages = success.totalPages
          this.managerLoading = false
        }
      ).catch((error) => {
        this.toastWarning(error.data.error)
        this.managerLoading = false
      })
  }

  private selectManager(option: User): void {
    if (!option) return
    this.manager.isManager = true
    this.manager.isSubstitute = false
    Object.assign(this.manager.user, option)
    this.department.workers.push(this.manager)
  }

  private searchSubstitute(event: string, scrollEnd = false): void {
    if (event === '') {
      this.substitute.user = new User()
      return
    }

    this.substituteLoading = true
    if (scrollEnd) this.substitutePageRequest.page++
    else this.substitutePageResponse.content = []

    if (this.substitutePageRequest.filter !== this.substitute.user.name) {
      this.substitutePageRequest.filter = this.substitute.user.name
      this.substitutePageRequest.page = 0
      this.substitutePageResponse.content = []
      this.substitutePageResponse.totalPages = 0
    }

    if (!this.substitute.user.name || this.substitute.user.name === '') {
      this.substitutePageRequest.page = 0
      this.substitutePageResponse.content = []
      this.substitutePageResponse.totalPages = 0
      this.substituteLoading = false
      return
    }

    this.userClient.find(this.substitutePageRequest)
      .then(
        success => {
          success.content.forEach(user => this.substitutePageResponse.content.push(user))
          this.substitutePageResponse.totalPages = success.totalPages
          this.substituteLoading = false
        }
      ).catch((error) => {
        this.toastWarning(error.data.error)
        this.substituteLoading = false
      })
  }

  private selectSubstitute(option: User): void {
    if (!option) return
    this.substitute.isManager = false
    this.substitute.isSubstitute = true
    Object.assign(this.substitute.user, option)
    this.department.workers.push(this.substitute)
  }

  private searchUser(event: string, scrollEnd = false): void {
    if (event === '') {
      this.user = new User()
      return
    }

    this.userLoading = true
    if (scrollEnd) this.pageRequest.page++
    else this.pageResponse.content = []

    if (this.pageRequest.filter !== this.user.name) {
      this.pageRequest.filter = this.user.name
      this.pageRequest.page = 0
      this.pageResponse.content = []
      this.pageResponse.totalPages = 0
    }

    if (!this.user.name || this.user.name === '') {
      this.pageRequest.page = 0
      this.pageResponse.content = []
      this.pageResponse.totalPages = 0
      this.userLoading = false
      return
    }

    this.userClient.find(this.pageRequest)
      .then(
        success => {
          success.content.forEach(user => this.pageResponse.content.push(user))
          this.pageResponse.totalPages = success.totalPages
          this.userLoading = false
        }
      ).catch((error) => {
        this.toastWarning(error.data.error)
        this.userLoading = false
      })
  }

  private selectUser(option: User): void {
    if (!option) return
    Object.assign(this.user, option)
  }

  private addUser(): void {
    let worker = new Worker()
    worker.user = new User()
    worker.department = new Department()
    Object.assign(worker.user, this.user)

    if (this.adding()){
      this.department.workers.push(worker)
    } else {
      Object.assign(worker.department, this.department)

      this.workerClient.save(worker)
        .then(success => {
          this.loadWorkers()
        })
        .catch(error => {
          this.toastWarning(error.data.error)
        })
    }

    this.user = new User()
  }

  private removeMember(id: number): void {
    this.workerClient.delete(id)
      .then(() => {
        this.loadWorkers()
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }

  private createDepartment(): void {
    this.departmentClient.save(this.department)
      .then((success) => {
        this.toastSuccess('Departamento cadastrado com sucesso.')
        this.$router.push({ name: 'departments' })
      }).catch(error => {
        console.log(error)
        this.toastWarning(error.data.error)
      })
  }

  private createWorkers(department: Department): void {
    this.department.workers.forEach(worker => {
      worker.department = department
      this.workerClient.save(worker)
        .catch(error => {
          this.toastWarning(error.data.error)
        })
    })
  }

  private updateDepartment(): void {
    this.departmentClient.update(this.department)
      .then((success) => {
        this.toastSuccess('Departamento atualizado com sucesso.')
        this.$router.push({ name: 'departments' })
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }

  private deleteDepartment(): void {
    this.departmentClient.delete(+this.id)
      .then((success) => {
        this.toastSuccess('Departamento excluído com sucesso.')
        this.$router.push({ name: 'departments' })
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }
}
</script>
