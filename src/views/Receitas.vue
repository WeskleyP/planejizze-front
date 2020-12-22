<template>
    <v-container fluid class="fill-height">
        <v-row>
            <v-col cols="8" sm="12" md="6" lg="8" class="my-5">
                <v-row class="pb-4">
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
                    <v-sheet
                        class="px-4 pt-4 pb-3 text-center my-5"
                        tile
                        width="100%"
                    >
                        <div class="text-h2">Suas Receitas</div>
                    </v-sheet>
                    <v-data-table
                        :headers="headers"
                        :items="receitas"
                        :items-per-page="5"
                        class="elevation-1 fw"
                        no-data-text="Não foi encontrado nenhum dado!"
                    >
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Pesquisar"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-btn color="primary" class="mb-2 ml-2">
                                    Adicionar nova receita
                                </v-btn>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-row>
            </v-col>
            <v-col cols="4" sm="12" md="5" lg="4" align-self="center">
                <v-row justify="center" class="mb-3">
                    <v-card elevation="4" class="bgColor" width="95%">
                        <v-sheet
                            class="px-4 pt-4 pb-3 text-center bgColor"
                            tile
                            width="100%"
                        >
                            <div class="text-h6">
                                Receitas nos últimos 6 meses
                            </div>
                        </v-sheet>
                        <apexchart
                            width="100%"
                            type="bar"
                            :options="optionsBar"
                            :series="lineSeries"
                        ></apexchart>
                    </v-card>
                </v-row>
                <v-spacer />
                <v-row justify="center" class="my-4">
                    <v-card elevation="4" class="bgColor" width="95%">
                        <v-sheet
                            class="px-4 pt-4 pb-3 text-center bgColor"
                            tile
                            width="100%"
                        >
                            <div class="text-h6">Receitas por categoria</div>
                        </v-sheet>
                        <apexchart
                            width="100%"
                            type="pie"
                            height="600"
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
            search: "",
            options: {},
            optionsBar: {
                chart: {
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true
                    }
                },
                dataLabels: {
                    enabled: false
                }
            },
            series: [44, 55, 41, 17, 15],
            lineSeries: [
                {
                    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
                }
            ],
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
                { text: "Repete-se?", value: "repetir" },
                { text: "Opções", value: "actions" }
            ],
            receitas: [
                {
                    descricao: "TEste desc",
                    categoria: "Teste",
                    valor: "5000",
                    dataRecebimento: "20/12/2020",
                    status: "A PAGAR",
                    repetir: "Não"
                },
                {
                    descricao: "TEste desc",
                    categoria: "Teste",
                    valor: "5000",
                    dataRecebimento: "20/12/2020",
                    status: "A PAGAR",
                    repetir: "Não"
                },
                {
                    descricao: "TEste desc",
                    categoria: "Teste",
                    valor: "5000",
                    dataRecebimento: "20/12/2020",
                    status: "A PAGAR",
                    repetir: "Não"
                }
            ]
        };
    },
    mounted() {
        this.fillPieData();
    },
    methods: {
        fillPieData() {},
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
