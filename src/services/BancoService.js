import { backendUrl } from "../plugins/axios";

class BancoService {
    save(data) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/banco/save", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    update(data) {
        return new Promise((resolve, reject) => {
            backendUrl.put("/banco/update", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/banco/byId/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/banco/delete/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/banco/findAll`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAllPaginated(page, size) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/banco/paginated?page=${page}&size=${size}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    existsById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/banco/exists/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new BancoService();
