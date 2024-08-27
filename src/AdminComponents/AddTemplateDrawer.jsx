// components/AddTemplateDrawer.js

import React, { useState } from 'react';
import { Box, Typography, Divider, TextField, Button, Drawer, Input } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../BASE_URL';

const AddTemplateDrawer = ({ open, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('authToken');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!name || !description || !file) {
            alert('Please fill in all fields and select a file');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('template', file);

        setLoading(true);

        try {
            await axios.post(`${BASE_URL}/api/templates`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Template added successfully!');
            onClose();
        } catch (error) {
            console.error('Error adding template:', error);
            alert('Failed to add template');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box p={3} width={400}>
                <Typography variant="h6" gutterBottom>Add New Template</Typography>
                <Divider />
                <Box mt={2}>
                    <TextField
                        label="Template Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Template Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        type="file"
                        onChange={handleFileChange}
                        fullWidth
                        margin="normal"
                    />
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Template'}
                    </Button>
                    <Button
                        variant="text"
                        onClick={onClose}
                        style={{ marginLeft: '10px' }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default AddTemplateDrawer;
