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
                <v-card-text>
                    <v-row justify="center" class="py-5 my-5">
                        <v-col cols="5" xs="12" md="5" lg="5" class="mr-4">
                            <v-text-field
                                append-icon="mdi-magnify"
                                label="Pesquisar"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-text-field
                                append-icon="mdi-magnify"
                                label="Pesquisar"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-text-field
                                append-icon="mdi-magnify"
                                label="Pesquisar"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-divider vertical />
                        <v-col cols="5" xs="12" md="5" lg="5" class="ml-4">
                            <v-text-field
                                append-icon="mdi-magnify"
                                label="Pesquisar"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-text-field
                                append-icon="mdi-magnify"
                                label="Pesquisar"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-text-field
                                append-icon="mdi-magnify"
                                label="Pesquisar"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row class="pa-4">
                        <v-spacer />
                        <v-btn class="bgIndex" @click="close()">Cancelar</v-btn>
                        <v-btn class="primary">Salvar</v-btn>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            open: true
        };
    },
    beforeCreate() {
        console.log("criando o dialog");
    },
    methods: {
        close() {
            this.$router.back();
            this.open = false;
        }
    }
};
</script>

<style scoped></style>
