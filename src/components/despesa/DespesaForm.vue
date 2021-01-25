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
                                    type="number"
                                    :disabled="
                                        despesa.id &&
                                            despesa.tipoPagamento.type ===
                                                'pagamentoComCartao'
                                    "
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <template
                                    v-if="
                                        despesa.tipoPagamento.type !==
                                            'pagamentoComCartao'
                                    "
                                >
                                    <v-label>
                                        A despesa irá será fixa
                                        <span style="color: red"> * </span>
                                    </v-label>
                                    <v-switch
                                        v-model="despesa.despesaFixa"
                                        label="É fixa?"
                                    ></v-switch>
                                </template>

                                <v-label>
                                    Categoria da despesa
                                    <span style="color: red"> * </span>
                                </v-label>
                                <div>{{ despesa.categoriaDespesa.id }}</div>
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
                                                v-if="
                                                    despesa.categoriaDespesa >=
                                                        30 ||
                                                        despesa.categoriaDespesa
                                                            .id >= 30
                                                "
                                                icon
                                                @click="
                                                    addCategory(
                                                        despesa.categoriaDespesa
                                                            .id == null
                                                            ? despesa.categoriaDespesa
                                                            : despesa
                                                                  .categoriaDespesa
                                                                  .id
                                                    )
                                                "
                                            >
                                                <v-icon class="purple--text"
                                                    >mdi-pencil</v-icon
                                                >
                                            </v-btn>
                                            <v-btn
                                                v-if="
                                                    despesa.categoriaDespesa >=
                                                        30 ||
                                                        despesa.categoriaDespesa
                                                            .id >= 30
                                                "
                                                icon
                                                @click="
                                                    deleteItemCategoria(
                                                        despesa.categoriaDespesa
                                                    )
                                                "
                                            >
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
                                <v-text-field
                                    v-model="despesa.tipoPagamento.diaPagamento"
                                    :value="
                                        formatTextDate(
                                            despesa.tipoPagamento.diaPagamento,
                                            'YYYY-MM-DD'
                                        )
                                    "
                                    type="date"
                                    outlined
                                ></v-text-field>
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
                                                    value="pagamentoComDinheiro"
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
                                                        <v-btn
                                                            icon
                                                            @click="
                                                                deleteItemCartao(
                                                                    despesa
                                                                        .tipoPagamento
                                                                        .cartao
                                                                )
                                                            "
                                                        >
                                                            <v-icon
                                                                class="purple--text"
                                                                >mdi-delete</v-icon
                                                            >
                                                        </v-btn>
                                                    </template>
                                                </template>
                                            </v-select>
                                            <div
                                                v-if="
                                                    despesa.tipoPagamento
                                                        .type ===
                                                        'pagamentoComCartao'
                                                "
                                            >
                                                <v-label>
                                                    Quantidade de parcelas
                                                    <span style="color: red">
                                                        *
                                                    </span>
                                                </v-label>
                                                <v-text-field
                                                    outlined
                                                    v-model="
                                                        despesa.tipoPagamento
                                                            .quantidadeParcelas
                                                    "
                                                    class="mb-5"
                                                    label="Descrição"
                                                    single-line
                                                    type="number"
                                                    hide-details
                                                ></v-text-field>
                                            </div>
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
            <v-dialog v-model="deleteCategoria" max-width="600px">
                <v-card>
                    <v-card-title class="headline"
                        >Você realmente deseja excluir a
                        categoria?</v-card-title
                    >
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="closeDeleteCategoria"
                            >Cancelar</v-btn
                        >
                        <v-btn
                            color="primary"
                            text
                            @click="deleteItemConfirmCategoria"
                            >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="deleteCartao" max-width="500px">
                <v-card>
                    <v-card-title class="headline"
                        >Você realmente deseja excluir o cartão?</v-card-title
                    >
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="closeDeleteCartao"
                            >Cancelar</v-btn
                        >
                        <v-btn
                            color="primary"
                            text
                            @click="deleteItemConfirmCartao"
                            >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <router-view />
        </v-dialog>
        <alert-message :attributes="alert" />
    </v-row>
