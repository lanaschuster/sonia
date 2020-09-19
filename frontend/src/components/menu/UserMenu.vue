<template>
  <b-dropdown position="is-bottom-left" append-to-body aria-role="menu" trap-focus>
    <button class="button" slot="trigger" slot-scope="{ active }">
      <span v-if="userSessionModule.principalLogin" >{{ userSessionModule.principalLogin }}</span>
      <b-icon pack='fas' size="is-small" :icon="active ? 'angle-up' : 'angle-down'"></b-icon>
    </button>
    <b-dropdown-item aria-role="listitem">
      <b-icon pack='fas' size="is-small" icon="cog"></b-icon>
      Perfil
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem" @click="logout">
      <b-icon pack='fas' size="is-small" icon="sign-out-alt"></b-icon>
      Sair
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import UserSessionModule from '../../store/user-session.module'

export default Vue.extend({
  name: 'user-menu' as string,
  methods: {
    logout() {
      this.userSessionModule.logout()
      this.$router.push({ name: 'login' })
    }
  },
  data() {
    return {
      userSessionModule: {} as UserSessionModule
    }
  },
  mounted() {
    this.userSessionModule.load()
  },
  created(): void {
    this.userSessionModule = getModule(UserSessionModule, this.$store)
  }
})
</script>
