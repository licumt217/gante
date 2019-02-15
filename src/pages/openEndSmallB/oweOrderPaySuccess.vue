<template>
    <div></div>
</template>

<script>
    import { wxUtil } from "../../assets/js/wxUtil";

    export default {
        name: 'paySuccess',
        mounted() {
            wxUtil.closeWindow();
        }
    };
</script>

<style scoped>

</style>
