<template>
    
        <div class="mx-auto max-w-sm border border-gray-300 rounded p-6 shadow-xl">
            <div class="pb-2 text-center" >
                <a-typography-title :level="3">
                    Login
                </a-typography-title>
            </div>
            <div class="text-end text-xs">
                <router-link :to="route.register.path">
                    Don't have an account?
                </router-link>
            </div>
            <login-form/>
            <social-button-vue v-if="!isLogin" title="Login with"/>
        </div>
</template>

<script>
    import LoginForm from '@/components/Auth/LoginAntd.vue'
    import SocialButtonVue from '@/components/Auth/SocialButton.vue'
    import {mapGetters} from 'vuex'
    import {route} from '@/router'


    export default {
        name:'LoginView',
        components:{
            LoginForm,
            SocialButtonVue
        },
        data:()=>({
            route:route
        }),
        computed:{
            ...mapGetters('user',{
                isLogin: 'isLogin'
            })
        },
        mounted(){
            document.title = this.$route.meta.title
        }
    }
        
    
</script>

    