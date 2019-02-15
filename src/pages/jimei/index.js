import { util } from 'util'
import store from '../../store'
export default {
  created() {

    if (util.isWeixinBrowserOnly()) {
      location.href = util.getWechatAuthUrlByAbsPath(util.constants.tcapiWebUrl + 'jimei/jimeiCoupon')
    } else if (util.isAlipayBrowserOnly()) {
      location.href = util.getAlipayAuthUrlByAbsPath(util.constants.tcapiWebUrl + 'jimei/jimeiCoupon')
    } else {

        store.commit('modalErrorMsg',"请使用微信或支付宝扫码")
        store.commit('modalType',2)
        store.commit('isShowModal',true)

    }
  }
}
