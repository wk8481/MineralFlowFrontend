import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Alert, Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';
import {getTruckOnTime} from '../services/backend';
import {TruckOnTime} from '../model/TruckOnTime';
import dayjs from 'dayjs';

function TruckDetails() {
    const {licensePlate} = useParams();
    const [truck, setTruck] = useState<TruckOnTime | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getTruckOnTime(licensePlate!)
            .then(data => {
                setTruck(data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsError(true);
                setIsLoading(false);
            });
    }, [licensePlate]);

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