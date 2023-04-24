// api.js

import {ErrorMessage} from "vee-validate";

const BASE_URL = import.meta.env.VITE_APP_DJANGO_URL

function apiService(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // include cookies in cross-origin requests
    }

    const fetchOptions = {
        ...defaultOptions,
        ...options,
    }

    const url = `${BASE_URL}${endpoint}`

    // @ts-ignore
    return fetch(url, fetchOptions)
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorMsg => {
                    throw new Error(errorMsg);
                });
            }
            return response.json()
        }).catch(error => {
            console.error('API request failed:', error)
            throw error
        })
}

export {apiService}
