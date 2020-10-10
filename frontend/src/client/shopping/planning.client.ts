import { AxiosInstance } from 'axios'
import { AxiosFactory } from '../axios.factory'

import { Planning } from '@/model/shopping/planning.model'
import { PageRequest } from '@/model/utils/page-request'
import { PageResponse } from '@/model/utils/page-response'

export class PlanningClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = AxiosFactory.create('api/plannings')
  }

  public async save(planning: Planning) {
    try {
      const response = await this.axiosClient.post('/', planning)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async update(planning: Planning) {
    try {
      const response = await this.axiosClient.put(`/${planning.id}`, planning)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async delete(planningId: number) {
    try {
      const response = await this.axiosClient.delete(`/${planningId}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async findById(planningId: number): Promise<Planning> {
    try {
      const response = await this.axiosClient.get<Planning>(`/${planningId}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async find(pageRequest: PageRequest): Promise<PageResponse<Planning>> {
    try {
      let requestPath = `?page=${pageRequest.page}&size=${pageRequest.size}`

      if (pageRequest.sort && pageRequest.sort !== '') {
        requestPath = `${requestPath}&sort=${pageRequest.sort}&direction=${pageRequest.direction}`
      }

      const response = await this.axiosClient.get<PageResponse<Planning>>(requestPath, {
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
