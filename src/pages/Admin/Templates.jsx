import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Box, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Typography as MuiTypography } from '@mui/material';
import Wrapper from '../../components/common/Wrapper';
import Sidebar from '../../AdminComponents/Sidebar';
import DashboardTopbar from '../../AdminComponents/DashboardTopbar';
import AddTemplateDrawer from '../../AdminComponents/AddTemplateDrawer';
import UpdateTemplateDrawer from '../../AdminComponents/UpdateTemplateDrawer'; // Import your UpdateTemplateDrawer component
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';

const Templates = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false); // State for the UpdateDrawer
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOpenDrawer = () => {
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
    };

    const handleOpenUpdateDrawer = () => {
        setUpdateDrawerOpen(true);
    };

    const handleCloseUpdateDrawer = () => {
        setUpdateDrawerOpen(false);
    };

    const handleCardClick = (template) => {
        console.log('Card clicked:', template);  // Log template details
        setSelectedTemplate(template);
        handleOpenUpdateDrawer(); // Open the UpdateDrawer
    };

    const handleOpenConfirmDialog = () => {
        console.log('Open confirmation dialog for:', selectedTemplate);  // Log selected template
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleDelete = async () => {
        console.log('Deleting template:', selectedTemplate);  // Log before delete action
        if (!selectedTemplate) return;

        setConfirmLoading(true);
        try {
            await axios.delete(`${BASE_URL}/api/templates/${selectedTemplate._id}`);
            setTemplates((prevTemplates) => prevTemplates.filter(template => template._id !== selectedTemplate._id));
            setSelectedTemplate(null);
            setError(null);
        } catch (error) {
            console.error('Error deleting template:', error);
            setError('Error deleting template. Please try again.');
        } finally {
            setConfirmLoading(false);
            handleCloseConfirmDialog();
        }
    };

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/templates`);
                setTemplates(response.data);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
        const interval = setInterval(fetchTemplates, 10000); // Adjust interval as needed
        return () => clearInterval(interval);
    }, []);

    return (
        <Wrapper>
            <Grid container spacing={3} height="100vh">
                <Grid item md={3} height="100%">
                    <Sidebar />
                </Grid>
                <Grid item md={9} height="100%" style={{ backgroundColor: '#f1f1f5' }}>
                    <DashboardTopbar />
                    <Box p={2} height="calc(100vh - 64px)" overflow="auto">
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Templates</Typography>
                            <Button variant="contained" color="primary" onClick={handleOpenDrawer}>
                                Add Template
                            </Button>
                        </Box>

                        <Box display="flex" flexWrap="wrap">
                            {templates.map((template) => (
                                <Box key={template._id} m={1} position="relative">
                                    <Typography variant="body1">{template.name}</Typography>
                                    <Card
                                        sx={{ width: 280, height: 400 }}
                                        onClick={() => handleCardClick(template)} // Open the UpdateDrawer on card click
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{ height: '100%', objectFit: 'cover' }}
                                            image={`${BASE_URL}/${template.filePath}`}
                                            alt={template.name}
                                        />
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Confirmation Dialog */}
            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
                aria-labelledby="confirm-dialog-title"
            >
                <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <MuiTypography>Are you sure you want to delete this template?</MuiTypography>
                    {error && <MuiTypography color="error">{error}</MuiTypography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)} color="primary" disabled={confirmLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" disabled={confirmLoading}>
                        {confirmLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

            <AddTemplateDrawer open={drawerOpen} onClose={handleCloseDrawer} />

            {/* Update Template Drawer */}
            {selectedTemplate && (
                <UpdateTemplateDrawer
                    open={updateDrawerOpen}
                    onClose={handleCloseUpdateDrawer}
                    template={selectedTemplate} // Pass selected template data to the UpdateTemplateDrawer
                    onUpdate={async (updatedTemplate) => {
                        try {
                            await axios.put(`${BASE_URL}/api/templates/${updatedTemplatex}`, updatedTemplate);
                            setTemplates((prevTemplates) => prevTemplates.map(template =>
                                template._id === updatedTemplate._id ? updatedTemplate : template
                            ));
                            setSelectedTemplate(null);
                            setError(null);
                        } catch (error) {
                            console.error('Error updating template:', error);
                            setError('Error updating template. Please try again.');
                        } finally {
                            handleCloseUpdateDrawer();
                        }
                    }}
                />
            )}
        </Wrapper>
    );
};

export default Templates;
