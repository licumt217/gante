import { util } from 'util'
import {onlyShowOnce} from '../../assets/js/onlyShowOnce'
import store from '../../store'
export default {
  created() {
    onlyShowOnce.init().then(()=>{
      const data = util.getUrlParam('orderId')
      if (util.isWeixinBrowserOnly()) {
        location.replace(util.getWechatAuthUrlByAbsPath(
          util.constants.tcweixinUrl + 'charge/couponScanCodeForPc',
          [data]
        ))
      } else if (util.isAlipayBrowserOnly()) {
        location.replace(util.getAlipayAuthUrlByAbsPath(
          util.constants.tcweixinUrl + 'charge/couponScanCodeForPc',
          [data]
        ))
      } else {
          store.commit('modalErrorMsg',"请使用微信或支付宝扫码")
          store.commit('modalType',2)
          store.commit('isShowModal',true)
      }
    });




  }
}
