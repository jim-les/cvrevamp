// Preloader.js
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Preloader = ({ visible, message = 'Processing your payment...' }) => {
    if (!visible) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </Box>
    );
};

export default Preloader;
