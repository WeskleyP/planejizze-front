<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="50%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud"
                        >Categorias do Planejamento</span
                    >
                    <v-spacer></v-spacer>
                    <div class="flex-row justify-space-between">
                        <v-icon @click="close()">
                            mdi-close
                        </v-icon>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-list color="pa-0">
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Categoria</v-list-item-title
                                    >
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Valor Máximo de Gastos
                                        (R$)</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item
                                v-for="item in categorias"
                                :key="
                                    item.planejamentoCategoriaPK
                                        .categoriaDespesa.id
                                "
                                link
                                class="ma-1 pl-3"
                            >
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">{{
                                        item.planejamentoCategoriaPK
                                            .categoriaDespesa.nome
                                    }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >R$
                                        {{
                                            item.valorMaximoGasto == null
                                                ? "0"
                                                : item.valorMaximoGasto
                                        }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    props: ["categorias"],
    data() {
        return {
            open: true
        };
    },
    methods: {
        close() {
            this.$router.back();
            this.open = false;
        }
    }
};
</script>
