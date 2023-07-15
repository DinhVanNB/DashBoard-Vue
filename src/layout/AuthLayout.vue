<template>
    <a-layout >
        <a-layout-header class="header" >
            <header-auth/>
        </a-layout-header>
        <a-layout-content >
            <div class="container mx-auto p-5">
                <router-view/>
            </div>
        </a-layout-content>
        <a-layout-footer>
            <footer-auth/>
        </a-layout-footer>
    </a-layout>
</template>

<script>
    import HeaderAuth from '@/components/Auth/HeaderAuth.vue'
    import FooterAuth from '@/components/Auth/FooterAuth.vue'
    export default {
        name:'AuthLayout',
        components:{
            HeaderAuth,
            FooterAuth   
        }
    }
</script>

<style scoped>
    .ant-layout{
        min-height:100vh;
        width:100vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .header{
        background: transparent;
    }
    .ant-layout-content{
        display: flex;
        flex-direction: column;
        width:100vw;
        justify-content: center;
    }
</style>