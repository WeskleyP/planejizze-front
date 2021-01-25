import { backendUrl } from "../plugins/axios";

class DespesaService {
    save(data) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/despesa/save", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    update(data) {
        return new Promise((resolve, reject) => {
            backendUrl.put("/despesa/update", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/despesa/byId/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            backendUrl.delete(`/despesa/delete/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/despesa/findAll`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAllPaginated(page, size) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/despesa/paginated?page=${page}&size=${size}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    existsById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/despesa/exists/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findDespesasLast30Days() {
        return new Promise((resolve, reject) => {
            backendUrl.get("/despesa/last30Days").then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findDespesasNext30Days() {
        return new Promise((resolve, reject) => {
            backendUrl.get("/despesa/next30Days").then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findNextDespesa() {
        return new Promise((resolve, reject) => {
            backendUrl.get("/despesa/next").then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findDespesasLast6Months() {
        return new Promise((resolve, reject) => {
            backendUrl.get("/despesa/last6Months").then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    porCategoriaEMês(mes) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/despesa/byCategoria?mes=${mes}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    updateDespesaStatusCartao(id) {
        return new Promise((resolve, reject) => {
            backendUrl.put(`/despesa/updateDespesaCartao/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    updateDespesaStatusMoeda(id) {
        return new Promise((resolve, reject) => {
            backendUrl.put(`/despesa/updateDespesaMoeda/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    dashboard(days) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/despesa/dashboard?days=${days}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new DespesaService();
