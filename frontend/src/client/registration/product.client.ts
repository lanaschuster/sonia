import { AxiosInstance } from 'axios'
import { AxiosFactory } from '../axios.factory'

import { Product } from '@/model/registration/product.model'
import { ProductPageRequest } from '@/model/utils/product.page-request'
import { PageResponse } from '@/model/utils/page-response'

export class ProductClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = AxiosFactory.create('api/products')
  }

  public async save(product: Product) {
    try {
      const response = await this.axiosClient.post('/', product)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async update(product: Product) {
    try {
      const response = await this.axiosClient.put(`/${product.id}`, product)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async delete(productId: number) {
    try {
      const response = await this.axiosClient.delete(`/${productId}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async findById(productId: number): Promise<Product> {
    try {
      const response = await this.axiosClient.get<Product>(`/${productId}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.response)
    }
  }

  public async find(pageRequest: ProductPageRequest): Promise<PageResponse<Product>> {
    try {
      let requestPath = `?page=${pageRequest.page}&size=${pageRequest.size}`

      if (pageRequest.sort && pageRequest.sort !== '') {
        requestPath = `${requestPath}&sort=${pageRequest.sort}&direction=${pageRequest.direction}`
      }

      const response = await this.axiosClient.get<PageResponse<Product>>(requestPath, {
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
