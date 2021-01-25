<template>
    <v-app>
        <Header v-if="tokenExists && permission" />
        <Sidebar v-if="tokenExists && permission" />
        <v-main class="main">
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import Header from "./components/global/Header";
import Sidebar from "./components/global/Sidebar";

export default {
    components: { Header, Sidebar },
    computed: {
        tokenExists() {
            return this.$store.state.token ? true : false;
        },
        permission() {
            return this.$store.state.permission ? true : false;
        }
    }
};
</script>
<style scoped>
.main {
    height: 100vh;
    padding: 0;
    margin: 0;
}
</style>
