<template>
  <div class="error-wrapper"><img src="~assets/images/unlicensed/unls_error.png" alt="">
    <p>{{ tips[this.$route.query.type] || '取票失败' }}</p>
  </div>
</template>

<script>

  import backToClose from '../../mixin/backToClose'
export default {
    mixins:[backToClose],
  data() {
    return {
      tips: {
        'enter': '取票失败',
        'exit': '场内无订单'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error-wrapper {
  padding: 80px 30px;
  height: 100%;
  background: #feffff;
  text-align: center;
  color: #818283;

  img {
    margin-bottom: 50px;
  }
}
</style>
