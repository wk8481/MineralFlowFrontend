import {useQuery} from '@tanstack/react-query';
import {getTrucksOnTime} from '../services/backend.ts';

export function useTrucksOnTime() {
    const {isLoading, isError, data: trucks} = useQuery({
        queryKey: ['trucks'],
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