// src/App.tsx
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TruckOnSiteCounter from './components/TruckOnSiteCounter';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SecurityContextProvider from './context/SecurityContextProvider';
import {RouteGuard} from './components/RouteGuard';
import {useContext} from 'react';
import SecurityContext from './context/SecurityContext';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import PurchaseOrderList from './components/PurchaseOrderList';
import PurchaseOrderDetails from './components/PurchaseOrderDetails';
import TruckTable from "./components/TruckTable";
import TruckDetails from "./components/TruckDetails";
import WarehouseList from './components/WarehouseList';
import WarehouseDetails from './components/WarehouseDetails';
import {AppointmentForm} from './components/AppointmentForm'; // Import the component

const queryClient = new QueryClient();
const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        primary: {
            main: '#bb86fc',
        },
        secondary: {
            main: '#03dac6',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(135deg, #1d1d1d 30%, #121212 90%)',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            },
        },
    },
});

function Header() {
    const {logout, loggedInUser} = useContext(SecurityContext);
    return (
        <div>
            <div>Hello {loggedInUser}</div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <BrowserRouter>
                        <Header/>
                        <nav style={{display: 'flex', justifyContent: 'center'}}>
                            <ul style={{display: 'flex', listStyle: 'none', padding: 0}}>
                                <li style={{marginRight: '1rem'}}><Link to="/">Dashboard</Link></li>
                                <li style={{marginRight: '1rem'}}><Link to="/trucks">Trucks</Link></li>
                                <li style={{marginRight: '1rem'}}><Link to="/trucks-on-site">Trucks On-Site</Link></li>
                                <li style={{marginRight: '1rem'}}><Link to="/purchase-orders">Purchase Orders</Link>
                                </li>
                                <li style={{marginRight: '1rem'}}><Link to="/warehouses">Warehouses</Link></li>
                                <li style={{marginRight: '1rem'}}><Link to="/appointment-form">Schedule
                                    Appointment</Link></li>
                                {/* Add link */}
                            </ul>
                        </nav>
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/trucks" element={<RouteGuard><TruckTable/></RouteGuard>}/>
                            <Route path="/trucks-on-site" element={<RouteGuard><TruckOnSiteCounter/></RouteGuard>}/>
                            <Route path="/purchase-orders" element={<RouteGuard><PurchaseOrderList/></RouteGuard>}/>
                            <Route path="/purchase-orders/:poNumber"
                                   element={<RouteGuard><PurchaseOrderDetails/></RouteGuard>}/>
                            <Route path="/trucks/:licensePlate" element={<RouteGuard><TruckDetails/></RouteGuard>}/>
                            <Route path="/warehouses" element={<RouteGuard><WarehouseList/></RouteGuard>}/>
                            <Route path="/warehouses/:warehouseId"
                                   element={<RouteGuard><WarehouseDetails/></RouteGuard>}/>
                            <Route path="/appointment-form"
                                   element={<RouteGuard><AppointmentForm/></RouteGuard>}/> {/* Add route */}
                            <Route path="*" element={<Navigate to="/"/>}/>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </SecurityContextProvider>
        </QueryClientProvider>
    );
}

export default App;