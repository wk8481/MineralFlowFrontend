import {
    Alert,
    Box,
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
import {Link} from 'react-router-dom';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import truckImage from '../assets/img/truck.png';
import {useTrucksOnTime} from '../hooks/useTrucksOnTime';

function TruckTable() {
    const {isLoading, isError, trucks} = useTrucksOnTime();
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError || !Array.isArray(trucks)) {
        return <Alert severity="error">Error loading trucks!</Alert>;
    }

    // Filter trucks by both date and time (down to the minute)
    const filteredTrucks = trucks.filter(truck =>
        dayjs(truck.windowStart).isSame(selectedDate, 'minute')
    );

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Truck On-Time Data
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Select Date and Time"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                    />
                </LocalizationProvider>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>License Plate</TableCell>
                            <TableCell>Seller ID</TableCell>
                            <TableCell>Material Type</TableCell>
                            <TableCell>Arrival Time</TableCell>
                            <TableCell>On Time</TableCell>
                            <TableCell>Schedule Start</TableCell>
                            <TableCell>Schedule End</TableCell>
                            <TableCell>Truck Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTrucks.map((truck) => (
                            <TableRow
                                key={truck.licensePlate}
                                component={Link}
                                to={`/trucks/${truck.licensePlate}`}
                                style={{textDecoration: 'none', backgroundColor: truck.onTime ? 'inherit' : '#ff9999'}}
                            >
                                <TableCell>{truck.licensePlate}</TableCell>
                                <TableCell>{truck.sellerId}</TableCell>
                                <TableCell>{truck.materialType}</TableCell>
                                <TableCell>{dayjs(truck.arrivalTime).format('YYYY-MM-DD HH:mm')}</TableCell>
                                <TableCell>{truck.onTime ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{dayjs(truck.windowStart).format('YYYY-MM-DD HH:mm')}</TableCell>
                                <TableCell>{dayjs(truck.windowEnd).format('YYYY-MM-DD HH:mm')}</TableCell>
                                <TableCell>
                                    <CardMedia
                                        component="img"
                                        image={truckImage}
                                        alt="Truck"
                                        sx={{height: 50, width: 100}}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
}

export default TruckTable;
