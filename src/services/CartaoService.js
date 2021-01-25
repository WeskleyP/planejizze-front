import { backendUrl } from "../plugins/axios";

class CartaoService {
    save(data) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/cartao/save", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    update(data) {
        return new Promise((resolve, reject) => {
            backendUrl.put("/cartao/update", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/cartao/byId/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            backendUrl.delete(`/cartao/delete/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/cartao/findAll`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAllPaginated(page, size) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/cartao/paginated?page=${page}&size=${size}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    existsById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/cartao/exists/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new CartaoService();
