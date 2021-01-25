<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="90%">
            <v-card>
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud">
                        Mudança de status da despesa
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
                                        >Data de Pagamento
                                        Experada</v-list-item-title
                                    >
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Data de Pagamento
                                        Real</v-list-item-title
                                    >
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Valor Pago</v-list-item-title
                                    >
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Status</v-list-item-title
                                    >
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left"
                                        >Atualizar para Pago</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item
                                v-for="(item, key) in logs.log.type ==
                                'pagamentoComDinheiro'
                                    ? logs.log.tipoPagamentoMoedaLogs
                                    : logs.log.tipoPagamentoCartaoParcelas"
                                :key="key"
                                link
                                class="ma-1 pl-3"
                            >
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">{{
                                        item.dataPagamentoExperada
                                    }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">{{
                                        item.dataPagamentoReal
                                    }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">{{
                                        item.valorPagamento
                                    }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">{{
                                        item.statusDespesa
                                    }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-btn
                                        v-if="item.statusDespesa != 'PAGO'"
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
import DespesaService from "../../services/DespesaService";

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
        this.logs.log.type == "pagamentoComDinheiro"
            ? Array.from(this.logs.log.tipoPagamentoMoedaLogs).sort(
                  (a, b) => a.dataPagamentoExperada >= b.dataPagamentoExperada
              )
            : Array.from(this.logs.log.tipoPagamentoCartaoParcelas).sort(
                  (a, b) => a.dataPagamentoExperada >= b.dataPagamentoExperada
              );
    },
    methods: {
        close() {
            this.$router.back();
            this.open = false;
        },
        changeStatus(id, type) {
            if (type === "pagamentoComDinheiro") {
                DespesaService.updateDespesaStatusMoeda(id)
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
            } else if (type === "pagamentoComCartao") {
                DespesaService.updateDespesaStatusCartao(id)
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
