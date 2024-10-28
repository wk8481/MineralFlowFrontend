// src/hooks/useWarehouses.ts
import {useQuery} from '@tanstack/react-query';
import {getWarehouse, getWarehouses} from '../services/backend';
import {Warehouse} from '../model/Warehouses';

export function useWarehouses() {
    const {isLoading, isError, data: warehouses} = useQuery<Warehouse[]>({
        queryKey: ['warehouses'],
        queryFn: getWarehouses,
    });

    return {
        isLoading,
        isError,
        warehouses: warehouses || [],
    };
}

export function useWarehouse(warehouseId: string | undefined) {
    const {isLoading, isError, data: warehouse} = useQuery<Warehouse>({
        queryKey: ['warehouse', warehouseId],
        queryFn: () => getWarehouse(warehouseId),
    });

    return {
        isLoading,
        isError,
        warehouse,
    };
}