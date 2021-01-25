<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="50%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud">{{
                        this.idCat
                            ? "Atualização de Categoria de Despesa"
                            : "Cadastro de Nova Categoria de Despesa"
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
                                    Nome da categoria
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-text-field
                                    outlined
                                    v-model="categoria.nome"
                                    class="mb-5"
                                    label="Nome da categoria"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-label>
                                    Cor
                                    <span style="color: red"> * </span>
                                </v-label>
                                <v-color-picker
                                    dot-size="25"
                                    class="color"
                                    width="500"
                                    v-model="categoria.cor"
                                ></v-color-picker>
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
import CategoriaDespesaService from "../../../services/CategoriaDespesaService";

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
            categoria: {
                id: null,
                nome: "",
                cor: ""
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
            CategoriaDespesaService.findById(id)
                .then(res => {
                    this.categoria = res;
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
            this.categoria.cor = this.categoria.cor.substring(0, 7);
            if (this.idCat || this.categoria.id != null) {
                CategoriaDespesaService.update(this.categoria)
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
                CategoriaDespesaService.save(this.categoria)
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
