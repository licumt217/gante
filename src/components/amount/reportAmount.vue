<template>
    <span class="amountCom">
        <i :style="prefixStyles" class="leftAmountIcon" v-if="prefix">{{prefix}}</i>
        <i :style="amountLeftStyles">{{amountTrim.split('.')[0]}}</i>
        <i :style="dotStyles">.</i>
        <i :style="amountRightStyles">{{amountTrim.split('.')[1]}}</i>
    </span>
</template>
<script>

    export default {
        props: {
            amount:{
                type: [Number, String],
                default:0
            },
            prefix: {
                type:String,
                default:'￥'
            },
            prefixSize: {
                type: [Number, String],
                default:12
            },
            prefixColor:String,
            prefixMargin:String,
            amountColor: String,
            amountLeftSize: {
                type: [Number, String],
                default:18
            },
            amountRightSize: {
                type: [Number, String],
                default:12
            },
            dotSize:{
                type: [Number, String],
            },
            dotColor:String,
            dotMargin:{
                type:String,
                default:'0 -3px'
            }
        },
        computed: {
            amountTrim(){
                  return Number(this.amount).toFixed(2)
            },
            prefixStyles () {
                let style = {};

                if (this.prefixSize) {
                    style['font-size'] = `${this.prefixSize}px`;
                }

                if (this.prefixColor) {
                    style.color = this.prefixColor;
                }else  {
                    style.color = this.amountColor;
                }

                if (this.prefixMargin) {
                    style.margin = this.prefixMargin;
                }

                return style;
            },
            amountLeftStyles () {
                let style = {};

                if (this.amountLeftSize) {
                    style['font-size'] = `${this.amountLeftSize}px`;
                }

                if (this.amountColor) {
                    style.color = this.amountColor;
                }

                return style;
            },
            amountRightStyles () {
                let style = {};

                if (this.amountRightSize) {
                    style['font-size'] = `${this.amountRightSize}px`;
                }

                if (this.amountColor) {
                    style.color = this.amountColor;
                }

                return style;
            },
            dotStyles(){
                let style = {};

                if (this.dotSize) {
                    style['font-size'] = `${this.dotSize}px`;
                }else {
                    style['font-size'] = `${this.amountRightSize}px`;
                }

                if (this.dotColor) {
                    style.color = this.dotColor;
                }else {
                    style.color = this.amountColor;
                }
                if(this.dotMargin){
                    style.margin = this.dotMargin;
                }

                return style;
            }
        }
    };
</script>
<style lang="less" scoped>
    .amountCom{
        /*display: inline-block;*/
        overflow: hidden;
        height: auto;
        line-height: 1;
        position: relative;
    }
    .leftAmountIcon{
        margin-right: -3px;
    }
</style>

