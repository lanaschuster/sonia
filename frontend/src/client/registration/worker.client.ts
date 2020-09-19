import { AxiosInstance } from 'axios'
import { AxiosFactory } from '../axios.factory'

import { Worker } from '@/model/registration/worker.model'

export class WorkerClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = AxiosFactory.create('api/workers')
  }

  public async save(worker: Worker) {
    try {
      const response = await this.axiosClient.post('/', worker)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async update(worker: Worker) {
    try {
      const response = await this.axiosClient.put(`/${worker.id}`, worker)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async delete(workerId: number) {
    try {
      const response = await this.axiosClient.delete(`/${workerId}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async findById(workerId: number): Promise<Worker> {
    try {
      const response = await this.axiosClient.get<Worker>(`/${workerId}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async findByDepartmentId(departmentId: number): Promise<Worker[]> {
    try {
      const response = await this.axiosClient.get<Worker[]>(`/${departmentId}/department`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async findByUserId(userId: number): Promise<Worker[]> {
    try {
      const response = await this.axiosClient.get<Worker[]>(`/${userId}/user`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

}
