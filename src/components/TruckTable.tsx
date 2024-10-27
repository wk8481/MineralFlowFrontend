import {
    Alert,
    Box,
    Card,
    CardMedia,
    CircularProgress,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import truckImage from '../assets/img/truck.png';
import {useTrucksOnTime} from '../hooks/useTrucksOnTime';

function TruckTable() {
    const {isLoading, isError, trucks} = useTrucksOnTime();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError || !Array.isArray(trucks)) {
        return <Alert severity="error">Error loading trucks!</Alert>;
    }

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Truck On-Time Data
                </Typography>
                <Card>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>License Plate</TableCell>
                                <TableCell>Seller ID</TableCell>
                                <TableCell>Material Type</TableCell>
                                <TableCell>Arrival Time</TableCell>
                                <TableCell>On Time</TableCell>
                                <TableCell>Truck Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trucks.map((truck) => (
                                <TableRow key={truck.licensePlate}>
                                    <TableCell>{truck.licensePlate}</TableCell>
                                    <TableCell>{truck.sellerId}</TableCell>
                                    <TableCell>{truck.materialType}</TableCell>
                                    <TableCell>{truck.arrivalTime}</TableCell>
                                    <TableCell>{truck.onTime ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <CardMedia
                                            component="img"
                                            image={truckImage}
                                            alt="Truck"
                                            sx={{
                                                height: 50,
                                                width: 100,
                                                backgroundColor: truck.onTime ? 'green' :
                                                    !truck.onTime ? 'red' : 'orange'
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </Box>
        </Container>
    );
}

export default TruckTable;