import {login, logout , getUserById , editUser} from '@/api/user'
 
const getters = {
    userLogin: state=>state.userLogin,
    isLogin: state=>state.isLogin,
    userProfile:state=>state.userProfile
}

const state= ()=>({
    userLogin: null,
    isLogin: false,
    userProfile:null
})

const actions = {
    async onLogin({commit,dispatch},data){
        try{
            const res = await login(data)
            commit('onLogin', res.result.data)
            dispatch('appState/setAccessToken', res.result.accessToken, {root:true})
        }
        catch(e){
            console.log('Err onLogin')
        }
    },

    async onLogout({commit,dispatch}){
        try{
            const res = await logout() 
            commit('onLogout')
            dispatch('appState/setAccessToken', '', {root:true})
            console.log(res)
        }
        catch(e){
            console.log('Error logout')
        }
    },

    async onGetUserProfile({commit,dispatch},params){
        try{
            const {result} =await getUserById(params)
            commit('onGetUserProfile',result.data.data)
            if(result.data.transaction) 
            dispatch('appState/setAccessToken',result.data.transaction, {root:true})
        }
        catch(e){
            console.log('Error get user by id')
        }
    },

    async onEditUser({commit,dispatch}, data){
        try{
            const {result}=await editUser(data)
            commit('onEditUser',result.data.data)
            if(result.data.transaction) 
            dispatch('appState/setAccessToken',result.data.transaction, {root:true})
        }   
        catch(e){
            console.log(e)
        }
    }
    
    
}

const mutations ={
    onLogin(state,data){
        state.userLogin = data
        state.isLogin = true
    },
    onLogout(state){
        state.userLogin = null
        state.isLogin = false
    },
    onGetUserProfile(state,data){
        state.userProfile = data
    },
    onEditUser(state,data){
        state.userProfile = data
        state.userLogin =data
    }
    
}




export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}