<template>
    <div>
        <ul v-if="list.length" class="list">
            <li class="item" v-for="item in list" :key="item.title">
                <router-link :to="'/article/'+item.number" class="title">{{item.title}}</router-link>
                <div class="info">
                    <div class="time">
                        <Clock :time="item.createdTime"/>{{formatDate(item.createdTime)}}
                    </div>
                    <div class="labels">
                        <span v-for="label in item.labels" :key="label">{{label}}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import Label from './Label.vue'
import Clock from "./Clock.vue"
export default {
    props: ['list'],
    components:{
        Label,
        Clock
    },
    watch:{
        list(){
            window.Bus.$emit('relocateFooter')
        }
    },
    methods:{
        formatDate(time){
            let str = time.toLocaleDateString()
            let ary = str.split('/')
            ary[1] = ary[1].padStart(2,'0')
            ary[2] = ary[2].padStart(2,'0')
            return ary.join('-')
        }
    }
}
</script>
<style lang="less" scoped>
@border: 1px solid #e5e5e5;
.list{
    position: relative;
    padding-left: 32px;
    text-align: left;
    border-left: @border;

    &::before,
    &::after{
        content: '';
        display: block;
        position: absolute;
        left: -1px;
        bottom: -42px;
        width: 1px;
        height: 42px;
        background: linear-gradient(rgba(229,229,229,1), rgba(229,229,229,0));
    }
    &::before{
        top: -20px;
        height: 20px;
        transform: rotate(180deg);
    }
}
.item{
    margin-bottom: 40px;
}
.title{
    font-size: 30px;
    line-height: 42px;
    color: #4183C4;

    &:hover{
        color: #005b9e;
        text-decoration: underline;
    }
}
.info{
    margin-top: 10px;
    line-height: 25px;
    position: relative;
    display: flex;

    &::after{
        content:'';
        display: block;
        position: absolute;
        left: -32px;
        bottom: 50%;
        width: 32px;
        height: 0;
        border-bottom: @border;
        transform: translateY(50%)
    }
}

.time{
    color: #999;
    margin-right: 20px;
}
.labels{
    color: #999;
}
</style>