<template>
    <v-dialog v-model="open" max-width="400px" @click:outside="closeDialog">
        <v-card>
            <v-card-text
                class="pb-0 px-6 pt-5"
                style="background-color: rgba(49, 0, 85, 0.75);"
            >
                <v-form>
                    <v-text-field
                        id="email"
                        name="email"
                        outlined
                        rounded
                        height="50"
                        dense
                        color="#A45800"
                        background-color="white"
                        v-model="email"
                        placeholder="Digite o seu email"
                        type="email"
                    ></v-text-field>
                </v-form>
                <v-card-actions class="pb-6">
                    <v-btn
                        class="white--text"
                        color="hoverColor"
                        block
                        :disabled="loading"
                        height="50"
                        @click="forgetPassword"
                        >Recuperar sua senha</v-btn
                    >
                </v-card-actions>
            </v-card-text>
        </v-card>
        <v-alert type="success" v-if="successMessage && loading">
            {{ successMessage }}
        </v-alert>
    </v-dialog>
</template>

<script>
import AuthenticationService from "../../services/AuthenticationService";

export default {
    data() {
        return {
            open: true,
            email: "",
            loading: false,
            successMessage: ""
        };
    },
    methods: {
        forgetPassword() {
            this.loading = true;
            AuthenticationService.forgetPassword(this.email)
                .then(() => {
                    this.successMessage =
                        "Foi enviado um email para recuperação de senha";
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    setTimeout(() => {}, 2000);
                    this.loading = false;
                    this.closeDialog;
                });
        },
        closeDialog() {
            this.open = false;
            this.$router.back();
        }
    }
};
</script>

<style></style>
