<template>
    <v-container fluid class="fill-height max-width">
        <v-row>
            <v-col cols="6" lg="6" sm="12">
                <v-card elevation="4" height="100%">
                    <v-sheet
                        class="px-4 pt-4 pb-3 text-center"
                        tile
                        width="100%"
                    >
                        <div class="text-h6 text-left">
                            Despesas por Categoria no mês
                        </div>
                    </v-sheet>
                    <apexchart
                        class="chartPos"
                        width="450"
                        height="100%"
                        type="pie"
                        :options="pieData.chartOptions"
                        :series="pieData.series"
                    ></apexchart>
                </v-card>
            </v-col>
            <v-col cols="6" lg="6" sm="12">
                <v-card elevation="4" height="100%">
                    <v-sheet
                        class="px-4 pt-4 pb-3 text-center"
                        tile
                        width="100%"
                    >
                        <div class="text-h6 text-left">
                            Receitas
                        </div>
                    </v-sheet>
                    <apexchart
                        class="chartPos"
                        width="380"
                        height="100%"
                        type="bar"
                        :options="horizontalBarData.chartOptions"
                        :series="horizontalBarData.series"
                    ></apexchart>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6" lg="6" sm="12">
                <v-card elevation="4" height="100%">
                    <v-sheet
                        class="px-4 pt-4 pb-3 text-center"
                        tile
                        width="100%"
                    >
                        <div class="text-h6 text-left">
                            Despesas
                        </div>
                    </v-sheet>
                    <apexchart
                        class="chartPos"
                        height="100%"
                        width="380"
                        type="bar"
                        :options="barData.chartOptions"
                        :series="barData.series"
                    ></apexchart>
                </v-card>
            </v-col>
            <v-col cols="6" lg="6" sm="12">
                <v-card elevation="4" height="100%">
                    <v-sheet
                        class="px-4 pt-4 pb-3 text-center"
                        tile
                        width="100%"
                    >
                        <div class="text-h6 text-left">
                            Planejamento
                        </div>
                    </v-sheet>
                    <apexchart
                        class="chartPos"
                        width="380"
                        height="100%"
                        type="scatter"
                        :options="scatterData.chartOptions"
                        :series="scatterData.series"
                    ></apexchart>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ReceitaService from "../services/ReceitaService";
import DespesaService from "../services/DespesaService";
import PlanejamentoService from "../services/PlanejamentoService";
import { getMonth } from "date-fns";

export default {
    data() {
        return {
            pieData: {
                series: [],
                chartOptions: {
                    labels: [],
                    colors: []
                }
            },
            horizontalBarData: null,
            barData: null,
            scatterData: null,
            month: getMonth(new Date()) + 1,
            days: [
                {
                    num: 7,
                    value: "7 dias"
                },
                {
                    num: 15,
                    value: "15 dias"
                },
                {
                    num: 30,
                    value: "1 mês"
                },
                {
                    num: 90,
                    value: "3 meses"
                },
                {
                    num: 180,
                    value: "6 meses"
                },
                {
                    num: 360,
                    value: "1 ano"
                }
            ],
            selectedDay: null
        };
    },
    created() {
        this.selectedDay = this.days[3].num;
    },
    mounted() {
        this.fillPieData();
        this.fillHorizontalBarData();
        this.fillBarData();
        this.fillScatterData();
    },
    methods: {
        fillPieData() {
            DespesaService.porCategoriaEMês(this.month)
                .then(res => {
                    res.map(r => {
                        this.pieData.series.push(r.valor);
                        this.pieData.chartOptions.labels.push(r.categoriaNome);
                        this.pieData.chartOptions.colors.push(r.categoriaCor);
                    });
                })
                .catch(e => console.error(e));
        },
        fillHorizontalBarData() {
            ReceitaService.dashboard(this.selectedDay)
                .then(res => {
                    console.log(res);
                })
                .catch(e => console.error(e));
            this.horizontalBarData = {
                series: [
                    {
                        data: [400, 430]
                    }
                ],
                chartOptions: {
                    chart: {
                        type: "bar",
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        categories: ["South Korea", "Canada"]
                    }
                }
            };
            console.log("montando");
        },
        fillBarData() {
            DespesaService.dashboard(this.selectedDay)
                .then(res => {
                    console.log(res);
                })
                .catch(e => console.error(e));
            this.barData = {
                series: [
                    {
                        data: [400, 430]
                    }
                ],
                chartOptions: {
                    chart: {
                        type: "bar",
                        height: 350
                    },
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        categories: ["South Korea", "Canada"]
                    }
                }
            };
        },
        fillScatterData() {
            PlanejamentoService.findLastPlanejamento()
                .then(res => {
                    console.log(res);
                })
                .catch(e => console.error(e));
            this.scatterData = {
                series: [
                    {
                        name: "SAMPLE A",
                        data: [
                            [16.4, 5.4],
                            [21.7, 2]
                        ]
                    },
                    {
                        name: "SAMPLE B",
                        data: [
                            [36.4, 13.4],
                            [1.7, 11]
                        ]
                    },
                    {
                        name: "SAMPLE C",
                        data: [
                            [21.7, 3],
                            [23.6, 3.5]
                        ]
                    }
                ],
                chartOptions: {
                    chart: {
                        type: "scatter",
                        zoom: {
                            enabled: true,
                            type: "xy"
                        }
                    },
                    xaxis: {
                        tickAmount: 10,
                        labels: {
                            formatter: function(val) {
                                return parseFloat(val).toFixed(1);
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 7
                    }
                }
            };
        },
        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
        }
    }
};
</script>

<style>
.max-width {
    max-width: 1500px;
}
.chartPos {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
}
</style>
