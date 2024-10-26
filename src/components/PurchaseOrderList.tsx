import React from 'react';
import {usePurchaseOrders} from '../hooks/usePurchaseOrders';
import {Alert, Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';

const PurchaseOrderList: React.FC = () => {
    const {purchaseOrders, isLoading, isError} = usePurchaseOrders();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError) {
        return <Alert severity="error">Error loading purchase orders!</Alert>;
    }

    return (
        <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
                Purchase Orders
            </Typography>
            {purchaseOrders?.map((order) => (
                <Card
                    key={order.poNumber}
                    sx={{
                        marginBottom: 2,
                        backgroundColor: order.status === 'FULFILLED' ? 'lightgreen' : 'lightcoral'
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            PO Number: {order.poNumber}
                        </Typography>
                        <Typography variant="body1">
                            Customer: {order.customerName} ({order.customerNumber})
                        </Typography>
                        <Typography variant="body1">
                            Date: {new Date(order.date).toLocaleString()}
                        </Typography>
                        <Typography variant="body1">
                            Status: {order.status}
                        </Typography>
                        <Typography variant="body1">
                            Order Lines:
                        </Typography>
                        <ul>
                            {order.orderLines.map((line, index) => (
                                <li key={index}>
                                    {line.materialType}: {line.amountInTons} tons @ ${line.pricePerTon}/ton
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default PurchaseOrderList;