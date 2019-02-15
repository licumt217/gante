import { util } from './tjdUtils'
import {ydgHttp} from '../../http/ydgHttp'

export const ydgServices = {
    getLoginInfo:function () {
        return new Promise((resolve,reject)=>{
            if (!util.isEmpty(sessionStorage.isYdgLogin) && sessionStorage.isYdgLogin === '1') {//已登录
                resolve()
            } else {
                let Ticket = util.getUrlParam('Ticket')
                let DataSource = util.getUrlParam('DataSource')
                if(Ticket){
                    ydgHttp.request('mallcoo/sendRequest', 'post', {
                        "requestUrl":"https://openapi10.mallcoo.cn/User/OAuth/v1/GetToken/ByTicket/",
                        "params":{
                            "Ticket": Ticket
                        }
                    }).then(data => {
                        if (!data.result) reject('系统繁忙，请稍后再试')
                        let result = JSON.parse(data.result)
                        if(result.Code == '1' && result.Data){
                            util.setSession('isYdgLogin','1')
                            if(result.Data.Mobile) util.setSession('ydgMobile',result.Data.Mobile);
                            if(result.Data.OpenUserId) util.setSession('ydgOpenUserId',result.Data.OpenUserId)
                            resolve(data)
                        }else {
                            reject(data)
                        }
                    }).catch((err)=>{
                        reject(err)
                    })
                }else {
                    reject('缺少必要信息！')
                }
            }
        })
    },
    mallcooRequset:function (obj) {
        return new Promise((resolve,reject)=>{
            if(!obj ||!obj.url || !obj.params) reject('缺少必要参数');
            ydgHttp.request('mallcoo/sendRequest', 'post', {
                "requestUrl":obj.url,
                "params":obj.params
            }).then(data => {
                if (!data.result) reject('系统繁忙，请稍后再试')
                let result = JSON.parse(data.result)
                if(result.Code == '1' && result.Data){
                    resolve(result.Data)
                }else {
                    reject(data)
                }
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}
