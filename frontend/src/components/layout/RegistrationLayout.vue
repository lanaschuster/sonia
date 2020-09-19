<template>
  <div class="columns">
    <aside class="column is-2">
      <b-menu>
        <b-menu-list label="Cadastros">
          <!-- <b-menu-item
            tag="router-link"
            label="Prazos"/> -->
          <!-- <b-menu-item
            :to="{ name: 'editais' }"
            tag="router-link"
            label="Editais"/> -->
          <b-menu-item
            :to="{ name: 'products' }"
            tag="router-link"
            label="Produtos e Serviços"/>
          <b-menu-item
            :to="{ name: 'departments' }"
            tag="router-link"
            label="Departamentos"/>
        </b-menu-list>
      </b-menu>
    </aside>
    <fade-transition :duration="200" origin="center top" mode="out-in">
      <router-view />
    </fade-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { FadeTransition } from 'vue2-transitions'

@Component({
  components: {
    FadeTransition
  }
})
export default class RegistrationLayout extends Vue { }
</script>
