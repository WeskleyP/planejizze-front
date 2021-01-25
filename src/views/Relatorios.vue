<template>
    <v-container fluid>
        <v-row>
            <v-col cols="3">
                <v-sheet class="pa-4 text-center" tile width="38%">
                    <div class="text-h3">Relatórios</div>
                </v-sheet>
            </v-col>
            <v-col cols="9">
                <v-sheet class="mx-auto">
                    <v-slide-group show-arrows class="bgColor">
                        <v-slide-item>
                            <v-card
                                elevation="4"
                                class="align wid ma-5"
                                color="#B8A9FF"
                                @click="relatorio = 1"
                            >
                                Relatório de Despesas por Categoria
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card
                                elevation="4"
                                class="align wid ma-5"
                                color="#9C87FF"
                                @click="relatorio = 2"
                            >
                                Relatório de Despesas X Receitas
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card
                                elevation="4"
                                class="align wid ma-5"
                                color="#7C63EF"
                                @click="relatorio = 3"
                            >
                                Relatório de Planejamento X Despesa X Receita
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="9">
                <v-expansion-panels class="mx-5" :disabled="relatorio != 1">
                    <v-expansion-panel>
                        <v-expansion-panel-header
                            class="hoverColor white--text text-center text-h5"
                        >
                            Filtros
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="d-flex" :disabled="relatorio != 1">
                                <!-- start date -->
                                <div style="width: 20rem;">
                                    <p class="text-body-2 ma-0">
                                        Data Inicial
                                    </p>
                                    <v-menu
                                        ref="menuStartDate"
                                        v-model="menuStartDate"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        :disabled="relatorio != 1"
                                        min-width="290px"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                required
                                                outlined
                                                dense
                                                readonly
                                                :disabled="relatorio != 1"
                                                :value="
                                                    formatTextDate(start_date)
                                                "
                                                v-bind="attrs"
                                                append-icon="mdi-calendar-blank-outline"
                                                v-on="on"
                                                persistent-hint
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="start_date"
                                            no-title
                                            locale="pt-br"
                                            scrollable
                                            :disabled="relatorio != 1"
                                            :max="due_date"
                                            @input="menuStartDate = false"
                                        />
                                    </v-menu>
                                </div>
                                <div class="my-auto pa-2">
                                    -
                                </div>
                                <!-- end date -->
                                <div
                                    style="width: 20rem;"
                                    :disabled="relatorio != 1"
                                >
                                    <p class="text-body-2 ma-0">
                                        Data Final
                                    </p>
                                    <v-menu
                                        ref="menuDueDate"
                                        v-model="menuDueDate"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        :disabled="relatorio != 1"
                                        min-width="290px"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                required
                                                outlined
                                                :disabled="relatorio != 1"
                                                dense
                                                readonly
                                                :value="
                                                    formatTextDate(due_date)
                                                "
                                                v-bind="attrs"
                                                append-icon="mdi-calendar-blank-outline"
                                                v-on="on"
                                                persistent-hint
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="due_date"
                                            :disabled="relatorio != 1"
                                            locale="pt-br"
                                            @input="menuDueDate = false"
                                            no-title
                                            scrollable
                                            :min="start_date"
                                        />
                                    </v-menu>
                                </div>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
            <v-col cols="3">
                <v-btn
                    rounded
                    color="rgba(112,0,73,0.5)"
                    width="100%"
                    height="100%"
                    max-height="64px"
                    class="text-h6"
                    :disabled="relatorio != 1"
                    @click="gerarRelatorio"
                    target="_blank"
                >
                    Gerar relatório
                </v-btn>
            </v-col>
        </v-row>
        <alert-message :attributes="alert" />
    </v-container>
</template>

<script>
import moment from "moment";
import RelatorioService from "../services/RelatorioService";
import download from "downloadjs";

export default {
    data() {
        return {
            alert: {
                open: false,
                color: "",
                title: "",
                text: ""
            },
            relatorio: null,
            menuStartDate: false,
            menuDueDate: false,
            start_date: null,
            due_date: null
        };
    },
    created() {
        this.start_date = moment().format("YYYY-MM-DD");
        this.due_date = moment().format("YYYY-MM-DD");
    },
    methods: {
        gerarRelatorio() {
            let startDate = moment(this.start_date).format("YYYYMMDD");
            let endDate = moment(this.due_date).format("YYYYMMDD");
            if (this.relatorio == 1) {
                RelatorioService.receitasXdespesas(startDate, endDate)
                    .then(response => {
                        const content = response.headers["content-type"];
                        download(
                            response.data,
                            "despesasXreceita.pdf",
                            content
                        );
                        this.alert = {
                            open: true,
                            color: "success",
                            title: "Sucesso",
                            text: "Relatório gerado com sucesso!"
                        };
                    })
                    .catch(e => {
                        this.alert = {
                            open: true,
                            color: "error",
                            title: "Erro ao gerar o relatório",
                            text: e.message
                        };
                    });
            }
        },
        formatTextDate(date) {
            return moment(date).format("DD/MM/YYYY");
        }
    }
};
</script>

<style scoped>
.align {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.wid {
    width: 20%;
    font-size: 1.3rem;
    text-align: center;
    min-height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
