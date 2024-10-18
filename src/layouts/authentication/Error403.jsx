import React from 'react';
import { Card, CardContent, Typography, Box, Backdrop } from '@mui/material';

import { WarningAmber } from '@mui/icons-material';

const Error403 = () => {

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >

            <Card sx={{ minWidth: 300, padding: '20px', textAlign: 'center' }}>
                <CardContent>
                    {/* Icon */}
                    <Box mb={2}>
                        <WarningAmber fontSize="large" style={{ color: '#4a90e2' }} />
                    </Box>

                    <Typography variant="h4" gutterBottom>
                      Access denied
                    </Typography>
                    
                    <Typography variant="h5" gutterBottom>
                       403 Error
                    </Typography>

                    

                    {/* Description */}
                    <Typography variant="body2" color="textSecondary" mb={2}>
                        Looks like you don’t have access to this page
                    </Typography>
                </CardContent>
            </Card>

        </Backdrop>
    );
};

export default Error403;