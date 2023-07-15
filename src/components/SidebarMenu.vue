<template>
    <a-layout-sider
        class="sider"
        v-model:collapsed="collapsed"
        :trigger="null"
        theme="light"
        collapsedWidth="50">
        <div class="flex items-center h-8 mx-3 my-4 gap-2  leading-8 font-bold">
            <router-link to="/" class="flex items-center">
                <a-image :width="30" :preview="false" src="https://aliyuncdn.antdv.com/logo.png" />
            </router-link>
            <router-link v-show="showTitle" to="/" class="flex items-center">
                <h3 class="hover:text-blue-600">
                    Dashboard
                </h3>
            </router-link>
        </div>
        <a-menu
            v-model:selectedKeys="selectedKeys"
            v-model:openKeys="openKeys"
            mode="inline"
        >
            <a-menu-item :key="route.home.name">
                <template #icon>
                    <dashboard-outlined/>
                </template>
                Home
            </a-menu-item>

            <a-sub-menu key="subUser">
                <template #icon>
                    <user-outlined/>
                </template>
                <template #title>
                    Users
                </template>

                <a-menu-item v-if="!isLogin" :key="route.login.name">
                    <template #icon>
                        <LoginOutlined/>
                    </template>
                    Login
                </a-menu-item>
                <a-menu-item v-if="!isLogin" :key="route.register.name">
                    <template #icon>
                        <UserAddOutlined/>
                    </template>
                    Register
                </a-menu-item>
                <a-menu-item :key="route.profile.name">
                    <template #icon>
                        <ProfileOutlined/>
                    </template>
                    Profile
                </a-menu-item>
                <a-menu-item :key="route.team.name">
                    <template #icon>
                        <TeamOutlined/>
                    </template>
                    Manage Team
                </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="subApp">
                <template #icon>
                    <AppstoreOutlined/>
                </template>
                <template #title>
                    Application
                </template>
                <a-menu-item :key="route.blog.name">
                    <template #icon>
                        <ReadOutlined/>
                    </template>
                   Blog
                </a-menu-item>
                <a-menu-item :key="route.calendar.name">
                    <template #icon>
                        <CalendarOutlined/>
                    </template>
                    Calendar 
                </a-menu-item>
            
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>
<script>
    import {
        DashboardOutlined, 
        UserOutlined, 
        LoginOutlined, 
        AppstoreOutlined,
        UserAddOutlined,
        TeamOutlined,
        ProfileOutlined,
        CalendarOutlined,
        ReadOutlined
    } from '@ant-design/icons-vue';
    import {mapGetters} from 'vuex';
    import {route} from '../router';
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'

    export default {
        name : 'SidebarMenu',
        data : () => ({
            selectedKeys: ['/'],
            openKeys:['subUser','subApp'],
            route: null,
            showTitle: true,
        }),
        components : {
            UserOutlined,
            LoginOutlined,
            AppstoreOutlined,
            DashboardOutlined,
            UserAddOutlined,
            TeamOutlined,
            ProfileOutlined,
            CalendarOutlined,
            ReadOutlined
        },
        computed : {
            ...mapGetters('appState', {collapsed: 'collapsed'}),
            ...mapGetters('user',{isLogin:'isLogin',userLogin:'userLogin'})
        },
        created() {
            this.route = route
            this.selectedKeys = [this.$route.name];
        },
        watch:{
            collapsed(){
                clearTimeout(time)
                if(this.collapsed) this.showTitle=false
                var time = setTimeout(()=>this.showTitle=!this.collapsed,200)
            },
            path(){
                document.title = this.$route.meta.title
                this.selectedKeys = [this.$route.name];
            },
            selectedKeys(){
                if(this.selectedKeys[0]!==this.route.profile.name)
                    return this.$router.push({name:this.selectedKeys[0]})
                else if(this.isLogin)
                    return this.$router.push({name:this.selectedKeys[0],query:{id:this.userLogin.id}})
                this.$router.push({name:this.selectedKeys[0],query:{id:'no-id'}})
            }
        },
        mounted(){
            if(this.collapsed) this.showTitle=false
        },
        setup(){
            const r = useRoute()
            const path = computed(() =>r.meta.title)
            return {path}
        }
    }
</script>
<style scoped>
    .sider{
        transition: all 1s;
    }
</style>