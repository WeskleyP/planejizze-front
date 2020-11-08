<template>
    <v-container fluid class="fill-height">
        <v-row>
            <v-col cols="6">
                <v-card elevation="4">
                    <pie-chart :chart-data="pieData" />
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card elevation="4">
                    <horizontal-bar-chart :chart-data="horizontalBarData" />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card elevation="4">
                    <bar-chart :chart-data="barData" />
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card elevation="4">
                    <scatter-chart :chart-data="scatterData" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PieChart from "../components/graphs/PieChart";
import BarChart from "../components/graphs/BarChart";
import HorizontalBarChart from "../components/graphs/HorizontalBarChart";
import ScatterChart from "../components/graphs/ScatterChart";

export default {
    components: {
        PieChart,
        BarChart,
        HorizontalBarChart,
        ScatterChart
    },
    data() {
        return {
            pieData: null,
            horizontalBarData: null,
            barData: null,
            scatterData: null
        };
    },
    mounted() {
        this.fillPieData();
        this.fillHorizontalBarData();
        this.fillBarData();
        this.fillScatterData();
    },
    methods: {
        fillPieData() {
            this.pieData = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: "#f87979",
                        data: [this.getRandomInt(), this.getRandomInt()]
                    },
                    {
                        label: "Data One",
                        backgroundColor: "#f87979",
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            };
        },
        fillHorizontalBarData() {
            this.horizontalBarData = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: "#f87979",
                        data: [this.getRandomInt(), this.getRandomInt()]
                    },
                    {
                        label: "Data One",
                        backgroundColor: "#f87979",
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            };
            console.log("montando");
        },
        fillBarData() {
            this.barData = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: "#f87979",
                        data: [this.getRandomInt(), this.getRandomInt()]
                    },
                    {
                        label: "Data One",
                        backgroundColor: "#f87979",
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            };
        },
        fillScatterData() {
            this.scatterData = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: "#f87979",
                        data: [this.getRandomInt(), this.getRandomInt()]
                    },
                    {
                        label: "Data One",
                        backgroundColor: "#f87979",
                        data: [this.getRandomInt(), this.getRandomInt()]
                    },
                    {
                        label: "Data One",
                        backgroundColor: "#f87979",
                        data: [this.getRandomInt(), this.getRandomInt()]
                    },
                    {
                        label: "Data One",
                        backgroundColor: "#f87979",
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            };
        },
        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
        }
    }
};
</script>

<style></style>
