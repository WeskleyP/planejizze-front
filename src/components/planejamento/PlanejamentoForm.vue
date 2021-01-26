<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="80%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud">{{
                        this.id
                            ? "Atualização de Planejamento"
                            : "Cadastro de Novo Planejamento"
                    }}</span>
                    <v-spacer></v-spacer>
                    <div class="flex-row justify-space-between">
                        <v-icon @click="close()">
                            mdi-close
                        </v-icon>
                    </div>
                </v-card-title>
                <v-form>
                    <v-card-text>
                        <v-row justify="center" class="py-5 my-5">
                            <v-col cols="5" xs="12" md="5" lg="5" class="mr-4">
                                <v-label>
                                    Descrição
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="planejamento.descricao"
                                    class="mb-5"
                                    label="Descrição"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Categorias do planejamento
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-combobox
                                    :items="categoriaDespesa"
                                    v-model="categorias"
                                    item-text="nome"
                                    multiple
                                    label="Escolha uma categoria"
                                ></v-combobox>
                                <template v-if="categorias.length > 0">
                                    <div
                                        v-for="c in categorias"
                                        :key="c.id"
                                        style="display: flex; align-items: center; justify-content: space-between;"
                                    >
                                        <span>{{ c.nome }}</span>
                                        <v-spacer />
                                        <v-text-field
                                            outlined
                                            v-model="c.valorMaximoGasto"
                                            label="Valor máximo"
                                            class="text-right mw"
                                            single-line
                                            hide-details
                                        ></v-text-field>
                                    </div>
                                </template>
                            </v-col>
                            <v-divider vertical />
                            <v-col cols="5" xs="12" md="5" lg="5" class="ml-4">
                                <v-label>
                                    Meta de Gastos Total
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="planejamento.metaGastos"
                                    class="mb-5"
                                    label="Meta de Gastos"
                                    single-line
                                    type="number"
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Mês
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-menu
                                    ref="date"
                                    v-model="date"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    :disabled="id != null"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            required
                                            outlined
                                            dense
                                            readonly
                                            :disabled="id != null"
                                            :value="formatMonth(selectedMonth)"
                                            v-on="on"
                                            v-bind="attrs"
                                            height="40px"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="selectedMonth"
                                        no-title
                                        type="month"
                                        locale="pt-br"
                                        scrollable
                                        @input="date = false"
                                    />
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-divider />
                        <v-row class="pa-4">
                            <v-spacer />
                            <v-btn class="bgIndex" @click="close()"
                                >Cancelar</v-btn
                            >
                            <v-btn class="primary" @click="salvar()"
                                >Salvar</v-btn
                            >
                        </v-row>
                    </v-card-text>
                </v-form>
            </v-card>
            <router-view />
            <alert-message :attributes="alert" />
        </v-dialog>
    </v-row>
</template>

<script>
import PlanejamentoService from "../../services/PlanejamentoService";
import CategoriaDespesaService from "../../services/CategoriaDespesaService";
import moment from "moment";

