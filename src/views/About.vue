<template>
    <div class="about">
        <h2 @click="relocate">空空如也~</h2>
    </div>
</template>
<script>
export default {
    methods: {
        relocate() {
            window.location.href = 'https://github.com/luoway'
        }
    }
}
</script>