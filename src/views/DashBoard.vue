<template>
    <v-container fluid class="fill-height max-width">
        <v-row>
            <v-col cols="6" lg="6" sm="12">
                <v-card elevation="4">
                    <apexchart
                        width="380"
                        type="pie"
                        :options="pieData.chartOptions"
                        :series="pieData.series"
                    ></apexchart>
                </v-card>
            </v-col>
            <v-col cols="6" lg="6" sm="12">
                <v-card elevation="4">
                    <apexchart
                        width="380"
                        type="bar"
                        :options="horizontalBarData.chartOptions"
                        :series="horizontalBarData.series"
                    ></apexchart>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6" lg="6" sm="12">
                <v-card elevation="4">
                    <apexchart
                        width="380"
                        type="bar"
                        :options="barData.chartOptions"
                        :series="barData.series"
                    ></apexchart>
                </v-card>
            </v-col>
            <v-col cols="6" lg="6" sm="12">
                <v-card elevation="4">
                    <apexchart
                        width="380"
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
export default {
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
                series: [44, 55, 13, 43, 22],
                chartOptions: {
                    chart: {
                        width: 380,
                        type: "pie"
                    },
                    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200
                                },
                                legend: {
                                    position: "bottom"
                                }
                            }
                        }
                    ]
                }
            };
        },
        fillHorizontalBarData() {
            this.horizontalBarData = {
                series: [
                    {
                        data: [
                            400,
                            430,
                            448,
                            470,
                            540,
                            580,
                            690,
                            1100,
                            1200,
                            1380
                        ]
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
                        categories: [
                            "South Korea",
                            "Canada",
                            "United Kingdom",
                            "Netherlands",
                            "Italy",
                            "France",
                            "Japan",
                            "United States",
                            "China",
                            "Germany"
                        ]
                    }
                }
            };
            console.log("montando");
        },
        fillBarData() {
            this.barData = {
                series: [
                    {
                        data: [
                            400,
                            430,
                            448,
                            470,
                            540,
                            580,
                            690,
                            1100,
                            1200,
                            1380
                        ]
                    }
                ],
                chartOptions: {
                    chart: {
                        type: "bar",
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        categories: [
                            "South Korea",
                            "Canada",
                            "United Kingdom",
                            "Netherlands",
                            "Italy",
                            "France",
                            "Japan",
                            "United States",
                            "China",
                            "Germany"
                        ]
                    }
                }
            };
        },
        fillScatterData() {
            this.scatterData = {
                series: [
                    {
                        name: "SAMPLE A",
                        data: [
                            [16.4, 5.4],
                            [21.7, 2],
                            [25.4, 3],
                            [19, 2],
                            [10.9, 1],
                            [13.6, 3.2],
                            [10.9, 7.4],
                            [10.9, 0],
                            [10.9, 8.2],
                            [16.4, 0],
                            [16.4, 1.8],
                            [13.6, 0.3],
                            [13.6, 0],
                            [29.9, 0],
                            [27.1, 2.3],
                            [16.4, 0],
                            [13.6, 3.7],
                            [10.9, 5.2],
                            [16.4, 6.5],
                            [10.9, 0],
                            [24.5, 7.1],
                            [10.9, 0],
                            [8.1, 4.7],
                            [19, 0],
                            [21.7, 1.8],
                            [27.1, 0],
                            [24.5, 0],
                            [27.1, 0],
                            [29.9, 1.5],
                            [27.1, 0.8],
                            [22.1, 2]
                        ]
                    },
                    {
                        name: "SAMPLE B",
                        data: [
                            [36.4, 13.4],
                            [1.7, 11],
                            [5.4, 8],
                            [9, 17],
                            [1.9, 4],
                            [3.6, 12.2],
                            [1.9, 14.4],
                            [1.9, 9],
                            [1.9, 13.2],
                            [1.4, 7],
                            [6.4, 8.8],
                            [3.6, 4.3],
                            [1.6, 10],
                            [9.9, 2],
                            [7.1, 15],
                            [1.4, 0],
                            [3.6, 13.7],
                            [1.9, 15.2],
                            [6.4, 16.5],
                            [0.9, 10],
                            [4.5, 17.1],
                            [10.9, 10],
                            [0.1, 14.7],
                            [9, 10],
                            [12.7, 11.8],
                            [2.1, 10],
                            [2.5, 10],
                            [27.1, 10],
                            [2.9, 11.5],
                            [7.1, 10.8],
                            [2.1, 12]
                        ]
                    },
                    {
                        name: "SAMPLE C",
                        data: [
                            [21.7, 3],
                            [23.6, 3.5],
                            [24.6, 3],
                            [29.9, 3],
                            [21.7, 20],
                            [23, 2],
                            [10.9, 3],
                            [28, 4],
                            [27.1, 0.3],
                            [16.4, 4],
                            [13.6, 0],
                            [19, 5],
                            [22.4, 3],
                            [24.5, 3],
                            [32.6, 3],
                            [27.1, 4],
                            [29.6, 6],
                            [31.6, 8],
                            [21.6, 5],
                            [20.9, 4],
                            [22.4, 0],
                            [32.6, 10.3],
                            [29.7, 20.8],
                            [24.5, 0.8],
                            [21.4, 0],
                            [21.7, 6.9],
                            [28.6, 7.7],
                            [15.4, 0],
                            [18.1, 0],
                            [33.4, 0],
                            [16.4, 0]
                        ]
                    }
                ],
                chartOptions: {
                    chart: {
                        height: 350,
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
</style>
