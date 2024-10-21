import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import TruckTable from './components/TruckTable';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SecurityContextProvider from './context/SecurityContextProvider';
import {RouteGuard} from './components/RouteGuard';
import {useContext} from 'react';
import SecurityContext from './context/SecurityContext';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';

const queryClient = new QueryClient();
const theme = createTheme({
    palette: {
        mode: 'light', // or 'dark' for dark mode
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
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/trucks">Trucks</Link></li>
                            </ul>
                        </nav>
                        <Routes>
                            <Route path="/trucks" element={<RouteGuard><TruckTable/></RouteGuard>}/>
                            <Route path="/" element={<Navigate to="/trucks"/>}/>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </SecurityContextProvider>
        </QueryClientProvider>
    );
}

export default App;