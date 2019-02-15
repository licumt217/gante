<template>
    <div v-title="'关于余额'">
        <section id="wrapper">
            <div class="content" id="content">
                <div class="article">
                    <ul>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>什么是余额？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>用户可在场内使用余额提前支付停车费，也可在离场时由系统自动扣除账户余额支付，支付成功可不停车出场。</span>
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

