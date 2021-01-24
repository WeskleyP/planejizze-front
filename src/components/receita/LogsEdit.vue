<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="90%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud">
                        Mudança de status da receita
                    </span>
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
                                        >Data de Recebimento
                                        Experada</v-list-item-title
                                    >
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Data de Recebimento
                                        Real</v-list-item-title
                                    >
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Valor Recebido</v-list-item-title
                                    >
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Status</v-list-item-title
                                    >
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Atualizar para
                                        Recebido</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item
                                v-for="(item, key) in logs.log.type ==
                                'recebimentoComMoeda'
                                    ? logs.log.tipoRecebimentoMoedaLogs
                                    : logs.log.tipoRecebimentoBancoLogs"
                                :key="key"
                                link
                                class="ma-1 pl-3"
                            >
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">{{
                                        item.dataRecebimentoExperada
                                    }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">{{
                                        item.dataRecebimentoReal
                                    }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">{{
                                        item.valorRecebido
                                    }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">{{
                                        item.statusReceita
                                    }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-btn
                                        v-if="item.statusReceita != 'RECEBIDO'"
                                        elevation="2"
                                        class="primary"
                                        @click="
                                            changeStatus(item.id, logs.log.type)
                                        "
                                    >
                                        Alterar status
                                    </v-btn>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>
        <alert-message :attributes="alert" />
    </v-row>
</template>
<script>
import ReceitaService from "../../services/ReceitaService";

export default {
    props: ["logs"],
    data() {
        return {
            alert: {
                open: false,
                color: "",
                title: "",
                text: ""
            },
            open: true
        };
    },
    mounted() {
        this.logs.log.type == "recebimentoComMoeda"
            ? Array.from(this.logs.log.tipoRecebimentoMoedaLogs).sort(
                  (a, b) =>
                      a.dataRecebimentoExperada >= b.dataRecebimentoExperada
              )
            : Array.from(this.logs.log.tipoRecebimentoBancoLogs).sort(
                  (a, b) =>
                      a.dataRecebimentoExperada >= b.dataRecebimentoExperada
              );
        console.log(this.logs);
        // _.orderBy(
        //     this.logs,
        //     this.logs.log.type == "recebimentoComMoeda"
        //         ? this.logs.log.tipoRecebimentoMoedaLogs.dataRecebimentoExperada
        //         : this.logs.log.tipoRecebimentoBancoLogs
        //               .dataRecebimentoExperada,
        //     "desc"
        // );
    },
    methods: {
        close() {
            this.$router.back();
            this.open = false;
        },
        changeStatus(id, type) {
            if (type === "recebimentoComMoeda") {
                ReceitaService.updateReceitaStatusMoeda(id)
                    .then(() => {
                        this.alert = {
                            open: true,
                            color: "success",
                            title: "Sucesso",
                            text: "Status atualizado com sucesso"
                        };
                        this.close();
                    })
                    .catch(e => {
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro ao tentar atualizar o status",
                            text: e.message
                        };
                    });
            } else if (type === "recebimentoComBanco") {
                ReceitaService.updateReceitaStatusBanco(id)
                    .then(() => {
                        this.alert = {
                            open: true,
                            color: "success",
                            title: "Sucesso",
                            text: "Status atualizado com sucesso"
                        };
                        this.close();
                    })
                    .catch(e => {
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro ao tentar atualizar o status",
                            text: e.message
                        };
                    });
            }
        }
    }
};
</script>
<style></style>
