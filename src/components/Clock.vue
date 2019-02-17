<template>
    <div class="ct">
        <div class="hour" :style="hourStyle"></div>
        <div class="minute" :style="minuteStyle"></div>
    </div>
</template>
<script>
export default {
    name: 'Clock',
    props: ['time'],
    computed: {
        hourStyle(){
            const h = this.time.getHours()
            return {
                transform: `rotate(${h/12*360}deg)`
            }
        },
        minuteStyle(){
            const m = this.time.getMinutes()
            return {
                transform: `rotate(${m/60*360}deg)`
            }
        }
    }
}
</script>
<style lang="less" scoped>
.ct{
    position: relative;
    display: inline-block;
    margin-right: 6px;
    height: 23px;
    width: 23px;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    vertical-align: top;
}
.hour,
.minute{
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;

    &::after{
        content: '';
        display: block;
        position: absolute;
        left: 12px;
        bottom: 12px;
        width: 1px;
        height: 8px;
        background-color: #e5e5e5;;
    }
}
.hour{
    &::after{
        height: 6px;
    }
}
</style>