<template>
    <div >
        <a-row :gutter="{ xs: 8, sm: 16}">
            <a-col :xs="24" :md="12" :lg="10" :xl="8" >
                <profile-details-vue :user-profile="userProfile" 
                />
            </a-col>
            <a-col :xs="24" :md="12" :lg="14" :xl="16" >
                <profile-edit-vue
                    :able-edit="ableEdit"
                    :user-data="userProfile"/>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import ProfileEditVue from '@/components/Profile/ProfileEdit.vue';
    import ProfileDetailsVue from '@/components/Profile/ProfileDetails.vue';
    import {mapGetters} from 'vuex'

    export default {
        name : "ProfileView",
        components : {
            ProfileEditVue,
            ProfileDetailsVue
        },
        data:()=>({
            ableEdit:false
        }),
        computed : {
            ...mapGetters('user', {
                isLogin: 'isLogin',
                userProfile: 'userProfile',
                userLogin: 'userLogin'
            })
        },
        beforeMount(){
            if(this.isLogin){
                this.ableEdit = this.userLogin.id === this.$route.query.id
            }
            // if(!this.isLogin) this.$router.push('/auth/login')
        },
        beforeCreate(){
            this.$store.dispatch('user/onGetUserProfile',window.location.search)
        }
    }
</script>