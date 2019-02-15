<template>
    <div v-title="'停简单用户服务协议'">
        <div class="wrapper">
            <section class="content">
                <h2>停简单三方免密支付服务协议</h2>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;本服务协议书由您向北京停简单信息技术有限公司（下称“停简单”）出具，具有授权之法律效力。请您务必审慎阅读、充分理解本确认书各条款内容，特别是免除或者限制责任的条款，前述条款可能以加粗体显示，您应重点阅读。除非您已阅读并接受本确认书所有条款，否则您无权使用停简单支付的自动续费、自动缴费、自动扣款等服务。您同意本确认书即视为您已向停简单提供自动续费授权，并自愿承担由此导致的一切法律后果。如您有任何疑问，应向停简单客服（电话：400-166-0606）咨询。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;您确认并授权停简单向微信或支付宝（下称“第三方”）发出扣款指令，停简单即可在不验证您的账户密码、短信动态码等信息的情况下直接从您的第三方账户中扣划指定的款项至停简单指定账户。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;停简单会在首次扣款时验证您的支付密码，您输入支付密码即视为您授权停简单可依据停简单交易指令从您的第三方账户中扣除指定的款项至停简单指定账户，且停简单后续再扣款时，将无需再验证您的支付密码、短信动态码等信息。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;在任何情况下，只要停简单向第三方发出支付指令，第三方就可按照该指令进行资金扣划，停简单对第三方的支付指令在实质上的正确性、合法性、完整性、真实性不承担任何法律责任，相关法律责任由您和第三方自行承担。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;您在扣款账户内必须预留有足够的被扣划的金额，否则因账户余额不足导致无法及时扣款或扣款错误、失败，责任由您自行承担。因不可归责于停简单的事由，导致的不能及时划付款项、划账错误等责任与停简单无关。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;您确认，因第三方的原因导致您遭受经济损失的，由您与第三方协商解决，与停简单无关。</p>
                <p class="sign">停简单</p>
            </section>
        </div>
    </div>
</template>

<style lang="less" scoped>
    @import '../../assets/css/common.less';

    .wrapper {
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        width: 100%;
        letter-spacing: 1px;
    }

    .content p {
        padding: 0 5%;
        line-height: 28px;
        color: #787878;
        font-size: 14px;
    }

    .content p b {
        color: #666;
    }

    .content h1 {
        line-height: 50px;
        text-align: center;
        font-size: 15px;
    }

    .content h2 {
        padding: 5% 0 2% 0;
        line-height: 30px;
        font-size: 14px;
        text-align: center;
    }
    .content .sign{
        text-align: right;
        color: #666;
        font-size: 14px;
        margin-top: 3%;
        font-weight: bold;
    }
</style>

