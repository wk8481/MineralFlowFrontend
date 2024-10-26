// src/hooks/usePurchaseOrders.ts
import {useQuery} from '@tanstack/react-query';
import {getPurchaseOrders} from '../services/backend';

export function usePurchaseOrders() {
    const {isLoading, isError, data: purchaseOrders} = useQuery({
        queryKey: ['purchaseOrders'],
        queryFn: getPurchaseOrders,
    });

    console.log('isLoading:', isLoading);
    console.log('isError:', isError);
    console.log('purchaseOrders:', purchaseOrders);

    return {
        isLoading,
        isError,
        purchaseOrders,
    };
}