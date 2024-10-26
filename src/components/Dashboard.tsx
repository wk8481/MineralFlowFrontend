import React from 'react';
import {Box, Card, CardContent, Container, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/trucks">Trucks</Link>
                        </Typography>
                        {/* Add more links to different parts of the app here */}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link to="/trucks-on-site">Trucks On-Site</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Dashboard;