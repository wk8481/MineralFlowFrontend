import axios from 'axios';
import {TruckOnTime} from '../model/TruckOnTime';
import {PurchaseOrder} from "../model/PurchaseOrders.ts";

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

export async function getTrucksOnTime() {
    try {
        const {data: trucksOnTime} = await axios.get<TruckOnTime[]>(`${BACKEND_URL}/check-arrival`);
        console.log('Fetched trucks:', trucksOnTime);
        return trucksOnTime;
    } catch (error) {
        console.error('Error fetching trucks:', error);
        throw error;
    }
}

export async function getTruckOnTime(licensePlate: string): Promise<TruckOnTime> {
    try {
        const {data: truckOnTime} = await axios.get<TruckOnTime>(`${BACKEND_URL}/check-arrival/${licensePlate}`);
        console.log('Fetched truck:', truckOnTime);
        return truckOnTime;
    } catch (error) {
        console.error('Error fetching truck:', error);
        throw error;
    }
}

export async function getTrucksOnSite() {
    try {
        const {data: trucksOnSite} = await axios.get<string[]>(`${BACKEND_URL}/trucks-on-site`);
        console.log('Fetched trucks:', trucksOnSite);
        return trucksOnSite;
    } catch (error) {
        console.error('Error fetching trucks:', error);
        throw error;
    }
}

export async function getPurchaseOrders() {
    try {
        const {data: purchaseOrders} = await axios.get<PurchaseOrder[]>(`${BACKEND_URL}/purchase-orders`);
        console.log('Fetched purchase orders:', purchaseOrders);
        return purchaseOrders;
    } catch (error) {
        console.error('Error fetching purchase orders:', error);
        throw error;
    }
}

export async function getPurchaseOrder(poNumber: string): Promise<PurchaseOrder> {
    try {
        const {data: purchaseOrder} = await axios.get<PurchaseOrder>(`${BACKEND_URL}/purchase-orders/${poNumber}`);
        console.log('Fetched purchase order:', purchaseOrder);
        return purchaseOrder;
    } catch (error) {
        console.error('Error fetching purchase order:', error);
        throw error;
    }
}