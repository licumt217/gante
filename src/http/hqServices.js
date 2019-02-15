import {
  util
} from '../assets/js/tjdUtils'
import qs from 'qs'
import axios from 'axios'

let baseURL='https://open.tingjiandan.com/ipsp-core/'

if(util.isProdEnv()){
    baseURL='https://open.tingjiandan.com/ipsp-core/'
}else if(util.isPrepEnv()){
    baseURL='https://prep.tingjiandan.com/ipsp-core/'
}

var hqAxios = axios.create({
  baseURL: baseURL
})
hqAxios.defaults.timeout = 45000
// hqAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// http request 拦截器
hqAxios.interceptors.request.use(
    config => {
        config.data = qs.stringify(config.data)
        return config;
    },
    err => {
        return Promise.reject(err);
    });

hqAxios.interceptors.response.use(({data}) => {
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

export const hqServices = {
  request: (url = '', type = 'post',params={}) => {
    return hqAxios[type](url, params)
  }
}
