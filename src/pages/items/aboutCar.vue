<template>
    <div v-title="'关于车辆'">

        <section id="wrapper">
            <div class="content" id="content">
                <div class="article">
                    <ul>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>车辆激活的作用？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>只有激活状态下的车辆才能享受停简单提供的电子票据、预付停车费、出场不停车后期再还款等服务。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>为什么要选择车牌颜色？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>提高识别车辆的准确率，为用户提供更优的停车体验。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>验证车辆信息后有什么好处？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>验证车辆信息后,可以有效避免他人恶意绑定此车辆。</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)" id="question">
                                <em class="tsfont">Q：</em>
                                <span>自助验证车辆失败怎么办？</span>
                            </a>
                            <a href="javascript:void (0)">
                                <em>A：</em>
                                <span>用户可选择上传行驶证照片，通过人工方式进行车辆验证。</span>
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

