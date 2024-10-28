// src/components/AppointmentForm.tsx
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
        addAppointment(appointmentData);
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
                        required
                    />
                    <TextField
                        name="appointmentWindowEnd"
                        type="datetime-local"
                        value={appointmentData.appointmentWindowEnd}
                        onChange={handleChange}
                        label="Appointment End"
                        variant="outlined"
                        required
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