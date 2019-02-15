<template>
    <div v-title="'关于停车券'">

        <section id="wrapper">
            <div class="content" id="content">
                <div class="article">
                    <ul>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>什么是停简单停车券?</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>停简单停车券是北京停简单信息技术有限公司发行和认可的代金券，适用于所有开通了停简单线上支付服务的停车场。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>如何使用停车券？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>用户离场前可在支付页面主动选择使用停车券，也可在离场时由停简单自动为您选择即将过期且面值最接近于当前订单停车费用的停车券，为您抵扣相应的金额。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>一张停车订单最多使用几张停车券？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>一张停车订单最多使用一张电子停车券。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>停车券的有效期是什么？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>停车券有效期是指该停车券仅能在指定的有效期内使用，过期无效。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>怎样才能获得停车券？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>关注停简单微信公众号或下载停简单手机APP客户端，停简单会发布关于停简单停车券的相关活动。</span>
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

