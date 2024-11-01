import {useState} from 'react';
import {Button, Paper, Stack, TextField} from '@mui/material';
import {useAddAppointment} from '../hooks/useAddAppointment.ts';
import {Appointment} from '../model/Appointments';
import './AppointmentForm.scss';

export function AppointmentForm() {
    const [appointmentData, setAppointmentData] = useState<Appointment>({
        sellerId: '',
        licensePlate: '',
        materialType: '',
        appointmentWindowStart: '',
        appointmentWindowEnd: ''
    });

    const {addAppointment, isPending, isError} = useAddAppointment();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setAppointmentData({...appointmentData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Default to current time and one hour later if start/end times are not set
        const now = new Date();
        const defaultStart = now.toISOString().slice(0, 16); // Current time
        const defaultEnd = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16); // One hour later

        const appointmentWindowStart = appointmentData.appointmentWindowStart || defaultStart;
        const appointmentWindowEnd = appointmentData.appointmentWindowEnd || defaultEnd;

        addAppointment({...appointmentData, appointmentWindowStart, appointmentWindowEnd});
    };

    return (
        <Paper variant="outlined" sx={{p: 3, width: '25rem'}}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        name="sellerId"
                        value={appointmentData.sellerId}
                        onChange={handleChange}
                        label="Seller ID"
                        variant="outlined"
                        required
                    />
                    <TextField
                        name="licensePlate"
                        value={appointmentData.licensePlate}
                        onChange={handleChange}
                        label="License Plate"
                        variant="outlined"
                        required
                    />
                    <TextField
                        name="materialType"
                        value={appointmentData.materialType}
                        onChange={handleChange}
                        label="Material Type"
                        variant="outlined"
                        required
                    />
                    <TextField
                        name="appointmentWindowStart"
                        type="datetime-local"
                        value={appointmentData.appointmentWindowStart}
                        onChange={handleChange}
                        label="Appointment Start"
                        variant="outlined"
                    />
                    <TextField
                        name="appointmentWindowEnd"
                        type="datetime-local"
                        value={appointmentData.appointmentWindowEnd}
                        onChange={handleChange}
                        label="Appointment End"
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" type="submit" disabled={isPending}>
                        {isPending ? 'Scheduling...' : 'Schedule Appointment'}
                    </Button>
                    {isError && <div>Error scheduling appointment. Please try again.</div>}
                </Stack>
            </form>
        </Paper>
    );
}
