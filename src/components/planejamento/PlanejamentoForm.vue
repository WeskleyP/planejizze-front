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
                                <v-select
                                    :items="categoriaDespesa"
                                    v-model="planejamento.categorias"
                                    item-text="nome"
                                    item-value="id"
                                    multiple
                                    label="Escolha uma categoria"
                                    ><template v-slot:item="{ item }">
                                        <span>{{ item.nome }}</span>
                                        <v-spacer />
                                        <v-text-field
                                            outlined
                                            v-model="
                                                planejamento.categorias
                                                    .valorMaximoGasto
                                            "
                                            label="Valor máximo"
                                            class="text-right mw"
                                            single-line
                                            hide-details
                                        ></v-text-field>
                                    </template>
                                </v-select>
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
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Mês
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-select
                                    :items="months"
                                    v-model="selectedMonth"
                                    item-text="name"
                                    item-value="value"
                                    label="Escolha o mês do planejamento"
                                ></v-select>
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
        </v-dialog>
        <alert-message :attributes="alert" />
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
                categorias: [
                    {
                        planejamentoCategoriaPK: {
                            categoriaDespesa: {
                                id: null
                            }
                        },
                        valorMaximoGasto: null
                    }
                ]
            }
        };
    },
    created() {
        if (this.id) {
            PlanejamentoService.findById(this.id)
                .then(res => {
                    this.planejamento = res;
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
        addCategory(id) {
            if (this.id == null) {
                if (id == null) {
                    this.$router.push({ name: "PlanCategoriaDespesa" });
                } else {
                    this.$router.push({
                        name: "PlanEditCategoriaDespesa",
                        params: { idCat: id }
                    });
                }
            } else {
                if (id == null) {
                    this.$router.push({ name: "EditingPlanCategoriaDespesa" });
                } else {
                    this.$router.push({
                        name: "EditingPlanEditCategoriaDespesa",
                        params: { idCat: id }
                    });
                }
            }
            if (id == null) {
                this.$router.push({ name: "CategoriaDespesa" });
            } else {
                this.$router.push({
                    name: "EditCategoriaDespesa",
                    params: { idCat: id }
                });
            }
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
        salvar() {
            console.log(this.planejamento);
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
