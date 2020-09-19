import Vue from 'vue'

import Axios, { AxiosInstance } from 'axios'

import { apiBaseUrl, userSessionKey } from '../model/utils/configurations'

export class AxiosFactory {
  public static create(requestPath: string, requireAuth = true): AxiosInstance {
    const header = requireAuth ? {
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.getAccessToken()}`
    } : {
      'Content-type': 'application/json'
    }
    return this.build(requestPath, header)
  }

  public static build(requestPath: string, header: Record<string, unknown>): AxiosInstance {
    return Axios.create({
      baseURL: `${apiBaseUrl}/${requestPath}`,
      headers: { ...header }
    })
  }

  public static getAccessToken(): string {
    const userSession = Vue.prototype.$cookies.get(userSessionKey)
    return userSession !== null ? userSession.token : ''
  }
}
