<template>
    <div>
        <div class="ct">
            <div class="title">标签</div>
            <ul class="list">
                <li class="item" v-for="item in list" :key="item">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import Label from './Label.vue'
export default {
    props: ['list'],
    components: {
        Label
    }
}
</script>
<style lang="less" scoped>
@border: 1px solid #e5e5e5;
.ct{
    margin-right: 32px;
}
.title{
    font-size: 21px;
    font-weight: 400;
    color: #3c4146;
    text-align: left;
}
.list{
    margin-top: 12px;
    font-size: 15px;
    font-weight: 300;
    background-color: #fff;
    border-radius: 6px;
    border: @border;
}
.item{
    padding: 10px;
    border-bottom: @border;
    &:last-of-type{
        border-bottom: none;
    }
}
</style>