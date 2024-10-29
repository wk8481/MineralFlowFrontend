import {useState} from 'react';
import {Alert, Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import poImage from '../assets/img/po.png';
import {usePurchaseOrders} from '../hooks/usePurchaseOrders';
import './PurchaseOrderList.scss';

function PurchaseOrderList() {
    const {isLoading, isError, purchaseOrders} = usePurchaseOrders();
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError) {
        return <Alert severity="error">Error loading purchase orders!</Alert>;
    }

    const filteredOrders = purchaseOrders.filter(order => {
        if (selectedStatus === 'all') return true;
        if (selectedStatus === 'fulfilled') return order.status === 'FULFILLED';
        if (selectedStatus === 'outstanding') return order.status !== 'FULFILLED';
        return true;
    });

    const ordersBySeller = filteredOrders.reduce((acc, order) => {
        const sellerKey = `${order.customerName} (${order.customerNumber})`;
        if (!acc[sellerKey]) {
            acc[sellerKey] = [];
        }
        acc[sellerKey].push(order);
        return acc;
    }, {} as Record<string, typeof purchaseOrders>);

    return (
        <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
                Purchase Orders
            </Typography>
            <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
            >
                <option value="all">All</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="outstanding">Outstanding</option>
            </select>
            {Object.keys(ordersBySeller).map(seller => (
                <Box key={seller} my={2}>
                    <Typography variant="h5">{seller}</Typography>
                    {ordersBySeller[seller].map(order => (
                        <Card
                            key={order.poNumber}
                            className="order-card"
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
            ))}
        </Box>
    );
}

export default PurchaseOrderList;