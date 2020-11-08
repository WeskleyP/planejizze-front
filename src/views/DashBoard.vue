<template>
    <v-container fluid class="fill-height">
        <v-row>
            <v-col cols="6">
                <v-card elevation="4">
                    <pie />
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card elevation="4">
                    <horizontal-bar />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card elevation="4">
                    <bar />
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card elevation="4">
                    <scatter />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { Pie, Bar, HorizontalBar, Scatter } from "vue-chartjs";
export default {
    components: {
        Pie,
        Bar,
        HorizontalBar,
        Scatter
    }
};
</script>

<style></style>
