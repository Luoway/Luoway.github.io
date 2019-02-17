<template>
  <div class="home">
    <Labels v-if="labels.length" class="labels" :list="labels"/>
    <Issues class="issues" :list="isusses"/>
  </div>
</template>

<script>
import { getIssues } from '@/modules/github-api.js';
import Issues from '@/components/HomeIsusses.vue';
import Labels from '@/components/HomeLabels.vue';

export default {
    name: 'home',
    components: {
      Issues,
      Labels
    },
    data(){
      return {
        isusses: [],
        labels: []
      }
    },
    beforeMount(){
        getIssues().then(({issues, labels})=>{
            this.isusses = issues
            labels && (this.labels = labels)
        })
    }
}
</script>
<style lang="less">
.home{
  margin-top: 48px;
  display: flex;
}
.labels{
  width: 200px;
}
.issues{
  flex: 1;
}
</style>
