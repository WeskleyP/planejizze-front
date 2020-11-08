import { backendUrl } from "../plugins/axios";

class UsuarioService {
    usersCountByRole() {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/usuario/usersCountByRole`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new UsuarioService();
