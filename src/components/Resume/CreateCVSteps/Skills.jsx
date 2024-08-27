// src/components/Skills.js
import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const Skills = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            skills: e.target.value
        }));
    };

    return (
        <Box>
            <Typography variant='h5' color="blue" style={{ fontWeight: 'bold', marginTop: 20 }}>Skills</Typography>
            <TextField
                label="Skills"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                placeholder="List your skills here"
                required
                value={formData.skills || ''}
                onChange={handleChange}
            />
        </Box>
    );
};

export default Skills;
