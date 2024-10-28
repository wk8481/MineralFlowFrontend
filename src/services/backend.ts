import axios from 'axios';
import {TruckOnTime} from '../model/TruckOnTime';
import {PurchaseOrder} from "../model/PurchaseOrders.ts";
import {Warehouse} from "../model/Warehouses.ts";
import {Appointment} from "../model/Appointments.ts";

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

export async function getWarehouses(): Promise<Warehouse[]> {
    try {
        const {data: warehouses} = await axios.get<Warehouse[]>(`${BACKEND_URL}/total-material`);
        console.log('Fetched warehouses:', warehouses);
        return warehouses;
    } catch (error) {
        console.error('Error fetching warehouses:', error);
        throw error;
    }
}


export async function getWarehouse(warehouseId: string | undefined): Promise<Warehouse> {
    try {
        const {data: warehouse} = await axios.get<Warehouse>(`${BACKEND_URL}/total-material/${warehouseId}`);
        console.log('Fetched warehouse:', warehouse);
        return warehouse;
    } catch (error) {
        console.error('Error fetching warehouse:', error);
        throw error;
    }
}


export async function makeAppointment(appointment: Appointment) {
    try {
        const response = await axios.post(`${BACKEND_URL}/make-appointment`, appointment);
        return response.data;
    } catch (error) {
        console.error('Error making appointment:', error);
        throw error;
    }
}