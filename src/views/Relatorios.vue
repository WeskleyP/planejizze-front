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
                            >
                                Relatório de Despesas por Categoria
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card
                                elevation="4"
                                class="align wid ma-5"
                                color="#9C87FF"
                            >
                                Relatório de Despesas X Receitas
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card
                                elevation="4"
                                class="align wid ma-5"
                                color="#7C63EF"
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
                <v-expansion-panels class="mx-5">
                    <v-expansion-panel>
                        <v-expansion-panel-header
                            class="hoverColor white--text text-center text-h5"
                        >
                            Filtros
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
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
                >
                    Gerar relatório
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {};
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
