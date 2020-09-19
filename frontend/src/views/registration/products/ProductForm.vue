<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div v-if="adding()" class="title">Cadastrando produto ou serviço</div>
          <div v-else-if="editing" class="title">Editando produto ou serviço</div>
          <div v-else-if="detailing" class="title">Detalhando produto ou serviço</div>
          <div v-else-if="deleting" class="title">Excluindo produto ou serviço</div>
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
                <router-link :to="{ name: 'products' }">Produtos e Serviços</router-link>
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
            <b-input :disabled="detailing" v-model="product.name" />
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-4">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Código" >
          <b-field
            label="Código"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-input :disabled="detailing"  v-model="product.code"/>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-4">
        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Tipo" >
          <b-field 
            label="Tipo"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-select
              required
              expanded
              :disabled="detailing || deleting"
              v-model="product.type">
              <option
                v-for="(productType, index) in types"
                :key="index"
                :value="productType">
                  {{ productType === 'PRODUCT' ? 'Produto' : 'Serviço' }}
              </option>
            </b-select>
          </b-field>
        </validation-provider>
      </div>
      <div class="column is-12">
        <validation-provider
          v-slot="{ errors, valid }"
          name="Descrição" >
          <b-field 
            label="Descrição"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }">
            <b-input 
              :disabled="detailing" 
              v-model="product.description"/>
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
          @click.prevent="passes(createProduct)"
          type="is-success">
          Salvar
        </b-button>
        <b-button
          v-if="editing"
          :disable="invalid"
          @click.prevent="passes(updateProduct)"
          type="is-success">
          Atualizar
        </b-button>
        <b-button
          v-if="deleting"
          @click.prevent="deleteProduct"
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

import { Product } from '../../../model/registration/product.model'
import { ProductType } from '../../../model/registration/product-type.enum'
import { ProductClient } from '../../../client/registration/product.client'

@Component
export default class ProductForm extends Mixins(FormUtilities) {
  private product: Product = new Product()
  private productClient!: ProductClient
  private types = Object.keys(ProductType)

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
    this.productClient = new ProductClient()
    if (!this.adding()) {
      this.loadProduct()
    }
  }

  private adding(): boolean {
    return (!this.editing && !this.deleting && !this.detailing)
  }

  private loadProduct(): void {
    this.productClient.findById(+this.id)
      .then((success) => {
        this.product = success
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }

  private createProduct(): void {
    this.productClient.save(this.product)
      .then((success) => {
        this.toastSuccess('Produto ou serviço cadastrado com sucesso.')
        this.$router.push({ name: 'products' })
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }

  private updateProduct(): void {
    this.productClient.update(this.product)
      .then((success) => {
        this.toastSuccess('Produto ou serviço atualizado com sucesso.')
        this.$router.push({ name: 'products' })
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }

  private deleteProduct(): void {
    this.productClient.delete(+this.id)
      .then((success) => {
        this.toastSuccess('Produto ou serviço excluído com sucesso.')
        this.$router.push({ name: 'products' })
      }).catch(error => {
        this.toastWarning(error.data.error)
      })
  }
}
</script>
