<template>
    <v-navigation-drawer
        v-model="drawer"
        app
        :mini-variant.sync="mini"
        permanent
        color="menuBg"
    >
        <v-list class="pa-0" min-height="56">
            <v-list-item
                @click.stop="mini = !mini"
                class="bg-menus principalTitle lh"
            >
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
            drawer: true,
            items: [
                { title: "Dashboard", icon: "mdi-view-dashboard" },
                { title: "Receitas", icon: "mdi-currency-usd" },
                { title: "Despesas", icon: "mdi-briefcase" },
                { title: "Planejamento", icon: "mdi-lightbulb-outline" },
                { title: "Administrador", icon: "mdi-domain" },
                { title: "Relatórios", icon: "mdi-chart-timeline-variant" }
            ],
            mini: true
        };
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
    height: 56px;
}
</style>
