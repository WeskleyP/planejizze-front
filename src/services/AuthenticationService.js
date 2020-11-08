import { backendUrl } from "../plugins/axios";

class AuthenticationService {
    login(loginData) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/auth/login", loginData).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    refreshToken() {
        const refreshToken = localStorage.getItem("refreshToken");
        return new Promise((resolve, reject) => {
            backendUrl.post("/auth/refreshToken", { refreshToken }).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    clarifyToken(token) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/auth/readToken", { token }).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    register(registerData) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/auth/register", registerData).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}

export default new AuthenticationService();
