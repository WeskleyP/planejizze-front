<template>
    <v-row justify="center">
        <v-dialog persistent v-model="open" max-width="30%">
            <v-card class="hei">
                <v-card-title class="flex-row justify-space-between">
                    <span class="headline font-title-crud"
                        >Funções do usuário {{ item.nome }}</span
                    >
                    <v-spacer></v-spacer>
                    <div class="flex-row justify-space-between">
                        <v-icon @click="close()">
                            mdi-close
                        </v-icon>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-select
                        v-model="select"
                        :items="roles"
                        item-text="nome"
                        item-value="id"
                        attach
                        multiple
                        @input="changeUserRole"
                        chips
                    ></v-select>
                </v-card-text>
            </v-card>
        </v-dialog>
        <alert-message :attributes="alert" />
    </v-row>
</template>

<script>
import RoleService from "../../services/RoleService";

export default {
    props: ["item"],
    data() {
        return {
            alert: {
                open: false,
                color: "",
                title: "",
                text: ""
            },
            open: true,
            select: [],
            roles: []
        };
    },
    created() {
        this.findAllRoles();
        this.select = this.item.roles;
    },
    methods: {
        close() {
            this.$router.back();
            this.open = false;
        },
        findAllRoles() {
            RoleService.findAll()
                .then(res => {
                    this.roles = res;
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro ao buscar dados",
                        text: e.message
                    };
                });
        },
        changeUserRole() {
            RoleService.changeRolesByUser(this.item.id, this.select)
                .then(() => {
                    this.alert = {
                        open: true,
                        color: "success",
                        title: "Sucesso",
                        text: "Funções atualizadas com sucesso"
                    };
                    this.close();
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro ao atualizar dados",
                        text: e.message
                    };
                });
        }
    }
};
</script>
<style scoped>
.hei {
    height: 300px;
}
</style>
