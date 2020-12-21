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
                        no-data-text="Não foi encontrado nenhum dado!"
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
                        <apexchart
                            width="380"
                            type="line"
                            :options="options"
                            :series="series"
                        ></apexchart>
                    </v-card>
                </v-row>
                <v-row justify="center">
                    <v-card elevation="4">
                        <apexchart
                            width="380"
                            type="pie"
                            :options="options"
                            :series="series"
                        ></apexchart>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            options: {},
            series: [44, 55, 41, 17, 15],
            pieData: null,
            pieOptions: {
                responsive: true
            },
            headers: [
                {
                    text: "Descrição",
                    align: "start",
                    sortable: false,
                    value: "descricao"
                },
                { text: "Categoria", value: "categoria" },
                { text: "Valor", value: "valor" },
                { text: "Recebimento", value: "dataRecebimento" },
                { text: "Status", value: "status" },
                { text: "Repete-se?", value: "repetir" }
            ],
            desserts: []
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
