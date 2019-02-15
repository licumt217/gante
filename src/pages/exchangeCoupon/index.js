import { util } from 'util'

export default {
    created() {
        const exchangeCode = util.getUrlParam('exchangeCode') || '';
        if (util.isWeixinBrowserOnly()) {
            location.href = util.getWechatAuthUrlByAbsPath(
                util.constants.tcapiWebUrl + 'exchangeCoupon',
                [exchangeCode]
            );
        } else if (util.isAlipayBrowserOnly()) {
            location.href = util.getAlipayAuthUrlByAbsPath(
                util.constants.tcapiWebUrl + 'exchangeCoupon',
                [exchangeCode]
            );
        } else {
            location.href = `${util.constants.tcapiWebUrl}exchangeCoupon?data=${exchangeCode}`;
        }
    }
}
