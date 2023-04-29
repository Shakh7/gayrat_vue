import ApiService from "@/core/services/ApiService";

export async function getClients() {
    try {
        let response = await ApiService.get('clients')
        return response.data
    } catch {
        return {
            error: true
        }
    }
}