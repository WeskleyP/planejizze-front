import { backendUrl } from "../plugins/axios";

class ReceitaService {
    save(data) {
        return new Promise((resolve, reject) => {
            backendUrl.post("/receita/save", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    update(data) {
        return new Promise((resolve, reject) => {
            backendUrl.put("/receita/update", data).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/receita/byId/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/receita/delete/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/receita/findAll`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findAllPaginated(page, size) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/receita/paginated?page=${page}&size=${size}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    existsById(id) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/receita/exists/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findReceitasLast30Days() {
        return new Promise((resolve, reject) => {
            backendUrl.get("/receita/last30Days").then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findReceitasNext30Days() {
        return new Promise((resolve, reject) => {
            backendUrl.get("/receita/next30Days").then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findNextReceita() {
        return new Promise((resolve, reject) => {
            backendUrl.get("/receita/next").then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    findReceitasLast6Months() {
        return new Promise((resolve, reject) => {
            backendUrl.get("/receita/last6Months").then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    porCategoriaEMês(mes) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/receita/byCategoria?mes=${mes}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    updateReceitaStatusBanco(id) {
        return new Promise((resolve, reject) => {
            backendUrl.put(`/receita/updateReceitaBanco/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    updateReceitaStatusMoeda(id) {
        return new Promise((resolve, reject) => {
            backendUrl.put(`/receita/updateReceitaMoeda/${id}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
    dashboard(days) {
        return new Promise((resolve, reject) => {
            backendUrl.get(`/receita/dashboard?days=${days}`).then(
                response => resolve(response.data),
                err => reject(err.response)
            );
        });
    }
}
export default new ReceitaService();
