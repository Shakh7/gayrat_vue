import axios from 'axios';
import {array} from "yup";

// Defining the Car interface
interface CarModel {
    id: number;
    name: string;
    series: string | null;
}

interface Car {
    id: number;
    name: string;
    models: CarModel[] | [];
}

interface City {
    id: number;
    zip_code: number;
    city_name: string;
    state_code: string;
    state_name: string;
    geo_point: string;
}

// Define the async function
async function searchCarMakes(searchTerm: string): Promise<Car[]> {
    try {
        const response = await axios.get(`http://68.183.109.5:3000/api/cars/${searchTerm}/`);
        return response.data.results as Car[];
    } catch (error) {
        return [];
    }
}

async function searchLocations(searchTerm: string): Promise<City[]> {
    try {
        const response = await axios.get(`http://68.183.109.5:3000/api/cities/${searchTerm}/`);
        return response.data.results as City[];
    } catch (error) {
        return [];
    }
}

export {searchCarMakes, searchLocations}
