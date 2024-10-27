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
import TruckTable from "./components/TruckTable.tsx";

const queryClient = new QueryClient();
const theme = createTheme({
    palette: {
        mode: 'dark', // or 'light' for light mode
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
                        <nav>
                            <ul>
                                <li><Link to="/">Dashboard</Link></li>
                                <li><Link to="/trucks">Trucks</Link></li>
                                <li><Link to="/trucks-on-site">Trucks On-Site</Link></li>
                                <li><Link to="/purchase-orders">Purchase Orders</Link></li>
                            </ul>
                        </nav>
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/trucks" element={<RouteGuard><TruckTable/></RouteGuard>}/>
                            <Route path="/trucks-on-site" element={<RouteGuard><TruckOnSiteCounter/></RouteGuard>}/>
                            <Route path="/purchase-orders" element={<RouteGuard><PurchaseOrderList/></RouteGuard>}/>
                            <Route path="/purchase-orders/:poNumber"
                                   element={<RouteGuard><PurchaseOrderDetails/></RouteGuard>}/>
                            <Route path="*" element={<Navigate to="/"/>}/>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </SecurityContextProvider>
        </QueryClientProvider>
    );
}

export default App;