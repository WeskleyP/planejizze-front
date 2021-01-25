<template>
    <v-app>
        <v-main>
            <v-container class="fill-height bg-login" fluid>
                <v-row align="center" justify="center">
                    <v-card color="rgba(49, 0, 85, 0.75)" class="pa-10">
                        <v-card-title
                            class="flex-row justify-center py-10 my-10"
                        >
                            <span
                                class="headline white--text text-h2"
                                style="font-family: Oswald; sans-serif; font-weight: 400;font-size: 48px;"
                                >Planejizze</span
                            >
                        </v-card-title>
                        <v-col cols="12">
                            <v-card class="elevation-0 menuBg">
                                <v-card-text class="pb-0 px-6 pt-5">
                                    <v-form>
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
                                    </v-form>
                                </v-card-text>
                                <v-card-actions class="px-6">
                                    <v-btn
                                        class="white--text"
                                        color="hoverColor"
                                        block
                                        height="50"
                                        @click="login"
                                        >Entrar</v-btn
                                    >
                                </v-card-actions>
                                <v-card-actions class="px-6 overflow-auto">
                                    <v-btn
                                        class="menuBg"
                                        height="20"
                                        outlined
                                        @click="register"
                                    >
                                        <span class="bt-text">
                                            Não tem conta? Crie a sua agora
                                        </span></v-btn
                                    >
                                    <v-spacer />
                                    <v-btn
                                        class="menuBg"
                                        height="20"
                                        outlined
                                        @click="forgetPassword"
                                        ><span class="bt-text">
                                            Esqueci minha senha
                                        </span></v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-card>
                </v-row>
            </v-container>
            <router-view />
            <alert-message :attributes="alert" />
        </v-main>
    </v-app>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
export default {
    data() {
        return {
            alert: {
                open: false,
                color: "",
                title: "",
                text: ""
            },
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
                    this.$store.commit("LOGIN", response);
                    AuthenticationService.clarifyToken(response.token).then(
                        response => {
                            this.$store.commit("PERMS", response.body);
                            this.$router.push({ name: "DashBoard" });
                        }
                    );
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                })
                .catch(e => {
                    this.alert = {
                        open: true,
                        color: "error",
                        title: "Erro ao efetuar login",
                        text: e.message
                    };
                });
        },
        forgetPassword() {
            this.$router.push({ name: "ForgetPassword" });
        },
        register() {
            this.$router.push({ name: "Register" });
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
