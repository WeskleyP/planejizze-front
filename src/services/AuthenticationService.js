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
        const refresh = "";
        return new Promise((resolve, reject) => {
            backendUrl.post("/auth/refreshToken", refresh).then(
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
}

export default new AuthenticationService();
