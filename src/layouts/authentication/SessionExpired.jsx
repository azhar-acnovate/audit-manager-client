import React, { useContext } from 'react';
import { Card, CardContent, Typography, Button, Box, Backdrop } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AuthContext } from '../../context/AuthContext';
import { Login } from '@mui/icons-material';

const SessionExpired = () => {
    const { logout } = useContext(AuthContext);
    const onLogout = (e) => {
        e.preventDefault();
        logout();

    }

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >

            <Card sx={{ minWidth: 300, padding: '20px', textAlign: 'center' }}>
                <CardContent>
                    {/* Icon */}
                    <Box mb={2}>
                        <RefreshIcon fontSize="large" style={{ color: '#4a90e2' }} />
                    </Box>

                    {/* Title */}
                    <Typography variant="h5" gutterBottom>
                        Your session has expired
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" color="textSecondary" mb={2}>
                        Please refresh the page. Don’t worry, we kept all of your filters and breakdowns in place.
                    </Typography>

                    {/* Refresh button */}
                    <Button
                        variant="contained"
                        color="primary"
                        style={{color:"white"}}
                        onClick={onLogout}
                        startIcon={<Login />}
                    >
                        Login
                    </Button>
                </CardContent>
            </Card>

        </Backdrop>
    );
};

export default SessionExpired;