import { AxiosInstance } from 'axios'
import { AxiosFactory } from '../axios.factory'

import { User } from '@/model/administration/user.model'
import { UserPageRequest } from '@/model/utils/user.page-request'
import { PageResponse } from '@/model/utils/page-response'

export class UserClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = AxiosFactory.create('api/users')
  }

  public async save(user: User) {
    try {
      const response = await this.axiosClient.post('/', user)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async update(user: User) {
    try {
      const response = await this.axiosClient.put(`/${user.id}`, user)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async delete(userId: number) {
    try {
      const response = await this.axiosClient.delete(`/${userId}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async findById(userId: number): Promise<User> {
    try {
      const response = await this.axiosClient.get<User>(`/${userId}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async find(pageRequest: UserPageRequest): Promise<PageResponse<User>> {
    try {
      let requestPath = `?page=${pageRequest.page}&size=${pageRequest.size}`

      if (pageRequest.sort && pageRequest.sort !== '') {
        requestPath = `${requestPath}&sort=${pageRequest.sort}&direction=${pageRequest.direction}`
      }

      const response = await this.axiosClient.get<PageResponse<User>>(requestPath, {
        params: {
          filter: pageRequest.filter
        }
      })
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }
}
