<template>
    <v-container fluid class="fill-height">
        <v-row>
            <v-col cols="8" sm="12" md="6" lg="8" class="ma-5">
                <v-row class="py-4">
                    <v-item-group class="bgColor align">
                        <v-card
                            elevation="2"
                            color="rgba(95, 68, 115, 0.5)"
                            class="wid ma-5"
                            >Você recebeu R$ 5000,00 nos últimos 30 dias</v-card
                        >
                        <v-card
                            elevation="2"
                            color="rgba(132, 74, 112, 0.5)"
                            class="wid ma-5"
                            >Você irá receber R$ 3500,00 nos próximos 30
                            dias</v-card
                        >
                        <v-card
                            elevation="2"
                            color="rgba(81, 73, 118, 0.5)"
                            class="wid ma-5"
                            >Sua próxima receita será no valor de R$
                            500,00</v-card
                        >
                    </v-item-group>
                </v-row>
                <v-row class="my-4">
                    <v-data-table
                        :headers="headers"
                        :items="desserts"
                        :items-per-page="5"
                        class="elevation-1 fw"
                    ></v-data-table>
                </v-row>
            </v-col>
            <v-col
                cols="3"
                sm="12"
                md="5"
                lg="3"
                class="ml-5 jc"
                align-self="center"
            >
                <v-row justify="center">
                    <v-card elevation="4">
                        <pie-chart
                            :chart-data="pieData"
                            :options="pieOptions"
                        />
                    </v-card>
                </v-row>
                <v-row justify="center">
                    <v-card elevation="4">
                        <horizontal-bar-chart
                            :chart-data="pieData"
                            :options="pieOptions"
                        />
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import PieChart from "../components/graphs/PieChart";
import HorizontalBarChart from "../components/graphs/HorizontalBarChart";
export default {
    components: {
        PieChart,
        HorizontalBarChart
    },
    data() {
        return {
            pieData: null,
            pieOptions: {
                responsive: true
            },
            headers: [
                {
                    text: "Dessert (100g serving)",
                    align: "start",
                    sortable: false,
                    value: "name"
                },
                { text: "Calories", value: "calories" },
                { text: "Fat (g)", value: "fat" },
                { text: "Carbs (g)", value: "carbs" },
                { text: "Protein (g)", value: "protein" },
                { text: "Iron (%)", value: "iron" }
            ],
            desserts: [
                {
                    name: "Frozen Yogurt",
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: "1%"
                },
                {
                    name: "Ice cream sandwich",
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: "1%"
                },
                {
                    name: "Eclair",
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: "7%"
                },
                {
                    name: "Cupcake",
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: "8%"
                },
                {
                    name: "Gingerbread",
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: "16%"
                },
                {
                    name: "Jelly bean",
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: "0%"
                },
                {
                    name: "Lollipop",
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: "2%"
                },
                {
                    name: "Honeycomb",
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: "45%"
                },
                {
                    name: "Donut",
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: "22%"
                },
                {
                    name: "KitKat",
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: "6%"
                }
            ]
        };
    },
    mounted() {
        this.fillPieData();
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
        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
        }
    }
};
</script>

<style scoped>
.teste {
    background-color: red;
}
.align {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.wid {
    width: 32%;
    font-size: 1.3rem;
    text-align: center;
    min-height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.fw {
    width: 100%;
}
.jc {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    min-width: 350px;
}
</style>
