<template>
    <div class="feature">
        <router-link :to="`/category/${data.title}`">
            <div class="feature-title"><span class="foverlay">{{data.title}}</span></div>
            <img :src="data.img">
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "feature",
        props: {
            data: {
                type: Object,
            }
        }
    }
</script>

<style scoped lang="less">
    .feature {
        width: inherit;
        position: relative;
        img {
            height: 300px;
            width: 700px;
            object-fit: cover;
            border-radius: 10px;

        }
        & a:hover .foverlay{
            opacity:0.8;
        }
        .foverlay {
            position: absolute;
            z-index: 2;
            width: 700px;
            height: 300px;
            //text-align: center;
            text-indent: 240px;
            line-height: 300px;
            background: #6f6f6f;
            color: white;
            font-size: 35px;
            opacity: 0;
            border-radius: 10px;

            -moz-transition: opacity .4s ease-out;
            -o-transition: opacity .4s ease-out;
            -webkit-transition: opacity .4s ease-out;
            transition: opacity .4s ease-out;
        }
    }
</style>
