<template>
    <div>
        <article class="article">
            <h1>{{title}}</h1>
            <div v-html="html"></div>
        </article>
    </div>
</template>
<script>
import '../assets/prism.css'
import Prism from 'markdown-it-prism'
import Anchor from "markdown-it-anchor"
import TOC from 'markdown-it-table-of-contents'

import { getIssue } from '../modules/github-api.js'

const MD = new window.markdownit({
    html: true,
    xhtmlOut: true,
    typography: true,
}).use(Prism, {
    plugins: ['autolinker']
}).use(Anchor,{ permalink: true, permalinkBefore: true, permalinkSymbol: '#' }).use(TOC,{
    includeLevel: [2,3]
})

export default {
    data(){
        return {
            title: '',
            time: '',
            labels: [],
            content: '',
        }
    },
    computed:{
        html(){
            window.Bus.$emit('relocateFooter')
            if(MD && this.content){
                return MD.render('[[toc]]' + this.content)
            }else{
                return ''
            }
        }
    },
    activated(){
        const that = this
        getIssue(this.$route.params.number).then(({title, time, labels, content})=>{
            that.title = title
            that.time = time
            that.content = content
            labels.length && (that.labels = labels)
        })
    },
    deactivated(){
        const that = this
        that.title = ''
        that.time = ''
        that.labels = []
        that.content = ''
    },
    methods:{
        loadJSFromCDN(src, callback){
            const loaded = document.querySelector(`script[src="${src}"]`)
            if(loaded){
                callback()
            }else{
                const script = document.createElement('script')
                callback && (script.onload = callback)
                script.src=src
                document.body.appendChild(script)
            }
        }
    }
}
</script>

<style lang="less" scoped>
h1{
    text-align: center;
}
.article{
    text-align: left;
    padding-right: 232px;
}
/deep/ .table-of-contents{
    position: fixed;
    top: 0;
    top: 100px;
    left: 50%;
    margin-left: 310px;
    width: 200px;
}
/deep/ h2, /deep/ h3{
    position: relative;

    /deep/ &:hover{
        .header-anchor{
            display: inline-block;
        }
    }
}
</style>
