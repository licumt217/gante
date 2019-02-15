import { util } from './tjdUtils'
import axios from 'axios'

var tcAxios = axios.create({
  baseURL: util.constants.tcserverUrl + 'gateway'
})
tcAxios.defaults.timeout = 45000
tcAxios.defaults.headers.post['Content-Type'] = 'application/json'

tcAxios.interceptors.response.use(
  ({ data }) => {
    if (isNaN(data.isSuccess)) {
      data.isSuccess = 1 - ~~data.isSuccess
    }
    if (~~data.isSuccess === 0) {
      return data
    }
    return Promise.reject(data)
  },
  error => {
    if (error.response) {
      return Promise.reject('系统繁忙，请稍后再试')
    } else {
      return Promise.reject(error.message)
    }
  }
)

export const tcServices = {
  request: (params = {}, type = 'post') => {
    return tcAxios[type](
      '',
      Object.assign({}, JSON.parse(util.getCommonMap().toJson()), params)
    )
  }
}
