import {useParams} from 'react-router-dom';
import {Alert, Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';
import {usePurchaseOrder} from '../hooks/usePurchaseOrders';

function PurchaseOrderDetails() {
    const {poNumber} = useParams<{ poNumber: string }>();
    const {isLoading, isError, purchaseOrder} = usePurchaseOrder(poNumber!);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError || !purchaseOrder) {
        return <Alert severity="error">Error loading purchase order!</Alert>;
    }

    return (
        <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
                Purchase Order Details
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        PO Number: {purchaseOrder.poNumber}
                    </Typography>
                    <Typography variant="body1">
                        Customer: {purchaseOrder.customerName} ({purchaseOrder.customerNumber})
                    </Typography>
                    <Typography variant="body1">
                        Date: {new Date(purchaseOrder.date).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                        Status: {purchaseOrder.status}
                    </Typography>
                    <Typography variant="body1">
                        Order Lines:
                    </Typography>
                    <ul>
                        {purchaseOrder.orderLines.map((line, index) => (
                            <li key={index}>
                                {line.materialType}: {line.amountInTons} tons @ ${line.pricePerTon}/ton
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </Box>
    );
}

export default PurchaseOrderDetails;