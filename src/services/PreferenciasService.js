import { backendUrl } from "../plugins/axios";

class PreferenciasService {
    changeUserData(userData) {
        return new Promise((resolve, reject) => {
            backendUrl.put("/preferences/changeUserData", userData).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    changePassword(passwordData) {
        return new Promise((resolve, reject) => {
            backendUrl.put("/preferences/changePassword", passwordData).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new PreferenciasService();
