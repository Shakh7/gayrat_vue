import ApiService from "@/core/services/ApiService";

export interface Lead {
    quote_id: number,
    client_id: number,
    price: number
}

export async function createLeads(leads: Lead[]) {
    return await ApiService.post('leads/create/', leads)
}