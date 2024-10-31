import {useNavigate} from 'react-router-dom';
import type {Warehouse} from '../model/Warehouses';
import './Warehouse.scss';

interface WarehouseProps {
    warehouse: Warehouse;
    isSelected: boolean;
}

export function Warehouse({warehouse, isSelected}: WarehouseProps) {
    const navigate = useNavigate();
    const fullness = (warehouse.currentCapacity / 400000) * 100;
    let backgroundColor = 'green';

    if (warehouse.currentCapacity > 440000) {
        // Trigger alert if above 440,000
        alert("Capacity exceeds maximum allowed limit of 440,000. Adjust to continue.");
        return null;
    } else if (fullness > 100) {
        backgroundColor = 'red'; // Overflow but under 440,000
    } else if (fullness === 100) {
        backgroundColor = 'pink'; // Exactly 100% full
    } else if (fullness > 80) {
        backgroundColor = '#b8860b'; // Nearing full
    }

    return (
        <div
            className={`warehouse ${isSelected ? 'selected' : ''}`}
            style={{backgroundColor}}
            onClick={() => navigate(`/warehouses/${warehouse.warehouseId}`)}
        >
            <div className="warehouse-number">Warehouse ID: {warehouse.warehouseId}</div>
            <div className="warehouse-details">
                <div className="material">Material Type: {warehouse.materialType}</div>
                <div className="capacity">Current Capacity: {warehouse.currentCapacity}</div>
                <div className="seller">Seller ID: {warehouse.sellerId}</div>
            </div>
        </div>
    );
}
