<template>
  <div class="columns">
    <administration-menu />
    <fade-transition :duration="200" origin="center top" mode="out-in">
      <router-view />
    </fade-transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { FadeTransition } from 'vue2-transitions'

import AdministrationMenu from '../menu/AdministrationMenu.vue'

export default Vue.extend({
  name: 'administration-layout' as string,
  components: {
    FadeTransition,
    AdministrationMenu
  }
})
</script>
