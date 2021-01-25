<template>
    <v-container fluid class="fill-height">
        <v-row>
            <v-col cols="3">
                <v-sheet
                    class="px-4 pt-4 pb-3 text-center my-5"
                    tile
                    width="38%"
                >
                    <div class="text-h3">Último planejamento</div>
                </v-sheet>
            </v-col>
            <v-col cols="9">
                <v-sheet
                    color="bgColor"
                    class="px-4 pt-4 pb-3 text-left my-5"
                    tile
                    rounded
                    width="100%"
                >
                    <v-row>
                        <v-col cols="2">
                            <v-text-field
                                outlined
                                background-color="white"
                                disabled
                                v-model="lastPlan.dataInicio"
                                class="maxWi"
                            >
                                {{ lastPlan.dataInicio }}
                            </v-text-field>
                            <v-text-field
                                outlined
                                disabled
                                background-color="white"
                                class="maxWi"
                                v-model="lastPlan.dataFim"
                            >
                                {{ lastPlan.dataFim }}
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <div class="text-h5 text-center">
                                <span>Progresso</span>
                            </div>
                            <v-progress-linear
                                :value="progressValue"
                                height="50"
                                class="progress mt-5"
                                rounded
                                background-color="white"
                            >
                            </v-progress-linear>
                        </v-col>
                        <v-col cols="4">
                            <div class="text-h6">
                                Categorias com mais gastos
                            </div>
                            <apexchart
                                width="100%"
                                type="bar"
                                :options="barChartPlan.chartOptions"
                                :series="barChartPlan.series"
                            ></apexchart>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8" sm="12" md="6" lg="8" class="my-5">
                <v-row class="my-4">
                    <v-sheet
                        class="px-4 pt-4 pb-3 text-center my-5"
                        tile
                        width="100%"
                    >
                        <div class="text-h2">Seus Planejamentos</div>
                    </v-sheet>
                    <v-data-table
                        :headers="headers"
                        :items="planejamentos"
                        :search="search"
                        :items-per-page="5"
                        class="elevation-1 fw"
                        no-data-text="Não foi encontrado nenhum dado!"
                        no-results-text="Não foi encontrado nenhum dado!"
                    >
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Pesquisar"
                                    single-line
                                    outlined
                                    hide-details
                                ></v-text-field>
                                <v-btn
                                    color="primary"
                                    class="mb-2 ml-2"
                                    @click="addNewItem()"
                                >
                                    Adicionar novo planejamento
                                </v-btn>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.categorias`]="{ item }">
                            <v-btn
                                class="primary white--text"
                                outlined
                                rounded
                                @click="openModal(item.categorias)"
                            >
                                Ver Categorias
                            </v-btn>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                        <router-view />
                    </v-data-table>
                </v-row>
            </v-col>
            <v-col cols="4" sm="12" md="5" lg="4" align-self="center">
                <v-row justify="center" class="my-4">
                    <v-card elevation="4" class="bgColor" width="95%">
                        <v-sheet
                            class="px-4 pt-4 pb-3 text-center bgColor"
                            tile
                            width="100%"
                        >
                            <v-row>
                                <v-col cols="6">
                                    <v-subheader class="text-h6 text-left">
                                        Planejamento previsto / Despesa real
                                    </v-subheader>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                        :items="planDropdown"
                                        v-model="pd"
                                        item-text="descricao"
                                        item-value="id"
                                        label="Escolha um período"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <span
                                        >Meta de Gastos total no mês:
                                        {{ metaPlan }}</span
                                    >
                                </v-col>
                            </v-row>
                        </v-sheet>
                        <apexchart
                            width="100%"
                            type="bar"
                            :options="barChart.chartOptions"
                            :series="barChart.series"
                        ></apexchart>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
        <router-view />
    </v-container>
</template>

<script>
import PlanejamentoService from "../services/PlanejamentoService";
import { format } from "date-fns";

export default {
    data() {
        return {
            progressValue: 0,
            itemD: null,
            pd: null,
            search: "",
            dialogDelete: false,
            barChartPlan: {
                series: [
                    {
                        data: []
                    }
                ],
                chartOptions: {
                    xaxis: {
                        categories: []
                    },
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
                    },
                    colors: []
                }
            },
            lastPlan: {},
            barChart: {
                series: [
                    {
                        data: []
                    }
                ],
                chartOptions: {
                    xaxis: {
                        categories: []
                    },
                    labels: [],
                    colors: [],
                    chart: {
                        toolbar: {
                            show: false
                        }
                    }
                }
            },
            headers: [
                {
                    text: "Descrição",
                    align: "start",
                    sortable: false,
                    value: "descricao"
                },
                { text: "Meta de Gastos", value: "metaGastos" },
                { text: "Data de Inicio", value: "dataInicio" },
                {
                    text: "Data de Fim",
                    value: "dataFim"
                },
                { text: "Categorias", value: "categorias" },
                { text: "Opções", value: "actions" }
            ],
            planejamentos: [],
            planDropdown: [],
            metaPlan: null
        };
    },
    created() {
        this.fillData();
        this.lastPlanejamento();
        this.planDrop();
    },
    methods: {
        addNewItem() {
            this.$router.push({ name: "PlanejamentoForm" });
        },
        editItem(id) {
            this.$router.push({ name: "EditPlanejamentoForm", params: id });
        },
        planDrop() {
            PlanejamentoService.findAllDropdown()
                .then(res => {
                    this.planDropdown = res;
                    this.pd = this.planDropdown[0].id || null;
                })
                .catch(e => console.error(e));
        },
        delete(id) {
            PlanejamentoService.delete(id)
                .then(() => {
                    this.alert = {
                        open: true,
                        color: "success",
                        title: "Planejamento excluido com sucesso",
                        text: ""
                    };
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro ao tentar excluir",
                        text: e.message
                    };
                });
        },
        deleteItem(item) {
            this.itemD = item.id;
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            this.delete(this.itemD);
            this.closeDelete();
        },
        closeDelete() {
            this.itemD = null;
            this.dialogDelete = false;
        },
        lastPlanejamento() {
            PlanejamentoService.findLastPlanejamento()
                .then(resp => {
                    this.lastPlan = resp;
                    this.lastPlan.dataInicio = format(
                        this.lastPlan.dataInicio,
                        "dd/MM/yyyy"
                    );
                    this.lastPlan.dataFim = format(
                        this.lastPlan.dataFim,
                        "dd/MM/yyyy"
                    );

                    this.lastPlan.planejamentoPrevistoRealCategorias.reduce(
                        (a, b) => a.valorGastoAtual + b.valorGastoAtual
                    );
                    this.lastPlan.planejamentoPrevistoRealCategorias.map(r => {
                        let data = {
                            name: r.categoriaNome,
                            data: [
                                {
                                    x: r.categoriaNome,
                                    y: r.valorAtualGasto || 0
                                }
                            ]
                        };
                        this.barChartPlan.series.push(data);
                        this.barChartPlan.chartOptions.xaxis.categories.push(
                            r.categoriaNome
                        );
                        this.barChartPlan.chartOptions.colors.push(
                            r.categoriaCor
                        );
                    });
                    this.barChartPlan.chartOptions.colors.splice(0, 1);
                    this.barChartPlan.series.splice(0, 1);
                })
                .catch(e => console.error(e));
        },
        fillData() {
            PlanejamentoService.findAll()
                .then(res => {
                    this.planejamentos = res;
                    this.findSecondChart();
                })
                .catch(e => console.error(e));
        },
        findSecondChart() {
            PlanejamentoService.findPlanejamentoPrevistoDespesaReal(this.pd)
                .then(res => {
                    this.barChart = {
                        series: [
                            {
                                data: []
                            }
                        ],
                        chartOptions: {
                            xaxis: {
                                categories: []
                            },
                            labels: [],
                            colors: [],
                            chart: {
                                toolbar: {
                                    show: false
                                }
                            }
                        }
                    };
                    this.metaPlan = res.metaGastos;
                    res.planejamentoPrevistoRealCategorias.map(r => {
                        let data = {
                            name: r.categoriaNome,
                            data: [
                                {
                                    x: r.categoriaNome,
                                    y: r.valorGastoAtual || 0
                                }
                            ]
                        };
                        this.barChart.series.push(data);
                        this.barChart.chartOptions.xaxis.categories.push(
                            r.categoriaNome
                        );
                        this.barChart.chartOptions.colors.push(r.categoriaCor);
                    });
                    this.barChart.series.splice(0, 1);
                    // this.barChart.chartOptions.colors.splice(0, 1);
                    console.log(this.barChart);
                })
                .catch(e => console.error(e));
        },
        openModal(categorias) {
            this.$router.push({
                name: "PlanejamentosCategorias",
                params: { categorias }
            });
        }
    },
    watch: {
        pd() {
            this.findSecondChart();
        }
    }
};
</script>

<style scoped>
.maxWi {
    max-width: 150px;
}
.progress {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
}
</style>
