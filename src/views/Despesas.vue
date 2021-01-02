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
                        >
                            Você pagou R$ {{ cards.v1 }} nos últimos 30
                            dias</v-card
                        >
                        <v-card
                            elevation="2"
                            color="rgba(132, 74, 112, 0.5)"
                            class="wid ma-5"
                            >Você terá que pagar R$ {{ cards.v2 }} nos próximos
                            30 dias</v-card
                        >
                        <v-card
                            elevation="2"
                            color="rgba(81, 73, 118, 0.5)"
                            class="wid ma-5"
                            >Sua última despesa foi no valor de R$
                            {{ cards.v3 }}</v-card
                        >
                    </v-item-group>
                </v-row>
                <v-row class="my-4">
                    <v-sheet
                        class="px-4 pt-4 pb-3 text-center my-5"
                        tile
                        width="100%"
                    >
                        <div class="text-h2">Suas Despesas</div>
                    </v-sheet>
                    <v-data-table
                        :headers="headers"
                        :items="despesas"
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
                                    hide-details
                                ></v-text-field>
                                <v-btn
                                    color="primary"
                                    class="mb-2 ml-2"
                                    @click="addNewItem()"
                                >
                                    Adicionar nova despesa
                                </v-btn>
                            </v-toolbar>
                        </template>
                        <!-- TODO mudar isso aqui-->
                        <template
                            v-slot:[`item.tipoPagamento`]="{
                                item
                            }"
                            @click="openOrCloseRecebimentoModal"
                        >
                            <v-btn
                                class="primary"
                                @click="openOrCloseRecebimentoModal"
                            >
                                Status Receita
                            </v-btn>
                            <v-dialog
                                v-if="pagamentoModal"
                                v-model="item.tipoPagamento"
                                max-width="500"
                                style="height: 100%"
                                @click:outside="openOrCloseRecebimentoModal"
                            >
                                <v-data-table
                                    :headers="headersOtherTable"
                                    :items="
                                        item.tipoPagamento.type ==
                                        'pagamentoComMoeda'
                                            ? item.tipoPagamento
                                                  .tipoPagamentoMoedaLogs
                                            : item.tipoPagamento
                                                  .tipoPagamentoCartaoParcelas
                                    "
                                    :items-per-page="999"
                                    :item-key="
                                        item.tipoPagamento.type ==
                                        'pagamentoComMoeda'
                                            ? item.tipoPagamento
                                                  .tipoPagamentoMoedaLogs
                                            : item.tipoPagamento
                                                  .tipoPagamentoCartaoParcelas
                                    "
                                    class="elevation-1 fw"
                                    no-data-text="Não foi encontrado nenhum dado!"
                                    no-results-text="Não foi encontrado nenhum dado!"
                                >
                                </v-data-table>
                            </v-dialog>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
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
                            ref="fChart"
                            :options="barChart.chartOptions"
                            :series="barChart.series"
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
                            :options="pieChart.chartOptions"
                            :series="pieChart.series"
                        ></apexchart>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
        <router-view />
    </v-container>
</template>
<script>
import DespesaService from "../services/DespesaService";
import { getMonth } from "date-fns";
export default {
    data() {
        return {
            search: "",
            pagamentoModal: false,
            month: getMonth(new Date()) + 1,
            cards: {
                v1: 0,
                v2: 0,
                v3: 0
            },
            dataTable: [],
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
            pieChart: {
                series: [],
                chartOptions: {
                    labels: [],
                    colors: []
                }
            },
            headersOtherTable: [
                {
                    text: "Data Recebimento Experada",
                    value: "dataRecebimentoExperada"
                },
                { text: "Data Recebimento Real", value: "dataRecebimentoReal" },
                { text: "Status", value: "statusReceita" },
                { text: "Valor Recebido", value: "valorRecebido" }
            ],
            headers: [
                {
                    text: "Descrição",
                    align: "start",
                    sortable: false,
                    value: "descricao"
                },
                { text: "Categoria", value: "categoriaDespesa.nome" },
                { text: "Valor", value: "valor" },
                {
                    text: "Vencimento",
                    value: "tipoPagamento"
                },
                { text: "Status", value: "status" },
                { text: "Opções", value: "actions" }
            ],
            despesas: []
        };
    },
    created() {
        this.fillCardData();
        this.filTable();
        this.fillBarChart();
        this.fillPieChart(this.month);
    },
    methods: {
        openOrCloseRecebimentoModal() {
            this.pagamentoModal = !this.pagamentoModal;
        },
        addNewItem() {
            this.$router.push({ name: "NewDespesa" });
        },
        fillCardData() {
            DespesaService.findDespesasLast30Days()
                .then(res => {
                    this.cards.v1 = res.count;
                })
                .catch(e => console.error(e.message));
            DespesaService.findDespesasNext30Days()
                .then(res => {
                    this.cards.v2 = res.count;
                })
                .catch(e => console.error(e.message));
            DespesaService.findNextDespesa()
                .then(res => {
                    this.cards.v3 = res.count;
                })
                .catch(e => console.error(e.message));
        },
        filTable() {
            DespesaService.findAllPaginated(0, 5).then(res => {
                this.despesas = res.content;
            });
        },
        fillBarChart() {
            DespesaService.findDespesasLast6Months()
                .then(res => {
                    res.map(r => {
                        let data = {
                            name: r.categoriaNome,
                            data: [
                                {
                                    x: r.categoriaNome,
                                    y: r.valor
                                }
                            ]
                        };
                        this.barChart.series.push(data);
                        this.barChart.chartOptions.xaxis.categories.push(
                            r.categoriaNome
                        );
                        this.barChart.chartOptions.colors.push(r.categoriaCor);
                    });
                    this.barChart.chartOptions.colors.splice(0, 1);
                    this.barChart.series.splice(0, 1);
                })
                .catch(e => console.error(e));
        },
        fillPieChart(mes) {
            DespesaService.porCategoriaEMês(mes)
                .then(res => {
                    res.map(r => {
                        this.pieChart.series.push(r.valor);
                        this.pieChart.chartOptions.labels.push(r.categoriaNome);
                        this.pieChart.chartOptions.colors.push(r.categoriaCor);
                    });
                })
                .catch(e => console.error(e));
        }
    }
};
</script>

<style scoped>
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
