import {
  util
} from '../assets/js/tjdUtils'
import axios from 'axios'

let baseURL='https://open.tingjiandan.com/sosp-core/'

if(util.isProdEnv()){
    baseURL='https://open.tingjiandan.com/sosp-core/'
}else {
    baseURL='https://prep.tingjiandan.com/sosp-core/'
}

var ydgAxios = axios.create({
  baseURL: baseURL
})
ydgAxios.defaults.timeout = 45000
ydgAxios.defaults.headers.post['Content-Type'] = 'application/json'

// http request 拦截器
ydgAxios.interceptors.request.use(
    config => {
        // config.data = qs.stringify(config.data)
        return config;
    },
    err => {
        return Promise.reject(err);
    });

ydgAxios.interceptors.response.use(({data}) => {
  if (isNaN(data.isSuccess)) {
    data.isSuccess = ~~data.isSuccess
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

export const ydgHttp = {
  request: (url = '', type = 'post',params={}) => {
    return ydgAxios[type](url,params)
  }
}
