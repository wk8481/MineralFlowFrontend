import {useState} from 'react';
import {Alert, Box, CircularProgress, Typography} from '@mui/material';
import {useWarehouses} from '../hooks/useWarehouses';
import {Warehouse} from './Warehouse';
import './WarehouseList.scss';

const WarehouseList = () => {
    const {isLoading, isError, warehouses} = useWarehouses();
    const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError || !Array.isArray(warehouses)) {
        return <Alert severity="error">Error loading warehouses!</Alert>;
    }

    const sellers = Array.from(new Set(warehouses.map(warehouse => warehouse.sellerId)));
    const filteredWarehouses = selectedSeller
        ? warehouses.filter(warehouse => warehouse.sellerId === selectedSeller)
        : warehouses;

    return (
        <Box>
            <Typography variant="h4">Warehouse List</Typography>
            <select
                value={selectedSeller || ''}
                onChange={(e) => setSelectedSeller(e.target.value || null)}
            >
                <option value="">All Sellers</option>
                {sellers.map(seller => (
                    <option key={seller} value={seller}>{seller}</option>
                ))}
            </select>
            <Box className="warehouse-list-grid">
                {filteredWarehouses.map(warehouse => (
                    <Warehouse
                        key={warehouse.warehouseId}
                        warehouse={warehouse}
                        isSelected={selectedSeller === warehouse.sellerId}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default WarehouseList;