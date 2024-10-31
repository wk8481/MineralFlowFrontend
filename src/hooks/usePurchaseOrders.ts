import {useQuery} from '@tanstack/react-query';
import {getPurchaseOrder, getPurchaseOrders} from '../services/backend';
import {PurchaseOrder} from "../model/PurchaseOrders.ts";

export function usePurchaseOrders() {
    const {isLoading, isError, data: purchaseOrders} = useQuery<PurchaseOrder[]>({
        queryKey: ['purchaseOrders'],
        queryFn: getPurchaseOrders,
    });

    console.log('isLoading:', isLoading);
    console.log('isError:', isError);
    console.log('purchaseOrders:', purchaseOrders);

    return {
        isLoading,
        isError,
        purchaseOrders: purchaseOrders || [],
    };
}

// Hook for fetching a specific purchase order by poNumber
export function usePurchaseOrder(poNumber: string) {
    const {isLoading, isError, data: purchaseOrder} = useQuery<PurchaseOrder>({
        queryKey: ['purchaseOrder', poNumber],
        queryFn: () => getPurchaseOrder(poNumber),
    });

    console.log('isLoading:', isLoading);
    console.log('isError:', isError);
    console.log('purchaseOrder:', purchaseOrder);

    return {
        isLoading,
        isError,
        purchaseOrder,
    };
}