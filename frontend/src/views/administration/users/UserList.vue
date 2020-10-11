<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title">Listando usuários</div>
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
                <a href="#" aria-current="page">
                  Listar
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="columns is-multiline has-padding-top-4">
      <div class="column is-6">
        <b-field>
            <b-input
              expanded
              type="search"
              v-model="pageRequest.filter"
              placeholder="Buscar usuários por nome, username ou e-mail"
              @keypress.native.enter="loadUsers"/>
            <p class="control">
              <b-button
                @click.prevent="loadUsers()"
                type="is-primary">
                Buscar
              </b-button>
            </p>
          </b-field>
      </div>
      <div class="column has-text-right">
        <b-button type="is-primary" @click.prevent="toAddUser()">Cadastrar</b-button>
      </div>
      <div class="column is-full">
        <b-table
            hoverable
            paginated
            backend-sorting
            backend-pagination
            :loading="loading"
            :data="pageResponse.content"
            :per-page="pageRequest.size"
            :total="pageResponse.totalItems"
            @sort="onSort"
            @page-change="onPageChange"
            @select="onLineSelected">
            <template slot-scope="props">
              <b-table-column field="ativo" label="Status" width="5%" sortable>
                <b-tag v-if="props.row.isActive" type="is-success">Ativo</b-tag>
                <b-tag v-else type="is-warning">Inativo</b-tag>
              </b-table-column>
              <b-table-column field="name" label="Nome" sortable>
                {{ props.row.name }}
              </b-table-column>
              <b-table-column field="username" label="Username" sortable>
                {{ props.row.username }}
              </b-table-column>
              <b-table-column field="email" label="Email" sortable>
                {{ props.row.email }}
              </b-table-column>
              <b-table-column label="Ações" width="10%">
                <div class="buttons is-right">
                  <b-button
                    data-tooltip="Editar"
                    type="is-primary"
                    icon-left="file-edit"
                    @click.prevent="toEditUser(props.row.id)"/>
                  <b-button
                    data-tooltip="Excluir"
                    type="is-danger"
                    class="has-margin-left-7"
                    icon-left="trash-can-outline"
                    @click.prevent="toDeleteUser(props.row.id)"/>
                </div>
              </b-table-column>
            </template>
            <template slot="bottom-left">
              <span class="has-margin-right-7">Linhas por página</span>
              <b-select v-model="pageRequest.size">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </b-select>
            </template>
            <template slot="empty">
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p><b-icon pack="far" icon="sad-tear" size="is-large"/></p>
                  <p>Nenhum usuário encontrado</p>
                </div>
              </section>
            </template>
        </b-table>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Watch } from "vue-property-decorator";
import FormUtilities from '../../../mixins/form-utilities.mixin'

import { User } from '../../../model/administration/user.model'
import { UserClient } from '../../../client/administration/user.client'
import { UserPageRequest } from "../../../model/utils/user.page-request";
import { PageResponse } from "../../../model/utils/page-response";

@Component
export default class UserList extends Mixins(FormUtilities) {
  private userClient!: UserClient
  
  private pageRequest: UserPageRequest = new UserPageRequest()
  private pageResponse: PageResponse<User> = new PageResponse()

  private created(): void {
    this.userClient = new UserClient()
    this.loadUsers()
  }

  private loadUsers(): void {
    this.loading = true
    this.userClient.find(this.pageRequest)
      .then(success => {
        this.pageResponse = success
        this.loading = false
      }).catch(error => {
        this.shouldLog(error)
      })
  }

  private onPageChange(page: number): void {
    this.pageRequest.page = page - 1
    this.loadUsers()
  }

  private onSort(field: string, order: string): void {
    this.pageRequest.sort = field
    this.pageRequest.direction = order
    this.loadUsers()
  }

  @Watch('pageRequest.size')
  private onPageSizeChange() {
    this.loadUsers()
  }

  private toAddUser(): void {
    this.$router.push({ name: 'users.add' })
  }

  private toEditUser(id: number): void {
    this.$router.push({ name: 'users.edit', params: { id: id.toString() } })
  }

  private toDeleteUser(id: number): void {
    this.$router.push({ name: 'users.delete', params: { id: id.toString() } })
  }

  private onLineSelected(row: User): void {
    this.$router.push({ name: 'users.detail', params: { id: row.id.toString() } })
  }
}
</script>
