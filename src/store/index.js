import { createStore } from "vuex"
import user from "./modules/user";
import appState from "./modules/appState";

const store = createStore({
    modules:{
        user,
        appState
    }
})

export default store;