import {useQuery} from "@tanstack/react-query";
import {getTrucksOnSite} from "../services/backend.ts";

export function useTrucksOnSite() {
    const {isLoading, isError, data: trucks} = useQuery({
        queryKey: ['trucks'],
        queryFn: () => getTrucksOnSite(),
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