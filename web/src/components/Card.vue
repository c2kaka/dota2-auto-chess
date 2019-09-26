<template>
    <div class="bg-white p-2 mt-2 fs-xl">
        <div class="card-header p-3 d-flex ai-center jc-between">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <div class="flex-1 px-2">{{title}}</div>
            <i class="iconfont icon-more"></i>
        </div>
        <div class="card-body">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card',
    props:{
        title: {
            type: String,
            requried: true
        },

        icon: {
            type: String,
            requried: true
        }
    }
}
</script>

<style lang='scss'>
    // @import url('//at.alicdn.com/t/font_1434562_j66q9hrqutp.css');
    @import '../assets/scss/variable';
    .card-header{
        border-bottom: 1px solid $border-color;
    }
</style>