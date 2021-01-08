<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="50%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud">{{
                        this.idCat
                            ? "Atualização de Cartão"
                            : "Cadastro de Nova Cartão"
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
                            <v-col cols="10" class="mr-4">
                                <v-label>
                                    Nome do cartao
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="cartao.nome"
                                    class="mb-5"
                                    label="Nome do cartão"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Descrição do cartao
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="cartao.descricao"
                                    class="mb-5"
                                    label="Descrição do cartão"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Empresa do Cartão
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="cartao.empresaCartao"
                                    class="mb-5"
                                    label="Empresao do cartão"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Limite do Cartão
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="cartao.limite"
                                    class="mb-5"
                                    label="Limite do cartão"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Dia de pagamento do cartão
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="cartao.dataVencimento"
                                    class="mb-5"
                                    label="Dia de pagamento do cartão"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Tipo do Cartão
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-select
                                    :items="tipoCartaos"
                                    v-model="cartao.tipoCartao"
                                    item-value="value"
                                    item-text="nome"
                                    label="Escolha um tipo de conta"
                                ></v-select>
                                <v-label>
                                    Bandeira
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-select
                                    :items="bandeiras"
                                    v-model="cartao.bandeira"
                                    label="Escolha um tipo de conta"
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
import CartaoService from "../../../services/CartaoService";

export default {
    props: ["idCat"],
    data() {
        return {
            alert: {
                open: false,
                color: "",
                title: "",
                text: ""
            },
            tipoCartaos: [
                {
                    value: "CREDITO",
                    nome: "Crédito"
                },
                {
                    value: "DEBITO",
                    nome: "Débito"
                },
                {
                    value: "CREDITO_E_DEBITO",
                    nome: "Crédito e Débito"
                }
            ],
            bandeiras: [
                "Visa",
                "MasterCard",
                "Diners",
                "Amex",
                "Hipercard",
                "Elo",
                "Aura",
                "Discover",
                "Good Card",
                "VR Benefícios",
                "Banescard",
                "Sorocard",
                "Policard",
                "Valecard",
                "Agicard",
                "JCB",
                "CredSystem",
                "Cabal",
                "Green Card",
                "Verocheque",
                "Avista",
                "Outra"
            ],
            cartao: {
                id: null,
                bandeira: "",
                dataVencimento: "",
                descricao: "",
                empresaCartao: "",
                limite: null,
                nome: "",
                tipoCartao: "CREDITO"
            },
            open: true
        };
    },
    mounted() {
        if (this.idCat) {
            this.findDespesa(this.idCat);
        }
    },
    methods: {
        close() {
            this.$router.back();
            this.open = false;
        },
        findDespesa(id) {
            CartaoService.findById(id)
                .then(res => {
                    this.cartao = res;
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro ao buscar dados",
                        text: e.message
                    };
                });
        },
        salvar() {
            if (this.idCat || this.cartao.id != null) {
                CartaoService.update(this.cartao)
                    .then(() => {
                        this.alert = {
                            open: true,
                            color: "success",
                            title: "Sucesso",
                            text: "Dados atualizados com sucesso"
                        };
                        this.close();
                    })
                    .catch(e => {
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro ao atualizar dados",
                            text: e.message
                        };
                    });
            } else {
                CartaoService.save(this.cartao)
                    .then(() => {
                        this.alert = {
                            open: true,
                            color: "success",
                            title: "Sucesso",
                            text: "Dados atualizados com sucesso"
                        };
                        this.close();
                    })
                    .catch(e => {
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro ao salvar dados",
                            text: e.message
                        };
                    });
            }
        }
    }
};
</script>
<style></style>
