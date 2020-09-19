<template>
  <div>
    <main-menu />
    <div id="content" class="section">
      <router-view/>
    </div>
    <error-handler></error-handler>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import MainMenu from '../menu/MainMenu.vue'
import ErrorHandler from '../ErrorHandler.vue'
import UserSessionModule from '../../store/user-session.module'
import { getModule } from 'vuex-module-decorators'

@Component({
  components: {
    MainMenu,
    ErrorHandler
  }
})
export default class DefaultLayout extends Vue {
  private userSessionModule!: UserSessionModule

  private created(): void {
    this.userSessionModule = getModule(UserSessionModule, this.$store)
    this.userSessionModule.loginValidate()
  }
}
</script>
