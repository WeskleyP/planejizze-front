<template>
    <v-app>
        <Header />
        <Sidebar />
        <v-main>
            <v-container>
                <h1>Iniciando...</h1>
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
