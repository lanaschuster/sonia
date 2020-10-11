<template>
  <header class="hero is-dark">
    <div class="hero-head">
      <nav class="navbar">
        <div class="navbar-brand">
          <a href="/dashboard" class="navbar-item">
            <span class="logo-text">Sonia</span>
          </a>
          <a class="navbar-item is-hidden-desktop"></a>
          <a class="navbar-item is-hidden-desktop"></a>
          <div class="navbar-burger burger" data-target="main-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="menu-principal" class="navbar-menu">
          <div class="navbar-start">
            <router-link class="navbar-item" :to="{ name: 'dashboard' }">
              Dashboard
            </router-link>
            <router-link class="navbar-item" :to="{ name: 'registration' }">
              Cadastros
            </router-link>
            <router-link class="navbar-item" :to="{ name: 'shopping' }">
              Compras
            </router-link>
            <router-link class="navbar-item" :to="{ name: 'administration' }">
              Administração
            </router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <user-menu />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserMenu from './UserMenu.vue'

@Component({
  components: {
    UserMenu
  }
})
export default class MainMenu extends Vue { }
</script>
