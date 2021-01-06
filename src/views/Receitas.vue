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
                            >Você recebeu R$ {{ cards.v1 || 0 }} nos últimos 30
                            dias</v-card
                        >
                        <v-card
                            elevation="2"
                            color="rgba(132, 74, 112, 0.5)"
                            class="wid ma-5"
                            >Você irá receber R$ {{ cards.v2 || 0 }} nos
                            próximos 30 dias</v-card
                        >
                        <v-card
                            elevation="2"
                            color="rgba(81, 73, 118, 0.5)"
                            class="wid ma-5"
                            >Sua próxima receita será no valor de R$
                            {{ cards.v3 || 0 }}</v-card
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
                                    Adicionar nova receita
                                </v-btn>
                            </v-toolbar>
                        </template>
                        <!-- TODO mudar isso aqui-->
                        <template v-slot:[`item.repetir`]="{ item }">
                            <div
                                :class="
                                    item.repetir ? 'purple--text' : 'red--text'
                                "
                            >
                                {{ item.repetir ? "Sim" : "Não" }}
                            </div>
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
import ReceitaService from "../services/ReceitaService";
import { getMonth } from "date-fns";
export default {
    data() {
        return {
            search: "",
            recebimentoModal: false,
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
                { text: "Categoria", value: "categoriaReceita.nome" },
                { text: "Valor", value: "valor" },
                {
                    text: "Recebimento",
                    value: "tipoRecebimento"
                },
                { text: "Status", value: "status" },
                { text: "Repete-se?", value: "repetir" },
                { text: "Opções", value: "actions" }
            ],
            receitas: []
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
            this.recebimentoModal = !this.recebimentoModal;
        },
        addNewItem() {
            this.$router.push({ name: "NewReceita" });
        },
        fillCardData() {
            ReceitaService.findReceitasLast30Days()
                .then(res => {
                    this.cards.v1 = res.count;
                })
                .catch(e => console.error(e.message));
            ReceitaService.findReceitasNext30Days()
                .then(res => {
                    this.cards.v2 = res.count;
                })
                .catch(e => console.error(e.message));
            ReceitaService.findNextReceita()
                .then(res => {
                    this.cards.v3 = res.count;
                })
                .catch(e => console.error(e.message));
        },
        filTable() {
            ReceitaService.findAllPaginated(0, 5)
                .then(resp => {
                    this.receitas = resp.content.map(res => {
                        return {
                            id: res.id,
                            descricao: res.descricao,
                            categoriaReceita: res.categoriaReceita,
                            valor: res.valor,
                            tipoRecebimento:
                                res.tipoRecebimento.type ==
                                "recebimentoComBanco"
                                    ? res.tipoRecebimento.tipoRecebimentoBancoLogs.reduce(
                                          (a, b) =>
                                              a.dataRecebimentoExperada >=
                                              b.dataRecebimentoExperada
                                                  ? a.dataRecebimentoExperada
                                                  : b.dataRecebimentoExperada,
                                          ""
                                      )
                                    : res.tipoRecebimento.tipoRecebimentoMoedaLogs.reduce(
                                          (a, b) =>
                                              a.dataRecebimentoExperada >=
                                              b.dataRecebimentoExperada
                                                  ? a.dataRecebimentoExperada
                                                  : b.dataRecebimentoExperada,
                                          ""
                                      ),
                            status:
                                res.tipoRecebimento.type ===
                                "recebimentoComBanco"
                                    ? res.tipoRecebimento.tipoRecebimentoBancoLogs.reduce(
                                          (a, b) =>
                                              a.dataRecebimentoExperada >=
                                              b.dataRecebimentoExperada
                                                  ? a.statusReceita
                                                  : b.statusReceita,
                                          ""
                                      )
                                    : res.tipoRecebimento.tipoRecebimentoMoedaLogs.reduce(
                                          (a, b) =>
                                              a.dataRecebimentoExperada >=
                                              b.dataRecebimentoExperada
                                                  ? a.statusReceita
                                                  : b.statusReceita,
                                          ""
                                      ),
                            repetir: res.repetir
                        };
                    });
                    this.receitas.forEach(e =>
                        e.status.toString().replace("_", " ")
                    );
                    console.log("Receitas", this.receitas);
                })
                .catch(e => console.error(e));
        },
        fillBarChart() {
            ReceitaService.findReceitasLast6Months()
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
            ReceitaService.porCategoriaEMês(mes)
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
