import {
  util
} from './tjdUtils'
import axios from 'axios'

var ylAxios = axios.create({
  baseURL: util.constants.tcsupport + 'gateway'
})
ylAxios.defaults.timeout = 45000
ylAxios.defaults.headers.post['Content-Type'] = 'application/json'

ylAxios.interceptors.response.use(({data}) => {
  if (isNaN(data.isSuccess)) {
    data.isSuccess = 1 - ~~data.isSuccess
  }
  if (~~data.isSuccess === 0) {
    return data
  }
  return Promise.reject(data)
}, error => {
  if (error.response) {
    return Promise.reject('系统繁忙，请稍后再试')
  } else {
    return Promise.reject(error.message)
  }
})

export const ylServices = {
  request: (params = {}, type = 'post') => {
    return ylAxios[type]('', Object.assign({}, JSON.parse(util.getCommonMap().toJson()), params))
  }
}