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
    save(data) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/usuario/save", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    update(data) {
        return new Promise((resolve, reject) => {
            backendUrl.put("/usuario/update", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/usuario/byId/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/usuario/delete/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/usuario/findAll`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAllPaginated(page, size) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/usuario/paginated?page=${page}&size=${size}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    existsById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/usuario/exists/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new UsuarioService();
