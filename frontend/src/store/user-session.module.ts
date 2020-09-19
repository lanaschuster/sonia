import Vue from 'vue'

import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators'

import { Token } from '../model/administration/token.model'
import { Principal } from '../model/administration/principal.model'
import { Credential } from '../model/administration/credential.model'
import { userSessionKey } from '../model/utils/configurations'

import { TokenClient } from '../client/administration/token.client'
import { UserSessionClient } from '../client/administration/user-session.client'

import router from '../router/index'

@Module({ name: 'UserSessionModule', namespaced: true })
export default class UserSessionModule extends VuexModule {
  public token: Token | null = null
  public principal: Principal | null = null

  @MutationAction({ rawError: true, mutate: ['token', 'principal'] })
  public async login(credencial: Credential) {
    const token: Token = await new TokenClient().requestToken(credencial)
    Vue.prototype.$cookies.set(userSessionKey, { token: token.access_token, principal: {} })

    const principal: Principal = await new UserSessionClient().me()
    Vue.prototype.$cookies.set(userSessionKey, { token: token.access_token, principal: principal })

    return { token: token.access_token, principal: principal }
  }

  @Action({ rawError: true })
  public async loginValidate() {
    this.context.dispatch('load')

    if (this.token) {
      new TokenClient().checkToken(this.token)
        .then(null, error => {
          if (error.data.error === 'invalid_token') {
            this.context.dispatch('logout')
            router.push({ name: 'login' })
          }
        })
    } else {
      this.context.dispatch('logout')
      router.push({ name: 'login' })
    }
  }

  @Action
  public logout(): void {
    this.context.commit('setToken', null)
    this.context.commit('setPrincipal', null)
    Vue.prototype.$cookies.remove(userSessionKey)
  }

  @Action
  public load(): void {
    const userSession = Vue.prototype.$cookies.get(userSessionKey)
    if (userSession !== null) {
      this.context.commit('setToken', userSession.token)
      this.context.commit('setPrincipal', userSession.principal)
    }
  }

  @Mutation
  private setToken(token: Token): void {
    this.token = token
  }

  @Mutation
  private setPrincipal(principal: Principal): void {
    this.principal = principal
  }

  get principalEmail(): string | undefined {
    return this.principal?.email
  }

  get principalName(): string | undefined {
    return this.principal?.name
  }

  get principalLogin(): string | undefined {
    return this.principal?.username
  }

  get permissions(): string[] | undefined {
    return this.principal?.permissions
  }

  get isLoggedIn(): boolean {
    return this.token !== null && this.principal !== null
  }
}
