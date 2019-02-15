import { util } from 'util'

export default {
  created() {
    const data = util.getUrlParam('data')
    const data2 = util.getUrlParam('data2')
    if (util.isWeixinBrowserOnly()) {
      location.href = util.getWechatAuthUrlByAbsPath(
        util.constants.tcapiWebUrl + 'youle/getCoupon',
        [data,data2]
      )
    } else if (util.isAlipayBrowserOnly()) {
      location.href = util.getAlipayAuthUrlByAbsPath(
        util.constants.tcapiWebUrl + 'youle/getCoupon',
        [data,data2]
      )
    } else {
      location.href = `${util.constants.tcapiWebUrl}youle/getCoupon?data=${data}tingjiandan${data2}`
    }
  }
}
