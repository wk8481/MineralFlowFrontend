import {useQuery} from '@tanstack/react-query';
import {getTruckOnTime, getTrucksOnTime} from '../services/backend.ts';

export function useTrucksOnTime() {
    const {isLoading, isError, data: trucks} = useQuery({
        queryKey: ['trucksOnTime'],
        queryFn: () => getTrucksOnTime(),
    });

    console.log('isLoading:', isLoading);
    console.log('isError:', isError);
    console.log('trucks:', trucks);

    return {
        isLoading,
        isError,
        trucks,
    };
}

export function useTruckOnTime(licensePlate: string) {
    const {isLoading, isError, data: truck} = useQuery({
        queryKey: ['truck', licensePlate],
        queryFn: () => getTruckOnTime(licensePlate),
    });

    console.log('isLoading:', isLoading);
    console.log('isError:', isError);
    console.log('truck:', truck);

    return {
        isLoading,
        isError,
        truck,
    };
}