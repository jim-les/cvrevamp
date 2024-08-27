import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, TextField, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../BASE_URL';

const UpdateTemplateDrawer = ({ open, onClose, template, onUpdate, onDelete }) => {
    const [updatedTemplate, setUpdatedTemplate] = useState(template || {});
    const [selectedFile, setSelectedFile] = useState(null);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setUpdatedTemplate(template);
    }, [template]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedTemplate((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log('Selected file:', file);
    };

    const logFormData = (formData) => {
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    };

    const handleSubmit = async () => {
        const updateUrl = `${BASE_URL}/api/templates/${updatedTemplate._id}`;
    
        const formData = new FormData();
        formData.append('name', updatedTemplate.name);
        formData.append('description', updatedTemplate.description);
        if (selectedFile) {
            formData.append('file', selectedFile);
        }
    
        // Log FormData entries
        logFormData(formData);
    
        try {
            const response = await axios.put(updateUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSuccessMessage('Template updated successfully!');
            setOpenSuccessModal(true);
            onUpdate(response.data); // Notify parent component
            onClose(); // Close the drawer
        } catch (error) {
            console.error('Error updating template:', error);
        }
    };

    const handleDelete = async () => {
        console.log('Deleting template:', updatedTemplate._id);
        const deleteUrl = `${BASE_URL}/api/templates/${updatedTemplate._id}`;
    
        try {
            const response = await axios.delete(deleteUrl);
            if (response.status === 200) {
                console.log('Template deleted:', updatedTemplate._id);
                setSuccessMessage('Template deleted successfully!');
                setOpenSuccessModal(true); // Show success modal
                onDelete(updatedTemplate._id); // Notify parent component
                onClose(); // Close the drawer
            }
        } catch (error) {
            console.error('Error deleting template:', error);
        }
    };

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
    };

    return (
        <>
            <Drawer anchor="right" open={open} onClose={onClose}>
                <Box p={2} width={310}>
                    <Typography variant="h6">Update Template</Typography>
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            name="name"
                            value={updatedTemplate.name || ''}
                            onChange={handleChange}
                        />
                        <Card sx={{ width: 280, height: 400 }}>
                            <CardMedia
                                component="img"
                                sx={{ height: '100%', objectFit: 'cover' }}
                                image={`${BASE_URL}/${updatedTemplate.filePath}`}
                                alt={updatedTemplate.name}
                            />
                        </Card>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="File Path"
                            name="filePath"
                            value={updatedTemplate.filePath || ''}
                            onChange={handleChange}
                        />
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleFileChange}
                            style={{ marginTop: 16 }}
                        />
                        {/* Add other fields as necessary */}
                    </Box>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleDelete} color="error">
                            Delete
                        </Button>
                        <Button onClick={onClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={handleSubmit} color="primary" variant="contained">
                            Update
                        </Button>
                    </Box>
                </Box>
            </Drawer>
            
            {/* Success Modal */}
            <Dialog
                open={openSuccessModal}
                onClose={handleCloseSuccessModal}
                aria-labelledby="success-dialog-title"
            >
                <DialogTitle id="success-dialog-title">Success</DialogTitle>
                <DialogContent>
                    <Typography>{successMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateTemplateDrawer;
