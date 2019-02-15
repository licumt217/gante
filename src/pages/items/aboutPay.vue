<template>
    <div v-title="'关于支付方式'">

        <section id="wrapper">
            <div class="content" id="content">
                <div class="article">
                    <ul>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>如何支付停车费？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>用户可在场内提前打开订单进行支付，支付完成后可不停车直接出场；还可以先离场，出场后在方便的时间完成停车费的支付。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>怎么设置现金支付停车费？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>用户在进入停简单停车场时，APP（或微信公众号）会收到进场订单推送，在订单详情页面，会有“现金支付”开关，开关开启状态时，本次停车费用只能使用现金支付。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>什么是免密支付功能？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>免密支付功能是停简单为了方便用户快速离场设计的自动支付停车费用的功能，用户绑定信用卡、支付宝或一网通后，离场时，则自动支付停车费。</span>
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

#question {
    font-size: 15px;
    color: #1e283d;
    padding-bottom: 13px;
}
</style>

