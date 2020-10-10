import { AxiosInstance, AxiosRequestConfig } from 'axios'

import { AxiosFactory } from '../axios.factory'

import { Token } from '@/model/administration/token.model'
import { Credential } from '@/model/administration/credential.model'
import { apiClientId, apiClientSecret } from '@/config/config'

export class TokenClient {
  private axios: AxiosInstance

  constructor() {
    this.axios = AxiosFactory.create('auth', false)
  }

  private configure(): AxiosRequestConfig {
    return {
      headers: { 'Content-Type': 'application/json' },
      auth: {
        username: apiClientId,
        password: apiClientSecret
      }
    }
  }

  public async requestToken(credential: Credential): Promise<Token> {
    try {
      const response = await this.axios.post<Token>('/login', credential, this.configure())
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async checkToken(token: Token): Promise<Token> {
    const data = {
      token: token
    }
    
    try {
      const response = await this.axios.post<Token>('/check-token', data, this.configure())
      return response.data
    } catch (error) {
      console.log(error)
      return Promise.reject(error.response)
    }
  }

  public async refreshToken(token: Token, username: string): Promise<Token> {
    const data = new FormData()
    data.append('grant_type', 'refresh_token')
    data.append('username', username)
    data.append('refresh_token', token.refreshToken)

    try {
      const response = await this.axios.post<Token>('/token', data, this.configure())
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }
}
