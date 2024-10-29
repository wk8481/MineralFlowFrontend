import {useParams} from 'react-router-dom';
import {Alert, Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';
import {useTruckOnTime} from '../hooks/useTrucksOnTime';
import dayjs from 'dayjs';

function TruckDetails() {
    const {licensePlate} = useParams();
    const {isLoading, isError, truck} = useTruckOnTime(licensePlate!);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError || !truck) {
        return <Alert severity="error">Error loading truck details!</Alert>;
    }

    return (
        <Box my={4} display="flex" justifyContent="center">
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Truck Details
                    </Typography>
                    <Typography variant="h5" component="h2">
                        License Plate: {truck.licensePlate}
                    </Typography>
                    <Typography variant="body1">
                        Seller ID: {truck.sellerId}
                    </Typography>
                    <Typography variant="body1">
                        Material Type: {truck.materialType}
                    </Typography>
                    <Typography variant="body1">
                        Arrival Time: {dayjs(truck.arrivalTime).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                    <Typography variant="body1">
                        On Time: {truck.onTime ? 'Yes' : 'No'}
                    </Typography>
                    <Typography variant="body1">
                        Schedule Start: {dayjs(truck.windowStart).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                    <Typography variant="body1">
                        Schedule End: {dayjs(truck.windowEnd).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default TruckDetails;