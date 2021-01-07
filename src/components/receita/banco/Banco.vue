<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="50%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud">{{
                        this.idCat
                            ? "Atualização de Banco"
                            : "Cadastro de Banco"
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
                                    Nome do banco
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="banco.banco"
                                    class="mb-5"
                                    label="Nome do banco"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Descrição do banco
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="banco.descricao"
                                    class="mb-5"
                                    label="Descrição do banco"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Tipo de Conta
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-select
                                    :items="tipoContas"
                                    v-model="banco.tipoConta"
                                    item-value="value"
                                    item-text="nome"
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
import BancoService from "../../../services/BancoService";

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
            tipoContas: [
                {
                    value: "CONTA_CORRENTE",
                    nome: "Conta corrente"
                },
                {
                    value: "CONTA_POUPANCA",
                    nome: "Conta poupança"
                },
                {
                    value: "CONTA_INVESTIMENTO",
                    nome: "Conta de investimento"
                }
            ],
            banco: {
                id: null,
                descricao: "",
                banco: "",
                tipoConta: ""
            },
            open: true
        };
    },
    mounted() {
        if (this.idCat) {
            this.findBanco(this.idCat);
        }
    },
    methods: {
        close() {
            this.$router.back();
            this.open = false;
        },
        findBanco(id) {
            BancoService.findById(id)
                .then(res => {
                    this.banco = res;
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
            if (this.idCat || this.banco.id != null) {
                BancoService.update(this.banco)
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
                BancoService.save(this.banco)
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
