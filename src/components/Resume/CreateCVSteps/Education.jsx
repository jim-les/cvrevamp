// src/components/Education.js
import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';

const Education = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            education: {
                ...prevState.education,
                [e.target.name]: e.target.value
            }
        }));
    };

    return (
        <Box>
            <Typography variant='h5' color="blue" style={{ fontWeight: 'bold', marginTop: 20 }}>Education</Typography>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Grid item md={4}>
                    <TextField
                        label="School"
                        variant="outlined"
                        fullWidth
                        required
                        name="school"
                        value={formData.education.school || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        label="Degree"
                        variant="outlined"
                        fullWidth
                        required
                        name="degree"
                        value={formData.education.degree || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        label="Field of Study"
                        variant="outlined"
                        fullWidth
                        required
                        name="fieldOfStudy"
                        value={formData.education.fieldOfStudy || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={2}>
                    <TextField
                        label="Start Date"
                        variant="outlined"
                        fullWidth
                        required
                        name="startDate"
                        value={formData.education.startDate || ''}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={2}>
                    <TextField
                        label="End Date"
                        variant="outlined"
                        fullWidth
                        required
                        name="endDate"
                        value={formData.education.endDate || ''}
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
                        value={formData.education.description || ''}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Education;
