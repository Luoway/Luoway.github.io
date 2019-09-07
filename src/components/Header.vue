<template>
    <header id="header">
        <div class="ct">
            <router-link to="/" class="logo">fecat.win</router-link>
            <ul class="nav">
                <li class="item" v-for="nav in navList" :key="nav.title">
                    <router-link v-if="nav.url" :to="nav.url" class="link">{{nav.title}}</router-link>
                </li>
            </ul>
        </div>
    </header>
</template>
<script>
export default {
    data(){
        return {
            navList: [{
                title: '关于',
                url: '/about'
            }]
        }
    }
}
</script>
<style lang="less" scoped>
#header{
    padding: 25px 0;
    background-color: #3c4146;
    border-bottom-color: #202326;
}
.ct{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 100%;
    max-width: 1020px;
    box-sizing: border-box;
}
.logo{
    font-size: 18px;
    color: #fff;
}
.nav{
    display: flex;
    font-size: 16px;
    list-style: none;

    .item{
        color: #fff;
        line-height: 19px;
        margin: -1px 0 0 20px;
        padding: 0;
        cursor: pointer;
    }
    .link{
        color: #fff;
        &:hover{
            color: rgba(255,255,255,.7);
        }
    }
}
</style>