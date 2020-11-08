import { backendUrl } from "../plugins/axios";

class RoleService {
    findAll() {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/role/findAll`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new RoleService();
