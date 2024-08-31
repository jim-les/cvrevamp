import React, { useState, useEffect } from 'react';
import { CircularProgress, Backdrop, Typography, Box } from '@mui/material';

const PreloadedActivityIndicator = ({ visible, size = 40, color = 'primary' }) => {
    const [message, setMessage] = useState('Wait a minute...');

    useEffect(() => {
        if (visible) {
            const messages = [
                'Wait a minute...',
                'Almost there...',
                'Loading your content...'
            ];

            let index = 0;

            const interval = setInterval(() => {
                index = (index + 1) % messages.length;
                setMessage(messages[index]);
            }, 5000); // Change message every 2 seconds

            return () => clearInterval(interval); // Cleanup the interval on component unmount
        }
    }, [visible]);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: 'flex', flexDirection: 'column' }}
            open={visible}
        >
            <CircularProgress size={size} color={color} />
            <Box mt={2}>
                <Typography variant="h6">{message}</Typography>
            </Box>
        </Backdrop>
    );
};

export default PreloadedActivityIndicator;
