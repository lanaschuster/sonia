<template>
  <aside class="column is-2">
    <b-menu>
      <b-menu-list label="Administração">
        <b-menu-item
          :to="{name: 'users'}"
          tag="router-link"
          label="Usuários"/>
      </b-menu-list>
    </b-menu>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'administration-menu' as string
})
</script>
