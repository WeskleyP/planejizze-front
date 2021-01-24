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
                                @click="seePermissions(role)"
                            >
                                <v-card-title class="justify-center">
                                    <span
                                        class="headline black--text text-h4"
                                        >{{ role.nome }}</span
                                    >
                                </v-card-title>
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
                    <template v-slot:[`item.roles`]="{ item }">
                        <v-chip
                            v-for="(value, key) in item.roles"
                            :key="key"
                            :style="{
                                background: colors[key > 2 ? 0 : key]
                            }"
                        >
                            {{ value.nome }}
                        </v-chip>
                        <v-icon small class="mr-2" @click="editRoles(item)">
                            mdi-pencil
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
import UsuarioService from "../services/UsuarioService";
export default {
    data() {
        return {
            selected: [],
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
                { text: "E-mail", value: "email" }
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
    mounted() {
        this.findAllRoles();
        this.findAllUsers();
        this.userCountByRole();
    },
    beforeRouteUpdate(_to, _from, next) {
        this.findAllUsers();
        this.userCountByRole();
        next();
    },
    methods: {
        editRoles(item) {
            this.$router.push({
                name: "ChangeRoles",
                params: { item }
            });
        },
        findAllRoles() {
            RoleService.findAll()
                .then(res => {
                    this.roles = res;
                })
                .catch(e => console.error(e));
        },
        findAllUsers() {
            UsuarioService.findAll()
                .then(res => {
                    console.log("users", res);
                    this.users = res;
                })
                .catch(e => console.error(e));
        },
        seePermissions(role) {
            this.$router.push({
                name: "RoleList",
                params: { role }
            });
        },
        userCountByRole() {
            this.barChart = {
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
                    dataLabels: {
                        enabled: false
                    },
                    colors: []
                }
            };
            UsuarioService.usersCountByRole()
                .then(res => {
                    res.map((r, index) => {
                        let data = {
                            name: r.roleName,
                            data: [
                                {
                                    x: r.roleName,
                                    y: r.countPerRole
                                }
                            ]
                        };
                        this.barChart.series.push(data);
                        this.barChart.chartOptions.xaxis.categories.push(
                            r.roleName
                        );
                        this.barChart.chartOptions.colors.push(
                            this.colors[index > 2 ? 0 : index]
                        );
                    });
                    this.barChart.chartOptions.colors.splice(0, 1);
                    this.barChart.series.splice(0, 1);
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
