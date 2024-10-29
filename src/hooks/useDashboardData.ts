import {useEffect, useState} from 'react';
import {useTrucksOnTime} from './useTrucksOnTime';
import {useTrucksOnSite} from './useTrucksOnSite';
import {usePurchaseOrders} from './usePurchaseOrders';
import {useWarehouses} from './useWarehouses';
import {TruckOnTime} from '../model/TruckOnTime';
import {TruckOnSite} from '../model/TruckOnSite';
import {PurchaseOrder} from '../model/PurchaseOrders';
import {Warehouse} from '../model/Warehouses';

export function useDashboardData() {
    const [trucksOnTime, setTrucksOnTime] = useState<TruckOnTime[]>([]);
    const [trucksOnSite, setTrucksOnSite] = useState<TruckOnSite[]>([]);
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const trucksOnTimeData = useTrucksOnTime().trucks;
    const trucksOnSiteData = useTrucksOnSite().trucks;
    const purchaseOrdersData = usePurchaseOrders().purchaseOrders;
    const warehousesData = useWarehouses().warehouses;

    useEffect(() => {
        const fetchData = () => {
            try {
                setIsLoading(true);
                setTrucksOnTime(trucksOnTimeData || []);
                setTrucksOnSite(trucksOnSiteData || []);
                setPurchaseOrders(purchaseOrdersData || []);
                setWarehouses(warehousesData || []);
                setIsLoading(false);
            } catch {
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchData(); // Initial fetch

        const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [trucksOnTimeData, trucksOnSiteData, purchaseOrdersData, warehousesData]);

    return {trucksOnTime, trucksOnSite, purchaseOrders, warehouses, isLoading, isError};
}