<template>
    <h1 class="section-title"><slot></slot></h1>
</template>

<script>
    export default {
        name: "section-title"
    }
</script>
<!--//聚焦-->
<style scoped>
    h1.section-title:hover {
        color: #ff6d6d;
    }
    h1.section-title {
        padding-left: 220px;
        color: #757575;
        font-size: 18px;
        font-weight: 400;
        padding-bottom: 50px;
        border-bottom: 1px dashed #ECECEC;
    }
</style>
