import { backendUrl } from "../plugins/axios";

class RelatorioService {
    receitasXdespesas(startDate, endDate) {
        return new Promise((resolve, reject) => {
            backendUrl
                .get(
                    `/relatorios/despesasXreceita?startDate=${startDate}&endDate=${endDate}`,
                    {
                        responseType: "blob"
                    }
                )
                .then(
                    response => resolve(response),
                    err => reject(err.response)
                );
        });
    }
}
export default new RelatorioService();
