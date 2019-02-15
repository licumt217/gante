<template>
    <div v-title="'优惠规则'">
        <div class="content">
            <p class="title">
                <span>过夜车分类</span>
                <span>停车费</span>
                <span>满减金额</span>
            </p>
            <ul class="preferentialRules">
                <li>
                    <span>1天</span>
                    <span>
                        <em>￥</em>60</span>
                    <span>
                        <em>-￥</em>10</span>
                </li>
                <li>
                    <span>2天</span>
                    <span>
                        <em>￥</em>140</span>
                    <span>
                        <em>-￥</em>30</span>
                </li>
                <li>
                    <span>3天</span>
                    <span>
                        <em>￥</em>250</span>
                    <span>
                        <em>-￥</em>70</span>
                </li>
                <li>
                    <span>4天</span>
                    <span>
                        <em>￥</em>360</span>
                    <span>
                        <em>-￥</em>110</span>
                </li>

            </ul>
        </div>
    </div>
</template>


<style lang="less" scoped>
@import '../../assets/css/common.less';
.content {
    width: 90%;
    margin: 50px auto;
    border-radius: 5px;
    border: solid 1px #e0e0e0;
    .preferentialRules li,
    .title {
        height: 50px;
        line-height: 50px;
    }
    .title {
        color: #3C79A8;
        border-bottom: solid 1px #e0e0e0;
         margin: 0 5%;
        span {
            display: inline-block;
            width: 32%;
            text-align: center;
        }
    }
    .preferentialRules li {
        color: #787878;
        font-size: 15px;
        span {
            display: inline-block;
            width: 32%;
            text-align: center;
            em {
                font-size: 12px;
            }
        }
    }
}
</style>


