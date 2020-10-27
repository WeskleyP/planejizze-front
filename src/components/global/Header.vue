<template>
    <v-app-bar app color="primary" absolute>
        <v-btn icon @click="setDrawer(!drawer)">
            <v-icon color="white">mdi-menu</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                    <v-list-item-title>Option {{ n }}</v-list-item-title>
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
        })
    }
};
</script>

<style></style>