export default {
    props: ["id"],
    data() {
        return {
            alert: {
                open: false,
                color: "",
                title: "",
                text: ""
            },
            months: [
                {
                    name: "Janeiro",
                    value: 1
                },
                {
                    name: "Fevereiro",
                    value: 2
                },
                {
                    name: "Março",
                    value: 3
                },
                {
                    name: "Abril",
                    value: 4
                },
                {
                    name: "Maio",
                    value: 5
                },
                {
                    name: "Junho",
                    value: 6
                },
                {
                    name: "Julho",
                    value: 7
                },
                {
                    name: "Agosto",
                    value: 8
                },
                {
                    name: "Setembro",
                    value: 9
                },
                {
                    name: "Outubro",
                    value: 10
                },
                {
                    name: "Novembro",
                    value: 11
                },
                {
                    name: "Dezembro",
                    value: 12
                }
            ],
            categorias: [],
            selectedMonth: null,
            date: false,
            categoriaDespesa: [],
            open: true,
            planejamento: {
                descricao: "",
                alertaPorcentagem: null,
                metaGastos: null,
                dataInicio: "",
                dataFim: "",
                categorias: []
            }
        };
    },
    created() {
        if (this.id) {
            PlanejamentoService.findById(this.id)
                .then(res => {
                    this.planejamento = res;
                    this.selectedMonth = moment(
                        this.planejamento.dataInicio
                    ).format("YYYY-MM");
                    this.categorias = this.generateCategoriesFromOld(
                        this.planejamento.categorias
                    );
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
        this.findCategoriasDespesas();
    },
    methods: {
        generateCategoriesFromOld(cats) {
            let categories = [];
            Array.from(cats).forEach(c => {
                categories.push({
                    id: c.planejamentoCategoriaPK.categoriaDespesa.id,
                    nome: c.planejamentoCategoriaPK.categoriaDespesa.nome,
                    cor: c.planejamentoCategoriaPK.categoriaDespesa.cor,
                    valorMaximoGasto: c.valorMaximoGasto
                });
            });
            return categories;
        },
        findCategoriasDespesas() {
            CategoriaDespesaService.findAll()
                .then(res => {
                    this.categoriaDespesa = res;
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
        close() {
            this.$router.back();
            this.open = false;
        },
        formatTextDate(date) {
            return date ? moment(date).format("DD/MM/YYYY") : "";
        },
        formatMonth(month) {
            return month ? moment(month).format("MM/YYYY") : "";
        },
        updateCategorias(categories) {
            let categoriesToSave = [];
            Array.from(categories).forEach(cat => {
                categoriesToSave.push({
                    planejamentoCategoriaPK: {
                        categoriaDespesa: {
                            id: cat.id
                        }
                    },
                    valorMaximoGasto: Number(cat.valorMaximoGasto)
                });
            });
            return categoriesToSave;
        },
        createCategorias(categories) {
            let categoriesToSave = [];
            Array.from(categories).forEach(cat => {
                categoriesToSave.push({
                    planejamentoCategoriaPK: {
                        categoriaDespesa: {
                            id: cat.id
                        }
                    },
                    valorMaximoGasto: Number(cat.valorMaximoGasto)
                });
            });
            return categoriesToSave;
        },
        salvar() {
            let planejamentoASalvar = {};
            if (this.id != null) {
                planejamentoASalvar = {
                    id: this.planejamento.id,
                    descricao: this.planejamento.descricao,
                    alertaPorcentagem: this.planejamento.alertaPorcentagem,
                    metaGastos: Number(this.planejamento.metaGastos),
                    dataInicio: this.planejamento.dataInicio,
                    dataFim: this.planejamento.dataFim,
                    categorias: this.updateCategorias(this.categorias)
                };
                PlanejamentoService.update(planejamentoASalvar)
                    .then(() => {
                        this.alert = {
                            open: true,
                            color: "success",
                            title: "Sucesso",
                            text: "Planejamento salvo com sucesso"
                        };
                        this.close();
                    })
                    .catch(e => {
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro ao salvar planejamento",
                            text: e.message
                        };
                    });
            } else {
                console.log(
                    "firstDay",
                    moment(this.selectedMonth)
                        .startOf("month")
                        .format("DD/MM/YYYY")
                );
                planejamentoASalvar = {
                    id: null,
                    descricao: this.planejamento.descricao,
                    alertaPorcentagem: null,
                    metaGastos: Number(this.planejamento.metaGastos),
                    dataInicio: moment(this.selectedMonth)
                        .startOf("month")
                        .format("DD/MM/YYYY"),
                    dataFim: moment(this.selectedMonth)
                        .endOf("month")
                        .format("DD/MM/YYYY"),
                    categorias: this.createCategorias(this.categorias)
                };
                PlanejamentoService.save(planejamentoASalvar)
                    .then(() => {
                        this.alert = {
                            open: true,
                            color: "success",
                            title: "Sucesso",
                            text: "Planejamento salvo com sucesso"
                        };
                        this.close();
                    })
                    .catch(e => {
                        console.error(e);
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro ao salvar planejamento",
                            text:
                                e.message ||
                                "Você já possui um planejamento no periodo selecionado"
                        };
                    });
            }
        }
    }
};
</script>

<style scoped>
.divider {
    width: 100;
}
.mw {
    max-width: 200px;
}
</style>
