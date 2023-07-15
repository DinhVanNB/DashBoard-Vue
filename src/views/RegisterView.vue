<template>
    <div class="mx-auto max-w-sm border border-gray-300 rounded p-5 shadow-xl">
        <div class="text-center">
            <a-typography-title :level="3">
                Register
            </a-typography-title>
        </div>
        <div class="text-end text-xs pb-2">
            <router-link :to="route.login.path">
                Already have an account?
            </router-link>
        </div>
        <register-form-vue/>
        <social-button-vue v-if="!isLogin" title="Register with"/>
    </div>
</template>

<script>
    import RegisterFormVue from '@/components/Auth/RegisterForm.vue'
    import SocialButtonVue from '@/components/Auth/SocialButton.vue'
    import {mapGetters} from 'vuex'
    import {route} from '@/router'

    export default {
        name : 'RegisterView',
        components : {
            RegisterFormVue,
            SocialButtonVue
        },
        data : () => ({route: route}),
        computed : {
            ...mapGetters('user', {isLogin: 'isLogin'})
        },
        mounted(){
            document.title = this.$route.meta.title
        }
       
    }
</script>