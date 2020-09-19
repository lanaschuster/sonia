import { AxiosInstance } from 'axios'
import { AxiosFactory } from '../axios.factory'

import { Department } from '@/model/registration/department.model'
import { DepartmentPageRequest } from '@/model/utils/department.page-request'
import { PageResponse } from '@/model/utils/page-response'

export class DepartmentClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = AxiosFactory.create('api/departments')
  }

  public async save(department: Department) {
    try {
      const response = await this.axiosClient.post('/', department)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async update(department: Department) {
    try {
      const response = await this.axiosClient.put(`/${department.id}`, department)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async delete(departmentId: number) {
    try {
      const response = await this.axiosClient.delete(`/${departmentId}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async findById(departmentId: number): Promise<Department> {
    try {
      const response = await this.axiosClient.get<Department>(`/${departmentId}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async find(pageRequest: DepartmentPageRequest): Promise<PageResponse<Department>> {
    try {
      let requestPath = `?page=${pageRequest.page}&size=${pageRequest.size}`

      if (pageRequest.sort && pageRequest.sort !== '') {
        requestPath = `${requestPath}&sort=${pageRequest.sort}&direction=${pageRequest.direction}`
      }

      const response = await this.axiosClient.get<PageResponse<Department>>(requestPath, {
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
