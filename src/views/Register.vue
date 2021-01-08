<template>
    <v-app>
        <v-main>
            <v-container class="fill-height bg-login" fluid>
                <v-row align="center" justify="center">
                    <v-card color="rgba(49, 0, 85, 0.75)" class="pa-10">
                        <v-card-title class="flex-row justify-center">
                            <span
                                class="headline white--text text-h2"
                                style="font-family: Oswald; sans-serif; font-weight: 400;font-size: 48px;"
                                >Registrar-se</span
                            >
                        </v-card-title>
                        <v-col cols="12">
                            <v-card class="elevation-0 menuBg">
                                <v-card-text class="pb-0 pt-5">
                                    <v-form>
                                        <v-row class="pb-0 mb-0">
                                            <v-col cols="6" sm="12" md="6">
                                                <v-text-field
                                                    id="nome"
                                                    name="nome"
                                                    outlined
                                                    height="50"
                                                    dense
                                                    color="#A45800"
                                                    background-color="white"
                                                    v-model="credenciais.nome"
                                                    placeholder="Digite o seu nome"
                                                    type="text"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="6" sm="12" md="6">
                                                <v-text-field
                                                    id="sobrenome"
                                                    name="sobrenome"
                                                    outlined
                                                    height="50"
                                                    dense
                                                    color="#A45800"
                                                    background-color="white"
                                                    v-model="
                                                        credenciais.sobrenome
                                                    "
                                                    placeholder="Digite o seu sobrenome"
                                                    type="text"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-text-field
                                            id="username"
                                            name="username"
                                            outlined
                                            height="50"
                                            dense
                                            color="#A45800"
                                            background-color="white"
                                            v-model="credenciais.username"
                                            placeholder="Digite o seu username"
                                            type="text"
                                        ></v-text-field>
                                        <v-text-field
                                            id="email"
                                            name="email"
                                            outlined
                                            height="50"
                                            dense
                                            color="#A45800"
                                            background-color="white"
                                            v-model="credenciais.email"
                                            placeholder="Digite o seu email"
                                            type="text"
                                        ></v-text-field>
                                        <v-text-field
                                            id="password"
                                            name="password"
                                            v-model="credenciais.senha"
                                            outlined
                                            color="#A45800"
                                            background-color="white"
                                            height="50"
                                            dense
                                            placeholder="Digite a sua senha"
                                            type="password"
                                        ></v-text-field>
                                        <v-text-field
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            v-model="
                                                credenciais.senhaConfirmação
                                            "
                                            outlined
                                            color="#A45800"
                                            background-color="white"
                                            height="50"
                                            dense
                                            placeholder="Confirme sua senha"
                                            type="password"
                                        ></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions class="px-6">
                                    <v-btn
                                        class="white--text"
                                        color="hoverColor"
                                        block
                                        height="50"
                                        @click="login"
                                        >Registrar</v-btn
                                    >
                                </v-card-actions>
                                <v-card-actions
                                    class="px-6 overflow-auto text-center"
                                >
                                    <v-btn
                                        class="menuBg"
                                        height="20"
                                        outlined
                                        width="100%"
                                        @click="login"
                                    >
                                        <span class="bt-text">
                                            Já possui uma conta?
                                        </span></v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-card>
                </v-row>
            </v-container>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
export default {
    data() {
        return {
            credenciais: {
                username: "",
                nome: "",
                sobrenome: "",
                email: "",
                senha: "",
                senhaConfirmação: ""
            }
        };
    },
    methods: {
        register() {
            AuthenticationService.register(this.credenciais)
                .then(response => {
                    console.log(response);
                    // this.$store.commit("LOGIN", response);
                    // AuthenticationService.clarifyToken(response.token).then(
                    //     response => {
                    //         this.$store.commit("PERMS", response.body);
                    //         this.$router.push({ name: "DashBoard" });
                    //     }
                    // );
                })
                .catch(error => {
                    console.error(error);
                });
        },
        login() {
            this.$router.push({ name: "Login" });
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
.bt-text {
    font-size: 11px;
    color: #c3b4ff;
}
</style>
