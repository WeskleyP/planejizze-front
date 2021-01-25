<template>
    <v-app-bar app color="primary" absolute class="st">
        <v-btn icon @click="setDrawer(!drawer)">
            <v-icon color="white">mdi-menu</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu left bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon class="white--text">mdi-account-multiple</v-icon>
                </v-btn>
            </template>

            <v-list nav>
                <v-list-item class="text-right" tag="button">
                    <v-list-item-content>
                        <v-list-item-title>Perfil</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="text-right" tag="button">
                    <v-list-item-content>
                        <v-list-item-title>Alterar a senha</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="text-right" tag="button">
                    <v-list-item-content>
                        <v-list-item-title @click="logout"
                            >Sair</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    computed: {
        ...mapState(["drawer"])
    },
    methods: {
        ...mapMutations({
            setDrawer: "SET_DRAWER"
        }),
        logout() {
            this.$router.push({
                name: "Login"
            });
        }
    }
};
</script>

<style></style>
