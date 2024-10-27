import {useEffect, useState} from 'react';
import {useTrucksOnSite} from '../hooks/useTrucksOnSite';
import {Alert, Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';

function TruckOnSiteCounter() {
    const {trucks, isLoading, isError} = useTrucksOnSite();
    const [totalTrucks, setTotalTrucks] = useState<number>(0);

    useEffect(() => {
        if (trucks) {
            console.log('Trucks array:', trucks);
            console.log('Trucks length:', trucks.length);
            setTotalTrucks(trucks.length);
        }
    }, [trucks]);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError) {
        return <Alert severity="error">Error loading trucks on-site!</Alert>;
    }

    return (
        <Box my={4} display="flex" justifyContent="center">
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Total Trucks On-Site
                    </Typography>
                    <Typography variant="h2" component="p">
                        {totalTrucks}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default TruckOnSiteCounter;