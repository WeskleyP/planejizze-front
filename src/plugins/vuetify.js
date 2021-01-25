import Vue from "vue";
import Vuetify from "vuetify/lib";
import pt from "vuetify/src/locale/pt.ts";

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { pt },
        current: pt
    },
    theme: {
        themes: {
            light: {
                primary: "#5D069A",
                secondary: "#5A029A",
                bgColor: "#EFEFEF",
                menuBg: "#310055",
                hoverColor: "#700049",
                premium: "#C39300",
                bgIndex: "#F2F2F2",
                dolarBg: "#5D069A", //0.3
                graphColorBg: "#41062d", //0.65
                principalTitle: "#4E107B"
            }
        }
    }
});
