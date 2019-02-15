import { util } from 'util'

export default {
    created() {
        //
        if(util.isWeixinBrowserOnly()){
            location.href=util.getWechatAuthUrlByAbsPath('https://prep.tingjiandan.com/tcapi_web/test/abc', [])
        }else if(util.isAlipayBrowserOnly()){
            location.href=util.getAlipayAuthUrlByAbsPath('https://prep.tingjiandan.com/tcapi_web/test/abc', [])
        }else{
            this.$router.push({path: '/test/abc'})
        }


    }
}
