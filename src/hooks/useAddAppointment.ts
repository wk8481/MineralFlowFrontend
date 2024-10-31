import {useMutation, useQueryClient} from '@tanstack/react-query';
import {makeAppointment} from '../services/backend';
import {Appointment} from '../model/Appointments.ts';

export function useAddAppointment() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (appointment: Appointment) => makeAppointment(appointment),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['appointments']});
        },
    });

    return {
        addAppointment: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
    };
}