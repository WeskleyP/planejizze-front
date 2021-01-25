import { backendUrl } from "../plugins/axios";

class CategoriaReceitaService {
    save(data) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/categoriaReceita/save", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    update(data) {
        return new Promise((resolve, reject) => {
            backendUrl.put("/categoriaReceita/update", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/categoriaReceita/byId/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            backendUrl.delete(`/categoriaReceita/delete/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/categoriaReceita/findAll`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAllPaginated(page, size) {
        return new Promise((resolve, reject) => {
            backendUrl
                .get(`/categoriaReceita/paginated?page=${page}&size=${size}`)
                .then(
                    response => resolve(response.data),
                    err => reject(err.response)
                );
        });
    }
    existsById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/categoriaReceita/exists/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new CategoriaReceitaService();
