// src/components/PersonalInfo.js
import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';

const PersonalInfo = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            personalInfo: {
                ...prevState.personalInfo,
                [e.target.name]: e.target.value
            }
        }));
    };

    return (
        <Box>
            <Typography variant='h5' color="blue" style={{ fontWeight: 'bold', marginTop: 20 }}>Personal Information</Typography>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Grid item md={4}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                        name="firstName"
                        value={formData.personalInfo.firstName || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        label="Surname"
                        variant="outlined"
                        fullWidth
                        required
                        name="surname"
                        value={formData.personalInfo.surname || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        label="Postal Code"
                        variant="outlined"
                        fullWidth
                        required
                        name="postalCode"
                        value={formData.personalInfo.postalCode || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={2}>
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        required
                        name="city"
                        value={formData.personalInfo.city || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={2}>
                    <TextField
                        label="Country"
                        variant="outlined"
                        fullWidth
                        required
                        name="country"
                        value={formData.personalInfo.country || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        required
                        name="phone"
                        value={formData.personalInfo.phone || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        name="email"
                        value={formData.personalInfo.email || ''}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PersonalInfo;
