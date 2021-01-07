<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="50%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud">{{
                        this.id
                            ? "Atualização de Categoria de Receita"
                            : "Cadastro de Nova Categoria de Receita"
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
import CategoriaReceitaService from "../../../services/CategoriaReceitaService";

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
            categoria: {
                id: null,
                nome: "",
                cor: ""
            },
            open: true
        };
    },
    methods: {
        close() {
            this.$router.back();
            this.open = false;
        },
        salvar() {
            if (this.id || this.categoria.id != null) {
                CategoriaReceitaService.update(this.categoria)
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
                CategoriaReceitaService.save(this.categoria)
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
