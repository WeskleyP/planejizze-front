import { backendUrl } from "../plugins/axios";

class PlanejamentoService {
    save(data) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/planejamento/save", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    update(data) {
        return new Promise((resolve, reject) => {
            backendUrl.put("/planejamento/update", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/planejamento/byId/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            backendUrl.delete(`/planejamento/delete/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/planejamento/findAll`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAllPaginated(page, size) {
        return new Promise((resolve, reject) => {
            backendUrl
                .get(`/planejamento/paginated?page=${page}&size=${size}`)
                .then(
                    response => resolve(response.data),
                    err => reject(err.response)
                );
        });
    }
    existsById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/planejamento/exists/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAllDropdown() {
        return new Promise((resolve, reject) => {
            backendUrl.get("/planejamento/findAllDropdown").then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findPlanejamentoPrevistoDespesaReal(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/planejamento/previstoReal/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findLastPlanejamento() {
        return new Promise((resolve, reject) => {
            backendUrl.get("/planejamento/lastPlanejamento").then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new PlanejamentoService();
