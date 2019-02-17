<template>
    <footer id="footer" :class="{fixed: fixFooter}">
        <div class="ct">
            <div class="bio">bio</div>
            <div class="right">right</div>
        </div>
    </footer>
</template>
<script>
export default {
    data(){
        return {
            fixFooter: true,
        }
    },
    methods:{
        relocate(){
            this.$nextTick(()=>{
                const pageHeight = document.querySelector('#app').offsetHeight
                const clientHeight = window.innerHeight
                const footerHeight = document.querySelector('#footer').offsetHeight
                
                this.fixFooter = clientHeight - pageHeight > footerHeight
            })
        }
    }
}
</script>
<style lang="less" scoped>
#footer{
    padding-top: 30px;
    padding-bottom: 30px;
    margin-top: 30px;
    font-size: 13px;
    line-height: 32px;
    border-top: 1px solid #e5e5e5;
    &.fixed{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}
.ct{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
    max-width: 1020px;
}
</style>