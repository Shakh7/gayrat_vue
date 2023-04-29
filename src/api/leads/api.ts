import ApiService from "@/core/services/ApiService";

export interface Lead {
    quote_id: number,
    client_id: number,
    price: number
}

export async function createLeads(leads: Lead[]) {
    ApiService.post('leads/create/', leads)
}