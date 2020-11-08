import { backendUrl } from "../plugins/axios";

class CategoriaDespesaService {
    save(data) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/categoriaDespesa/save", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    update(data) {
        return new Promise((resolve, reject) => {
            backendUrl.put("/categoriaDespesa/update", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/categoriaDespesa/byId/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/categoriaDespesa/delete/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/categoriaDespesa/findAll`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAllPaginated(page, size) {
        return new Promise((resolve, reject) => {
            backendUrl
                .get(`/categoriaDespesa/paginated?page=${page}&size=${size}`)
                .then(
                    response => resolve(response.data),
                    err => reject(err.response)
                );
        });
    }
    existsById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/categoriaDespesa/exists/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new CategoriaDespesaService();
