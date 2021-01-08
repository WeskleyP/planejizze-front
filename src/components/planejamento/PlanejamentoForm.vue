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
                                    Receita Total
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="planejamento.receitaTotal"
                                    class="mb-5"
                                    label="Receita Total"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Categoria da planejamento
                                    <span style="color: red"> * </span>
                                </v-label>
                                <!-- <v-select
                                    :items="categoriaDespesa"
                                    v-model="planejamento.categoriaDespesa"
                                    item-text="nome"
                                    item-value="id"
                                    label="Escolha uma categoria"
                                    ><template v-slot:append-outer>
                                        <template
                                            v-if="
                                                planejamento.categorias.id ===
                                                    null
                                            "
                                        >
                                            <v-btn
                                                icon
                                                @click="addCategory(null)"
                                            >
                                                <v-icon class="purple--text"
                                                    >mdi-plus-circle</v-icon
                                                >
                                            </v-btn>
                                        </template>
                                        <template v-else>
                                            <v-btn
                                                icon
                                                @click="
                                                    addCategory(
                                                        planejamento.categorias
                                                    )
                                                "
                                            >
                                                <v-icon class="purple--text"
                                                    >mdi-pencil</v-icon
                                                >
                                            </v-btn>
                                            <v-btn icon>
                                                <v-icon class="purple--text"
                                                    >mdi-delete</v-icon
                                                >
                                            </v-btn>
                                        </template>
                                    </template>
                                </v-select> -->
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
import { parse } from "date-fns";

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
            date: false,
            categoriaDespesa: [],
            open: true,
            planejamento: {
                descricao: "",
                alertaPorcentagem: null,
                receitaTotal: null,
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
            return date ? parse(date, "dd/MM/yyyy", "20/01/2021") : "";
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
</style>
