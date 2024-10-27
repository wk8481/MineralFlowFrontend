// src/components/PurchaseOrderList.tsx
import {Alert, Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import poImage from '../assets/img/po.png'; // Adjust the path as necessary
import {usePurchaseOrders} from '../hooks/usePurchaseOrders';

function PurchaseOrderList() {
    const {isLoading, isError, purchaseOrders} = usePurchaseOrders();

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
            {purchaseOrders.map((order) => (
                <Card
                    key={order.poNumber}
                    sx={{
                        marginBottom: 2,
                        backgroundColor: order.status === 'FULFILLED' ? '#006400' : 'lightcoral'
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
                        <Link to={`/purchase-orders/${order.poNumber}`}>
                            <img src={poImage} alt="Purchase Order" style={{height: 50, width: 50}}/>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default PurchaseOrderList;