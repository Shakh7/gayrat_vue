const BASE_URL = import.meta.env.VITE_APP_DJANGO_URL

async function apiService(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }

    try {
        const fetchOptions = {
            ...defaultOptions,
            ...options,
        }
        const url = `${BASE_URL}${endpoint}`

        // @ts-ignore
        let response = await fetch(url, fetchOptions)
        if (!response.ok) {
            return response.text().then(errorMsg => {
                throw new Error(errorMsg);
            });
        }
        return response.json()
    } catch (error) {
        throw error
    }
}

export {apiService}
