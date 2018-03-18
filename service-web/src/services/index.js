import axios from 'axios'
import store from '@/store'
import Convert2GraphQL from 'convert2graphql'

const API_URL = process.env.BASE_API_URL

export const HTTP = axios.create({
  baseURL: API_URL
})

HTTP.defaults.headers.post['Accept'] = 'application/json'

const _responseHandler = (response, name, resolve, reject) => {
  const body = response.data
  if (body.data && body.data[name]) {
    resolve(body.data[name])
  } else {
    errorHandler(response.data.errors, reject)
  }
}

export const errorHandler = (err, reject) => {
  console.log('error -> ', err)
  store.commit('setResponseError', {
    error: err.message || err[0].message || 'Something went wrong, Please try again!!!' || err
  })
  reject(err)
}

export const convertToFormData = (obj) => {
  let formData = new FormData()
  Object.keys(obj).forEach(function (key) {
    formData.append(key, obj[key])
  })
  return formData
}

export const _getHeaders = () => {
  console.log('>>>>>', store.state.auth, store.state.auth.authToken)
  return {
    headers: {
      Authorization: store.state.auth.authToken
    }
  }
}

export const postRequest = (url, name, headers = true) => {
  return new Promise((resolve, reject) => {
    HTTP.post(`graph?query=${encodeURIComponent(url)}`, '', headers ? _getHeaders() : {})
      .then((response) => {
        _responseHandler(response, name, resolve, reject)
      })
      .catch((err) => {
        errorHandler(err, reject)
      })
  })
}

export const createQuery = () => {
  return new Convert2GraphQL()
}

export const createMutation = () => {
  return new Convert2GraphQL('mutation')
}
