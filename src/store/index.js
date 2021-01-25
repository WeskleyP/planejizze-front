import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawer: true,
        token: localStorage.getItem("token"),
        permission: localStorage.getItem("permissions")
    },
    mutations: {
        SET_DRAWER(state, payload) {
            state.drawer = payload;
        },
        LOGIN(state, data) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken);
            state.token = data.token;
        },
        PERMS(_state, data) {
            console.log(data.permissions);
            localStorage.setItem("expire", data.exp);
            localStorage.setItem(
                "permissions",
                JSON.stringify(data.permissions)
            );
        },
        LOGOUT(state) {
            sessionStorage.clear();
            localStorage.clear();
            state.token = "";
        }
    },
    actions: {}
});
