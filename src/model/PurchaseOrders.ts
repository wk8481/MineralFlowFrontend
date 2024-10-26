// src/model/PurchaseOrder.ts
export interface OrderLine {
    materialType: string;
    amountInTons: number;
    pricePerTon: number;
}

export interface PurchaseOrder {
    date: string;
    poNumber: string;
    customerNumber: string;
    customerName: string;
    orderLines: OrderLine[];
    status: string;
}