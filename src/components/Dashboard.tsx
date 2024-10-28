// src/components/Dashboard.tsx
import {Box, Card, CardContent, Container, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Card className="dashboard-card">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/trucks">Trucks</Link>
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="dashboard-card">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/trucks-on-site">Trucks On-Site</Link>
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="dashboard-card">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/purchase-orders">Purchase Orders</Link>
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="dashboard-card">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/warehouses">Warehouses</Link>
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="dashboard-card"> {/* Add new card */}
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