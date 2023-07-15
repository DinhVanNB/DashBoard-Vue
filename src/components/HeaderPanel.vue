<template>
    <a-layout-header class="header flex">
        <div class="flex-1">
            <menu-unfold-outlined 
                v-if="collapsed"
                class="trigger hover:text-blue-500"
                @click="toggle"
                />
            <menu-fold-outlined v-else class="trigger hover:text-blue-500"  @click="toggle" />
        </div>
        <div class="flex gap-4 items-center">
           
            <a-dropdown  :trigger="['click']">
                <div class="cursor-pointer hover:text-blue-500" >
                    <a-avatar :src="userAvatar" alt=""/>
                    <span class="p-2 font-semibold" >
                        {{isLogin? 
                            `${userLogin.firstName} ${userLogin.lastName}` 
                            :'Not Login'
                        }}
                    </span>
                </div>
                <template #overlay>
                    <a-menu @click="onClickMenu"  >
                        <a-menu-item key="/profile">
                            <template #icon>
                                <user-outlined/>
                            </template>
                            Account Details
                        </a-menu-item>

                        <a-menu-item key="settings">
                            <template #icon>
                                <setting-outlined/>
                            </template>
                            Account Settings
                        </a-menu-item>

                        <a-divider class="divider"/>

                        <a-menu-item v-if="isLogin" @click="onLogout" key="exit">
                            <template #icon>
                                <logout-outlined/>
                            </template>
                            Logout
                        </a-menu-item>
                        <a-menu-item v-else key="login">
                            <template #icon>
                                <login-outlined/>
                            </template>
                            Login
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>

            <a-dropdown>
                <div class="flex items-center gap-1">
                    <global-outlined class="text-xl"/>
                    {{language}}
                </div>
                <template #overlay>
                    <a-menu
                        mode="vertical"
                        @click="selectLanguage"
                    >
                        <a-menu-item key="vi">
                            Việt Nam (vi)
                            <span v-show="language==='vi'">✅</span>
                        </a-menu-item>
                        <a-menu-item key="en">
                            EngLish (en)
                            <span v-show="language==='en'">✅</span>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </a-layout-header>
 </template>
<script>
    import {mapGetters} from 'vuex'
    import {
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        GlobalOutlined,
        LogoutOutlined,
        SettingOutlined,
        UserOutlined,
        LoginOutlined
    } from '@ant-design/icons-vue';
    import { pulicURL } from '@/api/request';
    import { route } from '@/router';

    export default{
        name:'HeaderPanel',
        data(){
            return({
                userAvatar:pulicURL,
                route,
            })
        },
        components: {
            MenuUnfoldOutlined,
            MenuFoldOutlined,
            GlobalOutlined,
            LogoutOutlined,
            SettingOutlined,
            UserOutlined,
            LoginOutlined
        },

        computed:{
            ...mapGetters('appState',{
                collapsed: 'collapsed',
                language:'language' 
            }),
            ...mapGetters('user',{
                isLogin:'isLogin',
                userLogin:'userLogin'
            })
        },
        methods: {
            toggle(){
                this.$store.dispatch('appState/toggleMenu')
            },
            selectLanguage({  key }){
                this.$store.dispatch('appState/selectedLanguage', key)
            },
            onLogout(){
                if(this.isLogin) this.$store.dispatch('user/onLogout')
            },
            onClickMenu({key}){
                if(!this.isLogin)
                    return this.$router.push({name:route.login.name})
                const id = this.userLogin.id
                if(key===this.route.profile.path && this.isLogin ) 
                    this.$router.push(`${this.route.profile.path}?id=${id}`)
            }
        },
        mounted(){
            if(!this.isLogin) return this.userAvatar = pulicURL
            this.userAvatar += JSON.parse(this.userLogin.image)['0']
        },
        watch:{
            userLogin(){
                if(!this.isLogin) return this.userAvatar = pulicURL
                this.userAvatar =pulicURL + JSON.parse(this.userLogin.image)['0']
            },
           
        }

    }
</script>
<style scoped>
    .header{
        background: #fff;
        padding: 0;
        line-height: 64px;
        padding: 0 24px;
        box-shadow: 0px 2px 8px 1px rgb(194, 186, 186);
    }
    .trigger{
        font-size: 18px;
        line-height: 64px;
        transition: color 0.3s;
    }
    .divider{
        margin:2px 0;
    }
</style>