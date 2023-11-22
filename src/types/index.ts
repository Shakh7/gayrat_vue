type Location = {
    id: number,
    city_name: string,
    state_name: string,
    county_name: string,
    state_id: string,
    lat: number,
    lng: number,
    summary: string,
}

type TransportType = 'open' | 'enclosed'

type Vehicle = {
    id: number,
    make: string,
    model: string,
    year: number,
    category: string,
    is_operable: boolean,
    summary: string,
}

type Shipper = {
    email: string,
    summary: string,
}

type Quote = {
    id: number,
    departure: Location,
    destination: Location,
    transport_type: TransportType,
    vehicle: Vehicle,
    shipper: Shipper,
    created_at: string,
}

export type {
    Location,
    TransportType,
    Vehicle,
    Quote
};