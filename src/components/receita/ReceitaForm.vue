<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="80%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud">{{
                        this.id
                            ? "Atualização de Receita"
                            : "Cadastro de Nova Receita"
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
                                    v-model="receita.valor"
                                    class="mb-5"
                                    label="Valor (R$)"
                                    type="number"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    A receita irá se repetir
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-switch
                                    v-model="receita.repetir"
                                    label="Repete-se?"
                                ></v-switch>
                                <v-label>
                                    Categoria da receita
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-select
                                    :items="categoriaReceita"
                                    v-model="receita.categoriaReceita"
                                    item-text="nome"
                                    item-value="id"
                                    label="Escolha uma categoria"
                                    ><template v-slot:append-outer>
                                        <template
                                            v-if="
                                                receita.categoriaReceita.id ===
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
                                                v-if="
                                                    receita.categoriaReceita >=
                                                        30 ||
                                                        receita.categoriaReceita
                                                            .id >= 30
                                                "
                                                @click="
                                                    addCategory(
                                                        receita.categoriaReceita
                                                            .id == null
                                                            ? receita.categoriaReceita
                                                            : receita
                                                                  .categoriaReceita
                                                                  .id
                                                    )
                                                "
                                            >
                                                <v-icon class="purple--text"
                                                    >mdi-pencil</v-icon
                                                >
                                            </v-btn>
                                            <v-btn
                                                icon
                                                @click="
                                                    deleteItemCategoria(
                                                        receita.categoriaReceita
                                                    )
                                                "
                                                v-if="
                                                    receita.categoriaReceita >=
                                                        30 ||
                                                        receita.categoriaReceita
                                                            .id >= 30
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
                                    Data de Recebimento
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    v-model="
                                        receita.tipoRecebimento.diaPagamento
                                    "
                                    :value="
                                        formatTextDate(
                                            receita.tipoRecebimento
                                                .diaPagamento,
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
                                    v-model="receita.descricao"
                                    class="mb-5"
                                    label="Descrição"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Forma de recebimento
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-card elevation="2" :disabled="id != null">
                                    <v-row>
                                        <v-col cols="5">
                                            <v-radio-group
                                                v-model="
                                                    receita.tipoRecebimento.type
                                                "
                                            >
                                                <v-radio
                                                    label="Conta"
                                                    value="recebimentoComBanco"
                                                ></v-radio>
                                                <v-radio
                                                    label="Dinheiro"
                                                    value="recebimentoComMoeda"
                                                ></v-radio>
                                            </v-radio-group>
                                        </v-col>
                                        <v-col cols="7">
                                            <v-select
                                                v-if="
                                                    receita.tipoRecebimento
                                                        .type ===
                                                        'recebimentoComBanco'
                                                "
                                                :items="bancos"
                                                v-model="
                                                    receita.tipoRecebimento
                                                        .banco
                                                "
                                                item-text="banco"
                                                item-value="id"
                                                label="Escolha um banco"
                                                ><template v-slot:append-outer>
                                                    <template
                                                        v-if="
                                                            receita
                                                                .tipoRecebimento
                                                                .banco.id ===
                                                                null
                                                        "
                                                    >
                                                        <v-btn
                                                            icon
                                                            @click="
                                                                addBanco(null)
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
                                                                addBanco(
                                                                    receita
                                                                        .tipoRecebimento
                                                                        .banco
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
                                                                deleteItemBanco(
                                                                    receita
                                                                        .tipoRecebimento
                                                                        .banco
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
            <v-dialog v-model="deleteBanco" max-width="500px">
                <v-card>
                    <v-card-title class="headline"
                        >Você realmente deseja excluir o banco?</v-card-title
                    >
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="closeDeleteBanco"
                            >Cancelar</v-btn
                        >
                        <v-btn
                            color="primary"
                            text
                            @click="deleteItemConfirmBanco"
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
import ReceitaService from "../../services/ReceitaService";
import CategoriaReceitaService from "../../services/CategoriaReceitaService";
import BancoService from "../../services/BancoService";
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
            categoriaReceita: [],
            bancos: [],
            open: true,
            receita: {
                id: null,
                descricao: "",
                valor: null,
                repetir: false,
                tipoRecebimento: {
                    type: "recebimentoComMoeda",
                    banco: {
                        id: null
                    },
                    diaPagamento: ""
                },
                categoriaReceita: {
                    id: null
                }
            },
            itemDCat: null,
            deleteCategoria: false,
            itemDBanco: null,
            deleteBanco: false
        };
    },
    created() {
        if (this.id) {
            ReceitaService.findById(this.id)
                .then(res => {
                    res.tipoRecebimento.diaPagamento =
                        res.tipoRecebimento.type == "recebimentoComBanco"
                            ? this.formatTextDate(
                                  res.tipoRecebimento.tipoRecebimentoBancoLogs.reduce(
                                      (a, b) =>
                                          a.dataRecebimentoExperada >=
                                          b.dataRecebimentoExperada
                                              ? a.dataRecebimentoExperada
                                              : b.dataRecebimentoExperada,
                                      moment()
                                  ),
                                  "YYYY-MM-DD"
                              )
                            : this.formatTextDate(
                                  res.tipoRecebimento.tipoRecebimentoMoedaLogs.reduce(
                                      (a, b) =>
                                          a.dataRecebimentoExperada >=
                                          b.dataRecebimentoExperada
                                              ? a.dataRecebimentoExperada
                                              : b.dataRecebimentoExperada,
                                      moment()
                                  ),
                                  "YYYY-MM-DD"
                              );
                    this.receita = res;
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
        this.findCategoriasReceitas();
    },
    methods: {
        deleteBanc(id) {
            BancoService.delete(id)
                .then(() => {
                    this.alert = {
                        open: true,
                        color: "success",
                        title: "Sucesso",
                        text: "Banco/Conta bancária excluida com sucesso"
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
        deleteItemBanco(item) {
            this.itemDBanco = item || item.id;
            this.deleteBanco = true;
        },
        deleteItemConfirmBanco() {
            this.deleteBanc(this.itemDBanco);
            this.closeDelete();
        },
        closeDeleteBanco() {
            this.itemDBanco = null;
            this.deleteBanco = false;
        },
        deleteCat(id) {
            CategoriaReceitaService.delete(id)
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
                    this.$router.push({ name: "CategoriaReceita" });
                } else {
                    this.$router.push({
                        name: "EditCategoriaReceita",
                        params: { idCat: id }
                    });
                }
            } else {
                if (id == null) {
                    this.$router.push({ name: "EditingCategoriaReceita" });
                } else {
                    this.$router.push({
                        name: "EditingEditCategoriaReceita",
                        params: { idCat: id }
                    });
                }
            }
        },
        addBanco(id) {
            if (this.id == null) {
                if (id == null) {
                    this.$router.push({ name: "Banco" });
                } else {
                    this.$router.push({
                        name: "EditBanco",
                        params: { idCat: id }
                    });
                }
            } else {
                if (id == null) {
                    this.$router.push({ name: "EditingBanco" });
                } else {
                    this.$router.push({
                        name: "EditingEditBanco",
                        params: { idCat: id }
                    });
                }
            }
        },
        findCategoriasReceitas() {
            CategoriaReceitaService.findAll()
                .then(res => {
                    this.categoriaReceita = res;
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
        salvar() {
            let receitaASalvar = {};
            if (this.id != null) {
                if (
                    this.receita.tipoRecebimento.type == "recebimentoComBanco"
                ) {
                    receitaASalvar = {
                        id: this.receita.id,
                        descricao: this.receita.descricao,
                        valor: Number(this.receita.valor),
                        repetir: this.receita.repetir,
                        tipoRecebimento: {
                            type: "recebimentoComBanco",
                            banco: this.receita.tipoRecebimento.banco,
                            diaPagamento: moment(
                                this.receita.tipoRecebimento.diaPagamento,
                                "YYYY/MM/DD"
                            ).format("D"),
                            tipoRecebimentoBancoLogs: this.receita
                                .tipoRecebimento.tipoRecebimentoBancoLogs
                        },
                        categoriaReceita: {
                            id:
                                this.receita.categoriaReceita.id ||
                                this.receita.categoriaReceita
                        }
                    };
                    Array.from(
                        receitaASalvar.tipoRecebimento.tipoRecebimentoBancoLogs
                    )
                        .filter(e => e.statusReceita != "RECEBIDO")
                        .forEach(
                            e =>
                                (e.dataRecebimentoExperada = this.formatTextDate(
                                    this.receita.tipoRecebimento.diaPagamento,
                                    "DD/MM/YYYY",
                                    "YYYY-MM-DD"
                                ))
                        );
                } else {
                    receitaASalvar = {
                        id: this.receita.id,
                        descricao: this.receita.descricao,
                        valor: Number(this.receita.valor),
                        repetir: this.receita.repetir,
                        tipoRecebimento: {
                            type: "recebimentoComMoeda",
                            moeda: "R$",
                            diaPagamento: moment(
                                this.receita.tipoRecebimento.diaPagamento,
                                "YYYY/MM/DD"
                            ).format("D"),
                            tipoRecebimentoMoedaLogs: this.receita
                                .tipoRecebimento.tipoRecebimentoMoedaLogs
                        },
                        categoriaReceita: {
                            id:
                                this.receita.categoriaReceita.id ||
                                this.receita.categoriaReceita
                        }
                    };
                    Array.from(
                        receitaASalvar.tipoRecebimento.tipoRecebimentoMoedaLogs
                    )
                        .filter(e => e.statusReceita != "RECEBIDO")
                        .forEach(
                            e =>
                                (e.dataRecebimentoExperada = this.formatTextDate(
                                    this.receita.tipoRecebimento.diaPagamento,
                                    "DD/MM/YYYY",
                                    "YYYY-MM-DD"
                                ))
                        );
                }
                ReceitaService.update(receitaASalvar)
                    .then(() => {
                        this.alert = {
                            open: true,
                            color: "success",
                            title: "Sucesso",
                            text: "Receita salva com sucesso"
                        };
                        this.close();
                    })
                    .catch(e => {
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro ao salvar receita",
                            text: e.message
                        };
                    });
            } else {
                if (
                    this.receita.tipoRecebimento.type == "recebimentoComBanco"
                ) {
                    receitaASalvar = {
                        descricao: this.receita.descricao,
                        valor: Number(this.receita.valor),
                        repetir: this.receita.repetir,
                        tipoRecebimento: {
                            type: "recebimentoComBanco",
                            banco: {
                                id: this.receita.tipoRecebimento.banco
                            },
                            diaPagamento: moment(
                                this.receita.tipoRecebimento.diaPagamento,
                                "YYYY/MM/DD"
                            ).format("D"),
                            tipoRecebimentoBancoLogs: [
                                {
                                    valorRecebido: Number(this.receita.valor),
                                    statusReceita: "A_RECEBER",
                                    dataRecebimentoExperada: this.formatTextDate(
                                        this.receita.tipoRecebimento
                                            .diaPagamento,
                                        "DD/MM/YYYY",
                                        "YYYY-MM-DD"
                                    ),
                                    dataRecebimentoReal: null
                                }
                            ]
                        },
                        categoriaReceita: {
                            id: this.receita.categoriaReceita
                        }
                    };
                } else {
                    receitaASalvar = {
                        descricao: this.receita.descricao,
                        valor: Number(this.receita.valor),
                        repetir: this.receita.repetir,
                        tipoRecebimento: {
                            type: "recebimentoComMoeda",
                            moeda: "R$",
                            diaPagamento: moment(
                                this.receita.tipoRecebimento.diaPagamento,
                                "YYYY/MM/DD"
                            ).format("D"),
                            tipoRecebimentoMoedaLogs: [
                                {
                                    valorRecebido: Number(this.receita.valor),
                                    statusReceita: "A_RECEBER",
                                    dataRecebimentoExperada: this.formatTextDate(
                                        this.receita.tipoRecebimento
                                            .diaPagamento,
                                        "DD/MM/YYYY",
                                        "YYYY-MM-DD"
                                    ),
                                    dataRecebimentoReal: null
                                }
                            ]
                        },
                        categoriaReceita: {
                            id: this.receita.categoriaReceita
                        }
                    };
                }
                ReceitaService.save(receitaASalvar)
                    .then(() => {
                        this.alert = {
                            open: true,
                            color: "success",
                            title: "Sucesso",
                            text: "Receita salva com sucesso"
                        };
                        this.close();
                    })
                    .catch(e => {
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro ao salvar receita",
                            text: e.message
                        };
                    });
            }
        }
    },
    computed: {
        receb() {
            return this.receita.tipoRecebimento.type;
        }
    },
    watch: {
        receb() {
            if (this.receita.tipoRecebimento.type == "recebimentoComBanco") {
                BancoService.findAll()
                    .then(res => {
                        this.bancos = res;
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
