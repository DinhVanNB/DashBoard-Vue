<template>
    <div  >
        <a-layout>
            <sidebar-menu />
            <a-layout style="min-height:100vh">
                <header-panel />
                <div class="p-5">
                    <a-layout-content>
                        <router-view/>
                    </a-layout-content>
                </div>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import SidebarMenu from '../components/SidebarMenu.vue'
import HeaderPanel from '../components/HeaderPanel.vue'
    export default {
        name:'MainLayout',
        components:{
            HeaderPanel,
            SidebarMenu
        }
    }
</script>