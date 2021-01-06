import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue-apexcharts";
import alert from "./components/global/Alert.vue";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.component("AlertMessage", alert);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
