<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="80%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud"
                        >Cadastro de Nova Receita</span
                    >
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
                                <v-text-field
                                    outlined
                                    v-model="receita.valor"
                                    class="mb-5"
                                    label="Valor"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-text-field
                                    outlined
                                    v-model="receita.tipoRecebimento"
                                    class="mb-5"
                                    label="Status"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-text-field
                                    outlined
                                    v-model="receita.categoriaReceita"
                                    class="mb-5"
                                    label="Categoria"
                                    single-line
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-divider vertical />
                            <v-col cols="5" xs="12" md="5" lg="5" class="ml-4">
                                <v-text-field
                                    outlined
                                    v-model="
                                        receita.tipoRecebimento.diaPagamento
                                    "
                                    class="mb-5"
                                    label="Data de Recebimento"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-text-field
                                    outlined
                                    v-model="receita.descricao"
                                    class="mb-5"
                                    label="Descrição"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-text-field
                                    outlined
                                    v-model="receita.tipoRecebimento"
                                    class="mb-5"
                                    label="Tipo recebimento"
                                    single-line
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider />
                        <v-row class="pa-4">
                            <v-spacer />
                            <v-btn class="bgIndex" @click="close()"
                                >Cancelar</v-btn
                            >
                            <v-btn class="primary">Salvar</v-btn>
                        </v-row>
                    </v-card-text>
                </v-form>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import ReceitaService from "../../services/ReceitaService";

export default {
    props: ["id"],
    data() {
        return {
            open: true,
            receita: {
                id: null,
                descricao: "",
                valor: null,
                repetir: false,
                tipoRecebimento: {
                    type: "",
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
        ReceitaService.findById(this.id)
            .then(res => {
                this.receita = res;
            })
            .catch(e => console.error(e));
    },
    methods: {
        close() {
            this.$router.back();
            this.open = false;
        }
    }
};
</script>

<style scoped>
.divider {
    width: 100;
}
</style>