</template>

<script>
import DespesaService from "../../services/DespesaService";
import CategoriaDespesaService from "../../services/CategoriaDespesaService";
import CartaoService from "../../services/CartaoService";
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
            date: false,
            categoriaDespesa: [],
            cartaos: [],
            open: true,
            despesa: {
                id: null,
                descricao: "",
                valor: null,
                despesaFixa: false,
                tipoPagamento: {
                    type: "pagamentoComDinheiro",
                    quantidadeParcelas: null,
                    cartao: {
                        id: null
                    },
                    diaPagamento: ""
                },
                categoriaDespesa: {
                    id: null
                }
            },
            itemDCat: null,
            deleteCategoria: false,
            itemDCartao: null,
            deleteCartao: false
        };
    },
    created() {
        if (this.id) {
            DespesaService.findById(this.id)
                .then(res => {
                    res.tipoPagamento.diaPagamento =
                        res.tipoPagamento.type == "pagamentoComCartao"
                            ? this.formatTextDate(
                                  res.tipoPagamento.tipoPagamentoCartaoParcelas.reduce(
                                      (a, b) =>
                                          a.dataPagamentoExperada >=
                                          b.dataPagamentoExperada
                                              ? a.dataPagamentoExperada
                                              : b.dataPagamentoExperada,
                                      moment()
                                  ),
                                  "YYYY-MM-DD"
                              )
                            : this.formatTextDate(
                                  res.tipoPagamento.tipoPagamentoMoedaLogs.reduce(
                                      (a, b) =>
                                          a.dataPagamentoExperada >=
                                          b.dataPagamentoExperada
                                              ? a.dataPagamentoExperada
                                              : b.dataPagamentoExperada,
                                      moment()
                                  ),
                                  "YYYY-MM-DD"
                              );
                    this.despesa = res;
                    if (res.tipoPagamento.type == "pagamentoComCartao") {
                        this.despesa.tipoPagamento.quantidadeParcelas = Array.from(
                            res.tipoPagamento.tipoPagamentoCartaoParcelas
                        ).length;
                    }
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
        deleteCart(id) {
            CartaoService.delete(id)
                .then(() => {
                    this.alert = {
                        open: true,
                        color: "success",
                        title: "Sucesso",
                        text: "Cartão excluido com sucesso"
                    };
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro ao tentar excluir categoria",
                        text: e.message
                    };
                });
        },
        deleteItemCartao(item) {
            this.itemDCartao = item || item.id;
            this.deleteCartao = true;
        },
        deleteItemConfirmCartao() {
            this.deleteCart(this.itemDCartao);
            this.closeDelete();
        },
        closeDeleteCartao() {
            this.itemDCartao = null;
            this.deleteCartao = false;
        },
        deleteCat(id) {
            CategoriaDespesaService.delete(id)
                .then(() => {
                    this.alert = {
                        open: true,
                        color: "success",
                        title: "Sucesso",
                        text: "Categoria excluida com sucesso"
                    };
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro ao tentar excluir categoria",
                        text: e.message
                    };
                });
        },
        deleteItemCategoria(item) {
            this.itemDCat = item || item.id;
            this.deleteCategoria = true;
        },
        deleteItemConfirmCategoria() {
            this.deleteCat(this.itemD);
            this.closeDelete();
        },
        closeDeleteCategoria() {
            this.itemDCat = null;
            this.deleteCategoria = false;
        },
        addCategory(id) {
            if (this.id == null) {
                if (id == null) {
                    this.$router.push({ name: "CategoriaDespesa" });
                } else {
                    this.$router.push({
                        name: "EditCategoriaDespesa",
                        params: { idCat: id }
                    });
                }
            } else {
                if (id == null) {
                    this.$router.push({ name: "EditingCategoriaDespesa" });
                } else {
                    this.$router.push({
                        name: "EditingEditCategoriaDespesa",
                        params: { idCat: id }
                    });
                }
            }
        },
        addCartao(id) {
            if (this.id == null) {
                if (id == null) {
                    this.$router.push({ name: "Cartao" });
                } else {
                    this.$router.push({
                        name: "EditCartao",
                        params: { idCat: id }
                    });
                }
            } else {
                if (id == null) {
                    this.$router.push({ name: "EditingCartao" });
                } else {
                    this.$router.push({
                        name: "EditingEditCartao",
                        params: { idCat: id }
                    });
                }
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
        formatTextDate(date, format, referenceFormat = "DD/MM/YYYY") {
            return date ? moment(date, referenceFormat).format(format) : "";
        },
        createParcelas(valor, diaPagamento) {
            let parcelas = [];
            for (
                let index = 0;
                index < this.despesa.tipoPagamento.quantidadeParcelas;
                index++
            ) {
                const element = {
                    valorParcela: (
                        Number(valor) /
                        this.despesa.tipoPagamento.quantidadeParcelas
                    ).toFixed(2),
                    statusDespesa: "A_PAGAR",
                    numeroParcela: index + 1,
                    dataPagamentoExperada: moment(diaPagamento)
                        .add(index, "month")
                        .format("DD/MM/YYYY"),
                    dataRecebimentoReal: null
                };
                parcelas.push(element);
            }
            return parcelas;
        },
        updateParcelas(parcelas, diaPagamento) {
            let finalParcelas = [];
            diaPagamento = moment(diaPagamento, "YYYY/MM/DD").format("D");
            console.log(diaPagamento);
            for (let index = 0; index < parcelas.length; index++) {
                let d = moment(parcelas[index].dataPagamentoExperada)
                    .set("date", diaPagamento)
                    .format("DD/MM/YYYY");
                console.log(moment(d).get("dates"));
                finalParcelas.push({
                    valorParcela: parcelas[index].valorParcela,
                    statusDespesa: parcelas[index].statusDespesa,
                    numeroParcela: parcelas[index].numeroParcela,
                    dataPagamentoExperada:
                        parcelas[index].statusDespesa != "PAGO"
                            ? d
                            : parcelas[index].dataPagamentoExperada,
                    dataRecebimentoReal: null
                });
            }
            return finalParcelas;
        },
        salvar() {
            console.log(this.despesa);
            let despesaASalvar = {};
            if (this.id != null) {
                if (this.despesa.tipoPagamento.type == "pagamentoComCartao") {
                    despesaASalvar = {
                        id: this.despesa.id,
                        descricao: this.despesa.descricao,
                        valor: Number(this.despesa.valor),
                        despesaFixa: false,
                        tipoPagamento: {
                            type: "pagamentoComCartao",
                            cartao: this.despesa.tipoPagamento.cartao,
                            diaPagamento: moment(
                                this.despesa.tipoPagamento.diaPagamento,
                                "YYYY/MM/DD"
                            ).format("D"),
                            tipoPagamentoCartaoParcelas: this.updateParcelas(
                                this.despesa.tipoPagamento
                                    .tipoPagamentoCartaoParcelas,
                                this.despesa.tipoPagamento.diaPagamento
                            )
                        },
                        categoriaDespesa: {
                            id:
                                this.despesa.categoriaDespesa.id ||
                                this.despesa.categoriaDespesa
                        }
                    };
                    Array.from(
                        despesaASalvar.tipoPagamento.tipoPagamentoCartaoParcelas
                    )
                        .filter(e => e.statusDespesa != "PAGO")
                        .forEach(
                            e =>
                                (e.dataPagamentoExperada = this.formatTextDate(
                                    this.despesa.tipoPagamento.diaPagamento,
                                    "DD/MM/YYYY",
                                    "YYYY-MM-DD"
                                ))
                        );
                } else {
                    despesaASalvar = {
                        id: this.despesa.id,
                        descricao: this.despesa.descricao,
                        valor: Number(this.despesa.valor),
                        despesaFixa: this.despesa.despesaFixa,
                        tipoPagamento: {
                            type: "pagamentoComDinheiro",
                            moeda: "R$",
                            diaPagamento: moment(
                                this.despesa.tipoPagamento.diaPagamento,
                                "YYYY/MM/DD"
                            ).format("D"),
                            tipoPagamentoMoedaLogs: this.despesa.tipoPagamento
                                .tipoPagamentoMoedaLogs
                        },
                        categoriaDespesa: {
                            id:
                                this.despesa.categoriaDespesa.id ||
                                this.despesa.categoriaDespesa
                        }
                    };
                    Array.from(
                        despesaASalvar.tipoPagamento.tipoPagamentoMoedaLogs
                    )
                        .filter(e => e.statusDespesa != "PAGO")
                        .forEach(
                            e =>
                                (e.dataPagamentoExperada = this.formatTextDate(
                                    this.despesa.tipoPagamento.diaPagamento,
                                    "DD/MM/YYYY",
                                    "YYYY-MM-DD"
                                ))
                        );
                }
                console.log("despesa update", despesaASalvar);
                // DespesaService.update(despesaASalvar)
                //     .then(() => {
                //         this.alert = {
                //             open: true,
                //             color: "success",
                //             title: "Sucesso",
                //             text: "Despesa salva com sucesso"
                //         };
                //         this.close();
                //     })
                //     .catch(e => {
                //         this.alert = {
                //             open: true,
                //             color: "error",
                //             title: "Erro ao salvar despesa",
                //             text: e.message
                //         };
                //     });
            } else {
                if (this.despesa.tipoPagamento.type == "pagamentoComCartao") {
                    despesaASalvar = {
                        descricao: this.despesa.descricao,
                        valor: Number(this.despesa.valor),
                        despesaFixa: false,
                        tipoPagamento: {
                            type: "pagamentoComCartao",
                            cartao: {
                                id: this.despesa.tipoPagamento.cartao
                            },
                            diaPagamento: moment(
                                this.despesa.tipoPagamento.diaPagamento,
                                "YYYY/MM/DD"
                            ).format("D"),
                            tipoPagamentoCartaoParcelas: this.createParcelas(
                                this.despesa.valor,
                                this.despesa.tipoPagamento.diaPagamento
                            )
                        },
                        categoriaDespesa: {
                            id: this.despesa.categoriaDespesa
                        }
                    };
                } else {
                    despesaASalvar = {
                        descricao: this.despesa.descricao,
                        valor: Number(this.despesa.valor),
                        despesaFixa: this.despesa.despesaFixa,
                        tipoPagamento: {
                            type: "pagamentoComDinheiro",
                            moeda: "R$",
                            diaPagamento: moment(
                                this.despesa.tipoPagamento.diaPagamento,
                                "YYYY/MM/DD"
                            ).format("D"),
                            tipoPagamentoMoedaLogs: [
                                {
                                    valorPagamento: Number(this.despesa.valor),
                                    statusDespesa: "A_PAGAR",
                                    numeroParcela: 1,
                                    dataPagamentoExperada: this.formatTextDate(
                                        this.despesa.tipoPagamento.diaPagamento,
                                        "DD/MM/YYYY",
                                        "YYYY-MM-DD"
                                    ),
                                    dataRecebimentoReal: null
                                }
                            ]
                        },
                        categoriaDespesa: {
                            id: this.despesa.categoriaDespesa
                        }
                    };
                }
                DespesaService.save(despesaASalvar)
                    .then(() => {
                        this.alert = {
                            open: true,
                            color: "success",
                            title: "Sucesso",
                            text: "Despesa salva com sucesso"
                        };
                        this.close();
                    })
                    .catch(e => {
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro ao salvar despesa",
                            text: e.message
                        };
                    });
            }
        }
    },
    computed: {
        pagamento() {
            return this.despesa.tipoPagamento.type;
        }
    },
    watch: {
        pagamento() {
            if (this.despesa.tipoPagamento.type == "pagamentoComCartao") {
                CartaoService.findAll()
                    .then(res => {
                        this.cartaos = res;
                    })
                    .catch(e => {
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro a buscar dados dos cartões",
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
