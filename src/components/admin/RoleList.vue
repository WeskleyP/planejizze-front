<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="70%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud"
                        >Descrição da função {{ role.nome }}</span
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
                                        >Permissôes</v-list-item-title
                                    >
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Valores</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item
                                v-for="(item, key) in role.permissions"
                                :key="key"
                                link
                                class="ma-1 pl-3"
                            >
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">{{
                                        key
                                    }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Ler:
                                        {{
                                            role.permissions[key].read
                                                ? "Sim"
                                                : "Não"
                                        }}, Criar:
                                        {{
                                            role.permissions[key].create
                                                ? "Sim"
                                                : "Não"
                                        }}, Alterar:
                                        {{
                                            role.permissions[key].update
                                                ? "Sim"
                                                : "Não"
                                        }}, Deletar:
                                        {{
                                            role.permissions[key].delete
                                                ? "Sim"
                                                : "Não"
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
    props: ["role"],
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
