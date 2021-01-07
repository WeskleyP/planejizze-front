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
                        <v-row>
                            <v-col cols="6">
                                <v-subheader class="text-h6 text-left">
                                    Receitas
                                </v-subheader>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    :items="days"
                                    v-model="selectedDay"
                                    item-text="value"
                                    item-value="num"
                                    label="Escolha um período"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-sheet>
                    <apexchart
                        class="chartPos"
                        width="450"
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
                        <v-row>
                            <v-col cols="6">
                                <v-subheader class="text-h6 text-left">
                                    Despesas
                                </v-subheader>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    :items="days"
                                    v-model="selectedDay2"
                                    item-text="value"
                                    item-value="num"
                                    label="Escolha um período"
                                ></v-select>
                            </v-col>
                        </v-row>
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
                        <div class="text-h6 text-center">
                            Último planejamento
                        </div>
                    </v-sheet>
                    <apexchart
                        class="chartPos"
                        width="380"
                        height="100%"
                        type="bar"
                        :options="lineData.chartOptions"
                        :series="lineData.series"
                    ></apexchart>
                </v-card>
            </v-col>
        </v-row>
        <alert-message :attributes="alert" />
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
            alert: {
                open: false,
                color: "",
                title: "",
                text: ""
            },
            pieData: {
                series: [],
                chartOptions: {
                    labels: [],
                    colors: []
                }
            },
            horizontalBarData: {
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
            barData: {
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
            lineData: {
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
            selectedDay: null,
            selectedDay2: null
        };
    },
    created() {
        this.selectedDay = this.days[3].num;
        this.selectedDay2 = this.days[3].num;
    },
    mounted() {
        this.fillPieData();
        // this.fillHorizontalBarData();
        // this.fillBarData();
        this.fillScatterData();
    },
    methods: {
        fillPieData() {
            this.pieData = {
                series: [],
                chartOptions: {
                    labels: [],
                    colors: []
                }
            };
            DespesaService.porCategoriaEMês(this.month)
                .then(res => {
                    res.map(r => {
                        this.pieData.series.push(r.valor);
                        this.pieData.chartOptions.labels.push(r.categoriaNome);
                        this.pieData.chartOptions.colors.push(r.categoriaCor);
                    });
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro a buscar dados",
                        text: e.message
                    };
                });
        },
        fillHorizontalBarData() {
            this.horizontalBarData = {
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
            };
            ReceitaService.dashboard(this.selectedDay)
                .then(res => {
                    res.map(item => item.age).filter(
                        (value, index, self) => self.indexOf(value) === index
                    );
                    res.map(r => {
                        let data = {
                            name: r.categoriaReceita.nome,
                            data: [
                                {
                                    x: r.categoriaReceita.nome,
                                    y: r.valor
                                }
                            ]
                        };
                        this.horizontalBarData.series.push(data);
                        this.horizontalBarData.chartOptions.xaxis.categories.push(
                            r.categoriaReceita.nome
                        );
                        this.horizontalBarData.chartOptions.colors.push(
                            r.categoriaReceita.cor
                        );
                    });
                    this.horizontalBarData.chartOptions.colors.splice(0, 1);
                    this.horizontalBarData.series.splice(0, 1);
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro a buscar dados",
                        text: e.message
                    };
                });
        },
        fillBarData() {
            this.barData = {
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
            };
            DespesaService.dashboard(this.selectedDay2)
                .then(res => {
                    res.map(r => {
                        let data = {
                            name: r.categoriaDespesa.nome,
                            data: [
                                {
                                    x: r.categoriaDespesa.nome,
                                    y: r.valor
                                }
                            ]
                        };
                        this.barData.series.push(data);
                        this.barData.chartOptions.xaxis.categories.push(
                            r.categoriaDespesa.nome
                        );
                        this.barData.chartOptions.colors.push(
                            r.categoriaDespesa.cor
                        );
                    });
                    this.barData.chartOptions.colors.splice(0, 1);
                    this.barData.series.splice(0, 1);
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro a buscar dados",
                        text: e.message
                    };
                });
        },
        fillScatterData() {
            PlanejamentoService.findLastPlanejamento()
                .then(res => {
                    console.log("plan", res);
                    res.planejamentoPrevistoRealCategorias.reduce(
                        (a, b) => a.valorGastoAtual + b.valorGastoAtual
                    );
                    res.planejamentoPrevistoRealCategorias.forEach(r => {
                        let data = {
                            name: r.categoriaNome,
                            data: [
                                {
                                    x: r.categoriaNome,
                                    y: r.valorAtualGasto || 0
                                }
                            ]
                        };
                        this.lineData.series.push(data);
                        this.lineData.chartOptions.xaxis.categories.push(
                            r.categoriaNome
                        );
                        this.lineData.chartOptions.colors.push(r.categoriaCor);
                    });
                    this.lineData.chartOptions.colors.splice(0, 1);
                    this.lineData.series.splice(0, 1);
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro a buscar dados",
                        text: e.message
                    };
                });
        }
    },
    watch: {
        selectedDay() {
            this.fillHorizontalBarData();
        },
        selectedDay2() {
            this.fillBarData();
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
