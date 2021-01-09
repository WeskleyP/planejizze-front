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
                                    label="Valor"
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
                                                @click="
                                                    addCategory(
                                                        receita.categoriaReceita
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
                                    Data de Recebimento
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
                                                    receita.tipoRecebimento
                                                        .diaPagamento
                                                )
                                            "
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="
                                            receita.tipoRecebimento.diaPagamento
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
import ReceitaService from "../../services/ReceitaService";
import CategoriaReceitaService from "../../services/CategoriaReceitaService";
import BancoService from "../../services/BancoService";
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
            }
        };
    },
    created() {
        if (this.id) {
            ReceitaService.findById(this.id)
                .then(res => {
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
        formatTextDate(date) {
            return date ? parse(date, "dd/MM/yyyy", "20/01/2021") : "";
        },
        salvar() {
            console.log(this.receita);
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
