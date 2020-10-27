<template>
    <v-navigation-drawer
        :permanent="drawer"
        app
        color="menuBg"
        :mini-variant.sync="drawer"
    >
        <v-list class="pa-0" min-height="64">
            <v-list-item class="bg-menus principalTitle lh">
                <v-list-item-icon>
                    <v-icon class="white--text">mdi-alpha-p </v-icon>
                </v-list-item-icon>
                <v-list-item-title class="white--text font-weight-bold size"
                    >Planejizze</v-list-item-title
                >
            </v-list-item>
        </v-list>
        <v-list color="pa-0">
            <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                class="hovering ma-1 pl-3 menus bg-menus"
                :to="item.route"
            >
                <v-list-item-icon>
                    <v-icon left size="24px" class="white--text text-center">{{
                        item.icon
                    }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="white--text text-left">{{
                        item.title
                    }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <template v-slot:append>
            <v-list dense>
                <v-list-item class="hovering ma-1 pl-3 menus bg-menus">
                    <v-list-item-icon>
                        <v-icon size="24px" class="white--text text-center"
                            >mdi-crown</v-icon
                        >
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="white--text text-left"
                            >Seja Premium</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    route: "Dashboard",
                    title: "Dashboard",
                    icon: "mdi-view-dashboard"
                },
                {
                    route: "Receita",
                    title: "Receitas",
                    icon: "mdi-currency-usd"
                },
                { route: "Despesa", title: "Despesas", icon: "mdi-briefcase" },
                {
                    route: "Planejamento",
                    title: "Planejamento",
                    icon: "mdi-lightbulb-outline"
                },
                {
                    route: "Administrador",
                    title: "Administrador",
                    icon: "mdi-domain"
                },
                {
                    route: "Relatorio",
                    title: "Relatórios",
                    icon: "mdi-chart-timeline-variant"
                }
            ]
        };
    },
    computed: {
        drawer: {
            get() {
                return this.$store.state.drawer;
            },
            set(val) {
                this.$store.commit("SET_DRAWER", val);
            }
        }
    }
};
</script>

<style>
.hovering:hover {
    background: #700049;
}
.size {
    font-size: 28px;
    font-family: Share Tech, sans-serif;
}
.menus {
    font-family: Open Sans, sans-serif;
    font-size: 14px;
}
.bg-menus {
    background: rgba(255, 255, 255, 0.05);
}
.lh {
    height: 64px;
}
</style>
