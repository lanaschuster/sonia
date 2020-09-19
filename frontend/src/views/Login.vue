<template>
  <div>
    <validation-observer ref="formObserver" v-slot="{ passes, invalid }">
      <validation-provider
        rules="required"
        v-slot="{ errors, valid }"
        name="Login" >
        <b-field
          :message="errors"
          :type="{ 'is-danger': errors[0], 'is-success': valid }">
          <b-input
            type="text"
            icon="user"
            tabindex="1"
            size="is-large"
            icon-pack="fas"
            v-model="credential.username"
            placeholder="Login"/>
        </b-field>
      </validation-provider>
      <validation-provider
        rules="required"
        v-slot="{ errors, valid }"
        name="Senha">
        <b-field
          :message="errors"
          :type="{ 'is-danger': errors[0], 'is-success': valid }">
          <b-input
            icon="lock"
            tabindex="2"
            type="password"
            size="is-large"
            icon-pack="fas"
            password-reveal
            v-model="credential.password"
            placeholder="Senha"
            @keypress.native.enter="passes(login)"
            />
        </b-field>
      </validation-provider>
      <b-button
        tabindex="3"
        size="is-large"
        type="is-primary"
        :loading="loading"
        :disabled="invalid || loading"
        class="is-block is-fullwidth"
        @click.prevent="passes(login)">
        Login
      </b-button>
    </validation-observer>
    <p class="has-text-grey has-margin-top-6">
      <router-link :to="{ name: 'forgot-password' }">
        Esqueci a minha senha
      </router-link>
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import FormUtilities from '../mixins/form-utilities.mixin'
import { Credential } from '../model/administration/credential.model'
import UserSessionModule from '../store/user-session.module'

@Component
export default class Login extends Mixins(FormUtilities) {
  private credential = new Credential()
  private userSessionModule!: UserSessionModule

  private mounted(): void {
    this.userSessionModule.load()
    if (this.userSessionModule.isLoggedIn) {
      this.$router.push({ name: 'home' })
    }
  }

  private created(): void {
    this.userSessionModule = getModule(UserSessionModule, this.$store)
  }

  private login(): void {
    this.loading = true
    this.userSessionModule.login(this.credential)
      .then(
        () => {
          this.$router.push(this.$router.currentRoute.params.redirect || { name: 'home' })
          this.loading = false
        }
      ).catch(error => {
        this.credential.password = ''
        this.clearValidations()
        this.toastWarning('Login inválido')
        this.loading = false
      })
  }
}
</script>
