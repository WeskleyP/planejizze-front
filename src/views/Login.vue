<template>
    <v-app>
        <v-main>
            <v-container class="fill-height bg-login" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4" lg="3">
                        <v-card class="elevation-0">
                            <v-card-text class="pb-0 px-6">
                                <v-form>
                                    <v-text-field
                                        id="email"
                                        name="email"
                                        outlined
                                        height="50"
                                        dense
                                        v-model="credenciais.email"
                                        placeholder="Digite o seu email"
                                        type="text"
                                    ></v-text-field>
                                    <v-text-field
                                        id="password"
                                        name="password"
                                        v-model="credenciais.senha"
                                        outlined
                                        height="50"
                                        dense
                                        placeholder="Digite a sua senha"
                                        type="password"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions class="pa-6">
                                <v-btn
                                    class="white--text"
                                    color="hoverColor"
                                    block
                                    height="50"
                                    @click="login"
                                    >Entrar</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-row justify="center">
                            <v-col cols="auto">
                                <span>Esqueci minha senha</span>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
export default {
    data() {
        return {
            credenciais: {
                email: "",
                senha: ""
            }
        };
    },
    methods: {
        login() {
            AuthenticationService.login(this.credenciais)
                .then(response => {
                    console.log(response);
                    this.$store.commit("LOGIN", response);
                    AuthenticationService.clarifyToken(response.token).then(
                        response => {
                            console.log(response);
                            this.$store.commit("PERMS", response.body);
                            this.$router.push({ name: "DashBoard" });
                        }
                    );
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>

<style>
.bg-login {
    background: linear-gradient(
            180deg,
            #5e1b8e 6.77%,
            rgba(255, 255, 255, 0) 100%
        ),
        linear-gradient(180deg, #4a0e75 49.48%, rgba(255, 255, 255, 0) 100%),
        linear-gradient(0deg, #700049, #700049);
}
</style>
