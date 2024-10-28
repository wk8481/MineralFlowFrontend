// src/components/WarehouseDetails.tsx
import {useParams} from 'react-router-dom';
import {Alert, Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';
import {useWarehouse} from '../hooks/useWarehouses';

const WarehouseDetails = () => {
    const {warehouseId} = useParams<{ warehouseId: string }>();
    const {isLoading, isError, warehouse} = useWarehouse(warehouseId);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError || !warehouse) {
        return <Alert severity="error">Error loading warehouse details!</Alert>;
    }

    return (
        <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
                Warehouse Details
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Warehouse ID: {warehouse.warehouseId}
                    </Typography>
                    <Typography variant="body1">
                        Material Type: {warehouse.materialType}
                    </Typography>
                    <Typography variant="body1">
                        Current Capacity: {warehouse.currentCapacity}
                    </Typography>
                    <Typography variant="body1">
                        Seller ID: {warehouse.sellerId}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default WarehouseDetails;