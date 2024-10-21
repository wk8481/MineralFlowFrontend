import axios from 'axios'
import {TruckOnTime} from '../model/TruckOnTime';

const LANDSIDE_URL: string = import.meta.env.VITE_LANDSIDE_URL;

export async function getTrucksOnTime() {
    const {data: trucksOnTime} = await axios.get<TruckOnTime[]>(`${LANDSIDE_URL}/trucksOnTime`);
    return trucksOnTime;
}