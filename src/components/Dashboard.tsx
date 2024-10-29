import {Alert, Box, Card, CardContent, CircularProgress, Container, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {useDashboardData} from '../hooks/useDashboardData';
import './Dashboard.scss';

const Dashboard = () => {
    const {trucksOnTime, trucksOnSite, purchaseOrders, warehouses, isLoading, isError} = useDashboardData();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (isError) {
        return <Alert severity="error">Error loading dashboard data!</Alert>;
    }

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Card className="dashboard-card">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/trucks">Trucks On Time</Link>
                        </Typography>
                        <Typography variant="body1">
                            Total: {trucksOnTime.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="dashboard-card">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/trucks-on-site">Trucks On-Site</Link>
                        </Typography>
                        <Typography variant="body1">
                            Total: {trucksOnSite.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="dashboard-card">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/purchase-orders">Purchase Orders</Link>
                        </Typography>
                        <Typography variant="body1">
                            Total: {purchaseOrders.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="dashboard-card">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/warehouses">Warehouses</Link>
                        </Typography>
                        <Typography variant="body1">
                            Total: {warehouses.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="dashboard-card">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/appointment-form">Schedule Appointment</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Dashboard;