<template>
    <v-app>
        <Header />
        <Sidebar />
        <v-main class="main">
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Header from "./components/global/Header";
import Sidebar from "./components/global/Sidebar";

export default {
    components: { Header, Sidebar }
};
</script>
<style scoped>
.main {
    height: 100vh;
    padding: 0;
    margin: 0;
}
</style>
