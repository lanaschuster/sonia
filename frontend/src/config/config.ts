export const userSessionKey = '__s0ni4_s3ssi0n'
export const apiBaseUrl = process.env.VUE_APP_API_URL || 'http://localhost:8080'
export const apiClientId = process.env.VUE_APP_CLIENT_ID || 'sonia-web'
export const apiClientSecret = process.env.VUE_APP_CLIENT_SECRET || 'sonia-web'

export const authorities = {
  admin: 'admin'
}

export default { userSessionKey, apiBaseUrl, apiClientId, apiClientSecret, authorities }
