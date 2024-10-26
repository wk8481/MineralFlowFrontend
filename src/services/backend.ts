import axios from 'axios';
import {TruckOnTime} from '../model/TruckOnTime';

const LANDSIDE_URL: string = import.meta.env.VITE_LANDSIDE_URL;

export async function getTrucksOnTime() {
    try {
        const {data: trucksOnTime} = await axios.get<TruckOnTime[]>(`${LANDSIDE_URL}/check-arrival`);
        console.log('Fetched trucks:', trucksOnTime);
        return trucksOnTime;
    } catch (error) {
        console.error('Error fetching trucks:', error);
        throw error;
    }
}

export async function getTrucksOnSite() {
    try {
        const {data: trucksOnSite} = await axios.get<string[]>(`${LANDSIDE_URL}/trucks-on-site`);
        console.log('Fetched trucks:', trucksOnSite);
        return trucksOnSite;
    } catch (error) {
        console.error('Error fetching trucks:', error);
        throw error;
    }
}

export async function getPurchaseOrders() {
    try {
        const {data: purchaseOrders} = await axios.get<string[]>(`${LANDSIDE_URL}/purchase-orders`);
        console.log('Fetched purchase orders:', purchaseOrders);
        return purchaseOrders;
    } catch (error) {
        console.error('Error fetching purchase orders:', error);
        throw error;
    }
}