<template>
    <v-app>
        <Header v-if="tokenExists" />
        <Sidebar v-if="tokenExists" />
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
