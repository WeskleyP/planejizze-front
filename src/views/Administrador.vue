<template>
    <v-container fluid>
        <v-row>
            <v-col cols="3">
                <v-sheet class="pa-4 text-center" tile width="38%">
                    <div class="text-h3">Funções</div>
                </v-sheet>
            </v-col>
            <v-col cols="9">
                <v-sheet class="mx-auto">
                    <v-slide-group show-arrows class="bgColor">
                        <v-slide-item v-for="(role, i) in roles" :key="role.id">
                            <v-card
                                elevation="4"
                                class="align wid ma-5"
                                width="330px"
                                :color="colors[i]"
                            >
                                {{ role.nome }}
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row class="my-4">
            <v-col cols="8">
                <v-sheet
                    class="px-4 pt-4 pb-3 text-center my-5"
                    tile
                    width="100%"
                >
                    <div class="text-h2">Lista de usuários</div>
                </v-sheet>
                <v-data-table
                    :headers="headers"
                    :items="users"
                    :items-per-page="5"
                    class="elevation-1 fw"
                    no-data-text="Não foi encontrado nenhum dado!"
                    no-results-text="Não foi encontrado nenhum dado!"
                >
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Pesquisar"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-toolbar>
                    </template>
                    <!-- TODO mudar isso aqui-->
                    <template v-slot:[`item.repetir`]="{ item }">
                        <div
                            :class="item.repetir ? 'purple--text' : 'red--text'"
                        >
                            {{ item.repetir ? "Sim" : "Não" }}
                        </div>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-col>
            <v-col cols="4" sm="12" md="5" lg="4" align-self="center">
                <v-card elevation="4" class="bgColor" width="95%">
                    <v-sheet
                        class="px-4 pt-4 pb-3 text-center bgColor"
                        tile
                        width="100%"
                    >
                        <div class="text-h6">
                            Quantidade de usuários por função
                        </div>
                    </v-sheet>
                    <apexchart
                        width="100%"
                        type="bar"
                        ref="fChart"
                        :options="barChart.chartOptions"
                        :series="barChart.series"
                    ></apexchart>
                </v-card>
            </v-col>
        </v-row>
        <router-view />
    </v-container>
</template>

<script>
import RoleService from "../services/RoleService";
export default {
    data() {
        return {
            search: "",
            colors: ["#0ACF83", "#8000FF", "#FF0742"],
            headers: [
                {
                    text: "Nome",
                    align: "start",
                    sortable: false,
                    value: "nome"
                },
                { text: "Username", value: "username" },
                { text: "Data de ingresso", value: "createdOn" },
                {
                    text: "Funções",
                    value: "roles"
                },
                { text: "E-mail", value: "email" },
                { text: "Opções", value: "actions" }
            ],
            barChart: {
                series: [
                    {
                        data: []
                    }
                ],
                chartOptions: {
                    xaxis: {
                        categories: []
                    },
                    chart: {
                        toolbar: {
                            show: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: []
                }
            },
            users: [],
            roles: []
        };
    },
    created() {
        this.findAllRoles();
    },
    methods: {
        findAllRoles() {
            RoleService.findAll()
                .then(res => {
                    this.roles = res;
                })
                .catch(e => console.error(e));
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
