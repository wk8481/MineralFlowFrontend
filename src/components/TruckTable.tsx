import React from 'react';
import {
    Alert,
    Box,
    Card,
    CircularProgress,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {useTrucks} from '../hooks/useTrucks';

const TruckTable: React.FC = () => {
    const {trucks, isLoading, isError} = useTrucks();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError || !trucks) {
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </Box>
        </Container>
    );
};

export default TruckTable;