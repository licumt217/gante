<template>
    <div v-title="'关于订单'">

        <section id="wrapper">
            <div class="content" id="content">
                <div class="article">
                    <ul>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>停简单订单类型有哪些？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>停放中订单：车辆正在停放的订单。用户可线上预支付停车费，出场时享受不停车直接出场服务。<br>待支付订单：未支付先出场的订单，用户可在场外支付所需支付的停车费用。如已经存在待支付订单，则新产生的订单不能享受先出场后支付的服务。<br>已完成订单：已经完成的停车订单，用户可通过订单详情了解当次停车支付明细。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>出场了订单依然在计时计费怎么办？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>车场停电、断网或设备故障会导致这种情况，请点击“订单异常”，按提示操作解决问题。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>如何获取停车发票？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>现金支付的金额可向车场索取发票；线上支付的可通过app或微信公众号申请，点击个人中心->钱包->发票->填写信息提交即可。</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="less" scoped>
@import '../../assets/css/common.less';
#wrapper {
    width: 100%;
}
.article {
    line-height: 2em;
    width: 92%;
    height: auto;
    margin: 0 auto;
    li {
        padding: 42px 0 0 8%;
        a {
            display: inline-block;
            position: relative;
            color: rgba(102, 128, 151, 0.9);
            font-size: 12px;
            em {
                position: absolute;
                top: -1px;
                left: -22px;
            }
            span {
                display: inline-block;
                text-align: left;
            }
        }
    }
}

#question{
    font-size: 15px;
    color: #1e283d;
    padding-bottom: 13px;
}
</style>

