// src/components/Warehouse.tsx
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

    if (fullness > 110) {
        backgroundColor = 'red';
    } else if (fullness > 100) {
        backgroundColor = 'orange';
    } else if (fullness > 80) {
        backgroundColor = '#b8860b'; // Darker yellow
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