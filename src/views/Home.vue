<template>
    <div class="home">
        <Labels v-if="labels.length" class="labels" :list="labels" v-model="activeLabel" />
        <Issues class="issues" :list="issuesShown" />
    </div>
</template>

<script>
import { getIssues } from '@/modules/github-api.js'
import Issues from '@/components/HomeIssues.vue'
import Labels from '@/components/HomeLabels.vue'

export default {
    name: 'home',
    components: {
        Issues,
        Labels
    },
    data() {
        return {
            issues: [],
            labels: [],
            activeLabel: '全部'
        }
    },
    computed: {
        issuesSorted() {
            const map = {}
            this.labels.forEach((label, index) => {
                if (index === 0) return (map[label] = this.issues)
                map[label] = []
            })
            this.issues.forEach(issue => {
                issue.labels.forEach(label => {
                    map[label].push(issue)
                })
            })
            return map
        },
        issuesShown() {
            return this.issuesSorted[this.activeLabel] || []
        }
    },
    beforeMount() {
        getIssues()
            .then(({ issues, labels }) => {
                this.issues = issues
                this.labels = labels || []
                this.labels.unshift('全部')
            })
            .then(() => {
                this.$nextTick(() => {
                    window.Bus.$emit('relocateFooter')
                })
            })
    }
}
</script>
<style lang="less">
.home {
    margin-top: 48px;
    display: flex;
}
.labels {
    width: 200px;
}
.issues {
    flex: 1;
}
</style>
