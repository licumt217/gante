/**
 *
 */
// import {TjdUtil} from 'tjdutils'

const TjdUtil=require('tjdutils').TjdUtil;

/**
 * 此项目单独的工具方法在这里扩展
 */
class util extends TjdUtil{
    /**
     * 将toCopyObj中的属性扩展到target对象
     * @param target
     * @param toCopyObj
     */
    static extend(target,toCopyObj){
        target=target||{}
        toCopyObj=toCopyObj||{}
        Object.keys(toCopyObj).forEach((key)=>{
            target[key]=toCopyObj[key]
        })

    }

    /**
     * 根据渠道号设置平台/授权码/支付渠道
     * @param channel
     * @returns {*}
     */
    static setPlatformAuthcodePaychannelByChannel (channel) {
        if (Number(channel) >= 30000 && Number(channel) <= 31000) {
            channel = '30000'
        }
        switch (channel) {
            case TjdUtil.channels.weixin:
                TjdUtil.setAuthCodeColumn(TjdUtil.authCodeColumns.weixin)
                TjdUtil.setPlatform(TjdUtil.platforms.weixin)
                break
            case TjdUtil.channels.alipay:
                TjdUtil.setAuthCodeColumn(TjdUtil.authCodeColumns.alipay)
                TjdUtil.setPlatform(TjdUtil.platforms.alipay)
                break
            case TjdUtil.channels.baidu:
                TjdUtil.setAuthCodeColumn(TjdUtil.authCodeColumns.baidu)
                TjdUtil.setPlatform(TjdUtil.platforms.baidu)
                break
            case TjdUtil.channels.huatong:
                TjdUtil.setAuthCodeColumn(TjdUtil.authCodeColumns.third);
                TjdUtil.setPlatform(TjdUtil.platforms.third);
            case TjdUtil.channels.ylg: //易联港
                TjdUtil.setAuthCodeColumn(TjdUtil.authCodeColumns.third)
                TjdUtil.setPlatform(TjdUtil.platforms.third)
                break
            case TjdUtil.channels.prePay:
            case TjdUtil.channels.prePayForActivity:
            case TjdUtil.channels.prePayForYywlh:
            case TjdUtil.channels.gtfp:
            case TjdUtil.channels.joyCity:
            case TjdUtil.channels.bjjj:
            case TjdUtil.channels.cityLife:
            case TjdUtil.channels.apm:
            case TjdUtil.channels.baolong:
            case TjdUtil.channels.joyCityForYywlgc:
            case TjdUtil.channels.oldDriver:
            case TjdUtil.channels.newUserScan:
            case TjdUtil.channels.prePayForB:
            case TjdUtil.channels.prePayForQfSb:
            case TjdUtil.channels.scanCodeForSB:
            case TjdUtil.channels.alipayParkPlatform:
            case TjdUtil.channels.hqAlipayParkPlatform:
            case TjdUtil.channels.prePayForJd:
            case TjdUtil.channels.prePayForTencent:
            case TjdUtil.channels.prePayForSuning:
            case TjdUtil.channels.prePayForCuiwei:
            case TjdUtil.channels.prePayForWeigao:
            case TjdUtil.channels.sbScanPay:
            case TjdUtil.channels.billScan:
            case TjdUtil.channels.apmScanPay:
            case TjdUtil.channels.juntaiPay:
            case TjdUtil.channels.sdshuangzizuo:
            case TjdUtil.channels.fxyl:
            case TjdUtil.channels.jmCoupon:
            case TjdUtil.channels.alipayVipCard:
            case TjdUtil.channels.unlicensed:
            case TjdUtil.channels.parkingReport:
            case TjdUtil.channels.exchangeCoupon://
                if (TjdUtil.isAlipayBrowserOnly()) {
                    TjdUtil.setAuthCodeColumn(TjdUtil.authCodeColumns.alipay)
                    TjdUtil.setPlatform(TjdUtil.platforms.alipay)
                } else if (TjdUtil.isWeixinBrowserOnly()) {
                    TjdUtil.setAuthCodeColumn(TjdUtil.authCodeColumns.weixin)
                    TjdUtil.setPlatform(TjdUtil.platforms.weixin)
                } else {
                    TjdUtil.setAuthCodeColumn(TjdUtil.authCodeColumns.third)
                    TjdUtil.setPlatform(TjdUtil.platforms.third)
                }

                break

            default:
                TjdUtil.setAuthCodeColumn(TjdUtil.authCodeColumns.other)
                TjdUtil.setPlatform(TjdUtil.platforms.other)
                break
        }
    }

    static isProdEnv(){
        return location.href.indexOf('open.tingjiandan.com')>-1;
    }
    static isPrepEnv(){
        return location.href.indexOf('prep.tingjiandan.com')>-1;
    }
    static dynamiticYdg(){
        let className='dynamiticYdg'
        function dynamicTiming() {
            let elements = document.getElementsByClassName(className)
            if (elements.length) {
                for(let i=0;i<elements.length;i++){
                    let self = elements[i]
                    setTjdInterval(function() {
                        let text = self.textContent
                        let arr = text.replace(/[\u4e00-\u9fa5]/g,':')
                        arr = arr.split(':')
                        text = arr[0] * 60 * 60 + arr[1] * 60 + arr[2] * 1 + 1
                        let hour = parseInt(text / 3600)
                        let min = parseInt((text - hour * 3600) / 60)
                        let sec = text % 60
                        text =
                            TjdUtil.fixZero(hour) +
                            '时' +
                            TjdUtil.fixZero(min) +
                            '分' +
                            TjdUtil.fixZero(sec)+'秒'
                        self.textContent=text;
                    }, 1000)
                }


            } else {
                setTjdTimeout(function() {
                    dynamicTiming()
                }, 1000)
            }
        }
        setTjdTimeout(function() {
            dynamicTiming()
        }, 1000) //延时等待vue相关数据解析完成
    }
    static getYdgAuthUrl(url){
        return `https://m.mallcoo.cn/a/open/User/V2/OAuth/BaseInfo/?AppID=58f596da88ce7e3854b09b98&PublicKey=b665cef893368809&CallbackUrl=${url}`
    }
}

//虹桥微信免密后台接口url
util.constants.ipspUrl=function () {


    if(util.isProdEnv()){

    }else{
        return 'http://192.5.0.178:9060/ipsp-core/';
    }
}();

    //停简单给三方生成一系列优惠券，三方将每个对应code给用户，用户来我司页面兑换成真正的优惠券放到用户账户下。
util.channels.exchangeCoupon=172;


export { util }
