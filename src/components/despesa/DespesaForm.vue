<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="80%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud">{{
                        this.id
                            ? "Atualização de Despesa"
                            : "Cadastro de Nova Despesa"
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
                                    Valor
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="despesa.valor"
                                    class="mb-5"
                                    label="Valor"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    A despesa irá se repetir
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-switch
                                    v-model="despesa.repetir"
                                    label="Repete-se?"
                                ></v-switch>
                                <v-label>
                                    Categoria da despesa
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-select
                                    :items="categoriaDespesa"
                                    v-model="despesa.categoriaDespesa"
                                    item-text="nome"
                                    item-value="id"
                                    label="Escolha uma categoria"
                                    ><template v-slot:append-outer>
                                        <template
                                            v-if="
                                                despesa.categoriaDespesa.id ===
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
                                                        despesa.categoriaDespesa
                                                            .id
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
                                </v-select>
                            </v-col>
                            <v-divider vertical />
                            <v-col cols="5" xs="12" md="5" lg="5" class="ml-4">
                                <v-label>
                                    Data de Pagamento
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-menu
                                    ref="date"
                                    v-model="date"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            required
                                            outlined
                                            dense
                                            readonly
                                            :value="
                                                formatTextDate(
                                                    despesa.tipoPagamento
                                                        .diaPagamento
                                                )
                                            "
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="
                                            despesa.tipoPagamento.diaPagamento
                                        "
                                        no-title
                                        scrollable
                                        @input="date = false"
                                    />
                                </v-menu>
                                <v-label>
                                    Descrição
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="despesa.descricao"
                                    class="mb-5"
                                    label="Descrição"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Forma de pagamento
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-card elevation="2" :disabled="id != null">
                                    <v-row>
                                        <v-col cols="5">
                                            <v-radio-group
                                                v-model="
                                                    despesa.tipoPagamento.type
                                                "
                                            >
                                                <v-radio
                                                    label="Cartão"
                                                    value="pagamentoComCartao"
                                                ></v-radio>
                                                <v-radio
                                                    label="Dinheiro"
                                                    value="pagamentoComMoeda"
                                                ></v-radio>
                                            </v-radio-group>
                                        </v-col>
                                        <v-col cols="7">
                                            <v-select
                                                v-if="
                                                    despesa.tipoPagamento
                                                        .type ===
                                                        'pagamentoComCartao'
                                                "
                                                :items="cartaos"
                                                v-model="
                                                    despesa.tipoPagamento.cartao
                                                "
                                                item-text="descricao"
                                                item-value="id"
                                                label="Escolha um cartao"
                                                ><template v-slot:append-outer>
                                                    <template
                                                        v-if="
                                                            despesa
                                                                .tipoPagamento
                                                                .cartao.id ===
                                                                null
                                                        "
                                                    >
                                                        <v-btn
                                                            icon
                                                            @click="
                                                                addCartao(null)
                                                            "
                                                        >
                                                            <v-icon
                                                                class="purple--text"
                                                                >mdi-plus-circle</v-icon
                                                            >
                                                        </v-btn>
                                                    </template>
                                                    <template v-else>
                                                        <v-btn
                                                            icon
                                                            @click="
                                                                addCartao(
                                                                    despesa
                                                                        .tipoPagamento
                                                                        .cartao
                                                                )
                                                            "
                                                        >
                                                            <v-icon
                                                                class="purple--text"
                                                                >mdi-pencil</v-icon
                                                            >
                                                        </v-btn>
                                                        <v-btn icon>
                                                            <v-icon
                                                                class="purple--text"
                                                                >mdi-delete</v-icon
                                                            >
                                                        </v-btn>
                                                    </template>
                                                </template>
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                </v-card>
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
import DespesaService from "../../services/DespesaService";
import CategoriaDespesaService from "../../services/CategoriaDespesaService";
import CartaoService from "../../services/CartaoService";
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
            cartaos: [],
            open: true,
            despesa: {
                id: null,
                descricao: "",
                valor: null,
                repetir: false,
                tipoPagamento: {
                    type: "pagamentoComMoeda",
                    cartao: {
                        id: null
                    },
                    diaPagamento: ""
                },
                categoriaDespesa: {
                    id: null
                }
            }
        };
    },
    created() {
        if (this.id) {
            DespesaService.findById(this.id)
                .then(res => {
                    this.despesa = res;
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
        addCartao(id) {
            if (id == null) {
                this.$router.push({ name: "Cartao" });
            } else {
                this.$router.push({
                    name: "EditCartao",
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
            console.log(this.despesa);
        }
    },
    computed: {
        receb() {
            return this.despesa.tipoPagamento.type;
        }
    },
    watch: {
        receb() {
            if (this.despesa.tipoPagamento.type == "pagamentoComCartao") {
                CartaoService.findAll()
                    .then(res => {
                        this.cartaos = res;
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
        }
    }
};
</script>

<style scoped>
.divider {
    width: 100;
}
</style>
