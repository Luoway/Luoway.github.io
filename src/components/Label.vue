<template>
    <div class="label" :style="style">
        {{data.name}}
    </div>
</template>
<script>
export default {
    props: ['data'],
    computed: {
        style(){
            console.log(this.data)
            return {
                backgroundColor: '#'+this.data.color
            }
        }
    }
}
</script>
<style lang="less" scoped>
.label{
    display: inline-block;
    border-radius: 2px;
    box-shadow: inset 0 -1px 0 rgba(27,31,35,.12);
    font-size: 12px;
    font-weight: 600;
    height: 20px;
    line-height: 15px;
    padding: .15em 4px;
}
</style>

