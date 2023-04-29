import ApiService from "@/core/services/ApiService";

export async function createQuotes(quotes) {
    ApiService.post('', quotes)
}