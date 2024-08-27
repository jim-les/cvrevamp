// src/components/AdditionalInfo.js
import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const AdditionalInfo = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            additionalInfo: e.target.value
        }));
    };

    return (
        <Box>
            <Typography variant='h5' color="blue" style={{ fontWeight: 'bold', marginTop: 20 }}>Additional Information</Typography>
            <TextField
                label="Additional Information"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                placeholder="Add any additional information here"
                value={formData.additionalInfo || ''}
                onChange={handleChange}
            />
        </Box>
    );
};

export default AdditionalInfo;
