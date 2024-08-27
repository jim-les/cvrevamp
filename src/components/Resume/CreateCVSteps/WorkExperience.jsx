// src/components/WorkExperience.js
import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';

const WorkExperience = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            workExperience: {
                ...prevState.workExperience,
                [e.target.name]: e.target.value
            }
        }));
    };

    return (
        <Box>
            <Typography variant='h5' color="blue" style={{ fontWeight: 'bold', marginTop: 20 }}>Work Experience</Typography>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Grid item md={4}>
                    <TextField
                        label="Company"
                        variant="outlined"
                        fullWidth
                        required
                        name="company"
                        value={formData.workExperience.company || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        label="Job Title"
                        variant="outlined"
                        fullWidth
                        required
                        name="jobTitle"
                        value={formData.workExperience.jobTitle || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        label="Start Date"
                        variant="outlined"
                        fullWidth
                        required
                        name="startDate"
                        value={formData.workExperience.startDate || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={2}>
                    <TextField
                        label="End Date"
                        variant="outlined"
                        fullWidth
                        name="endDate"
                        value={formData.workExperience.endDate || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={8}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        required
                        name="description"
                        value={formData.workExperience.description || ''}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default WorkExperience;
