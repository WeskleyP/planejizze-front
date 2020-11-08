import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";
import router from "../router/index";
import store from "../store/index";

const backendUrl = axios.create({
    baseURL: process.env.VUE_APP_PLANEJIZZE_API,
    headers: {
        "Content-type": "application/json",
        Accept: "application/json"
    }
});

function interceptorsResponseError(error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        if (
            originalRequest.url ===
            `${process.env.VUE_APP_PLANEJIZZE_API}/auth/login`
        ) {
            router.push({
                name: "Login"
            });
            return Promise.reject(error);
        }
        originalRequest._retry = true;
        AuthenticationService.refreshToken()
            .then(response => {
                store.commit("LOGIN", response);
                location.reload(true);
                return backendUrl(originalRequest);
            })
            .catch(err => {
                store.commit("LOGOUT");
                router.push({
                    name: "Login"
                });
                return Promise.reject(err);
            });
    }
    return Promise.reject(error);
}
backendUrl.interceptors.request.use(
    config => {
        const token = localStorage.token;
        if (token) config.headers.Authorization = token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

backendUrl.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return interceptorsResponseError(error);
    }
);

export { backendUrl };
