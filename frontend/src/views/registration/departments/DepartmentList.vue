<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title">Listando departamentos</div>
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
                <router-link :to="{ name: 'registration' }">Cadastros</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'departments' }">Departamentos</router-link>
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
              placeholder="Buscar departamentos por descrição ou código"
              @keypress.native.enter="loadDepartments"/>
            <p class="control">
              <b-button
                @click.prevent="loadDepartments()"
                type="is-primary">
                Buscar
              </b-button>
            </p>
          </b-field>
      </div>
      <div class="column has-text-right">
        <b-button type="is-primary" @click.prevent="toAddDepartment()">Cadastrar</b-button>
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
              <b-table-column field="code" label="Código" sortable>
                {{ props.row.code }}
              </b-table-column>
              <b-table-column field="name" label="Nome" sortable>
                {{ props.row.name }}
              </b-table-column>
              <b-table-column label="Ações" width="10%">
                <div class="buttons is-right">
                  <b-button
                    data-tooltip="Editar"
                    type="is-primary"
                    icon-left="file-edit"
                    @click.prevent="toEditDepartment(props.row.id)"/>
                  <b-button
                    data-tooltip="Excluir"
                    type="is-danger"
                    class="has-margin-left-7"
                    icon-left="trash-can-outline"
                    @click.prevent="toDeleteDepartment(props.row.id)"/>
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
                  <p>Nenhum departamento encontrado</p>
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

import { Department } from '../../../model/registration/department.model'
import { DepartmentClient } from '../../../client/registration/department.client'
import { DepartmentPageRequest } from "../../../model/utils/department.page-request";
import { PageResponse } from "../../../model/utils/page-response";

@Component
export default class DepartmentList extends Mixins(FormUtilities) {
  private departmentClient!: DepartmentClient
  
  private pageRequest: DepartmentPageRequest = new DepartmentPageRequest()
  private pageResponse: PageResponse<Department> = new PageResponse()

  private created(): void {
    this.departmentClient = new DepartmentClient()
    this.loadDepartments()
  }

  private loadDepartments(): void {
    this.loading = true
    this.departmentClient.find(this.pageRequest)
      .then(success => {
        this.pageResponse = success
        this.loading = false
      }).catch(error => {
        this.shouldLog(error)
      })
  }

  private onPageChange(page: number): void {
    this.pageRequest.page = page - 1
    this.loadDepartments()
  }

  private onSort(field: string, order: string): void {
    this.pageRequest.sort = field
    this.pageRequest.direction = order
    this.loadDepartments()
  }

  @Watch('pageRequest.size')
  private onPageSizeChange() {
    this.loadDepartments()
  }

  private toAddDepartment(): void {
    this.$router.push({ name: 'departments.add' })
  }

  private toEditDepartment(id: number): void {
    this.$router.push({ name: 'departments.edit', params: { id: id.toString() } })
  }

  private toDeleteDepartment(id: number): void {
    this.$router.push({ name: 'departments.delete', params: { id: id.toString() } })
  }

  private onLineSelected(row: Department): void {
    this.$router.push({ name: 'departments.detail', params: { id: row.id.toString() } })
  }
}
</script>
