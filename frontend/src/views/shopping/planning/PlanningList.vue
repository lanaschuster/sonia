<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title">Listando planejamentos</div>
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
              placeholder="Buscar código"
              @keypress.native.enter="loadPlannings"/>
            <p class="control">
              <b-button
                @click.prevent="loadPlannings()"
                type="is-primary">
                Buscar
              </b-button>
            </p>
          </b-field>
      </div>
      <div class="column has-text-right">
        <b-button type="is-primary" @click.prevent="toAddPlanning()">Cadastrar</b-button>
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
              <b-table-column field="department.name" label="Departamento" sortable>
                {{ props.row.department.name }}
              </b-table-column>
              <b-table-column field="requester.name" label="Solicitante" sortable>
                {{ props.row.requester.name }}
              </b-table-column>
              <b-table-column field="category" label="Categoria" sortable>
                {{ props.row.category }}
              </b-table-column>
              <b-table-column field="budget" label="Total" sortable>
                {{ props.row.budget }}
              </b-table-column>
              <b-table-column field="purchaseDate" label="Data da compra" sortable>
                {{ props.row.purchaseDate }}
              </b-table-column>
              <b-table-column label="Ações" width="10%">
                <div class="buttons is-right">
                  <b-button
                    data-tooltip="Editar"
                    type="is-primary"
                    icon-left="file-edit"
                    @click.prevent="toEditPlanning(props.row.id)"/>
                  <b-button
                    data-tooltip="Excluir"
                    type="is-danger"
                    class="has-margin-left-7"
                    icon-left="trash-can-outline"
                    @click.prevent="toDeletePlanning(props.row.id)"/>
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
                  <p>Nenhum planejamento encontrado</p>
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

import { Planning } from '../../../model/shopping/planning.model'
import { PlanningClient } from '../../../client/shopping/planning.client'
import { PageRequest } from "../../../model/utils/page-request";
import { PageResponse } from "../../../model/utils/page-response";

@Component
export default class PlanningList extends Mixins(FormUtilities) {
  private planningClient!: PlanningClient
  
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<Planning> = new PageResponse()

  private created(): void {
    this.planningClient = new PlanningClient()
    this.loadPlannings()
  }

  private loadPlannings(): void {
    this.loading = true
    this.planningClient.find(this.pageRequest)
      .then(success => {
        this.pageResponse = success
      }).catch(error => {
        this.shouldLog(error)
      }).finally(() => {
        this.loading = false
      })
  }

  private onPageChange(page: number): void {
    this.pageRequest.page = page - 1
    this.loadPlannings()
  }

  private onSort(field: string, order: string): void {
    this.pageRequest.sort = field
    this.pageRequest.direction = order
    this.loadPlannings()
  }

  @Watch('pageRequest.size')
  private onPageSizeChange() {
    this.loadPlannings()
  }

  private toAddPlanning(): void {
    this.$router.push({ name: 'plannings.add' })
  }

  private toEditPlanning(id: number): void {
    this.$router.push({ name: 'plannings.edit', params: { id: id.toString() } })
  }

  private toDeletePlanning(id: number): void {
    this.$router.push({ name: 'plannings.delete', params: { id: id.toString() } })
  }

  private onLineSelected(row: Planning): void {
    this.$router.push({ name: 'plannings.detail', params: { id: row.id.toString() } })
  }
}
</script>
