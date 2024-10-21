import {useQuery} from '@tanstack/react-query';
import {getTrucksOnTime} from '../services/backebd.ts';

export function useTrucks() {
    const {isLoading, isError, data: trucks} = useQuery({
        queryKey: ['trucks'],
        queryFn: () => getTrucksOnTime(),
    });

    return {
        isLoading,
        isError,
        trucks,
    };
}