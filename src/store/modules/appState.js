

const getters = {
    collapsed: state=>state.collapsed,
    accessToken: state=>state.accessToken,
    language: state=>state.language
};

const state = ()=>({
    collapsed: false,
    accessToken: '',
    language:'vi'
})

const actions ={
    toggleMenu({commit}){
        commit('toggleMenu')
    },
    setAccessToken({commit},data){
        commit('setAccessToken',data)
    },
    toggleLanguage({commit}){
        commit('toggleLanguage')
    },
    selectedLanguage({commit},data){
        commit('selectedLanguage',data)
    }
}

const mutations = {
    toggleMenu(state){
        state.collapsed = !state.collapsed
    },
    setAccessToken(state,data){
        state.accessToken = data
    },
    toggleLanguage(state){
        state.language = state.language==='vi'? 'en':'vi'
    },
    selectedLanguage(state,data){
        state.language = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}