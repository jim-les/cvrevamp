import React, { useState } from 'react';
import { Box, Typography, Divider, Drawer, IconButton, TextField, Button } from '@mui/material';
import { CalendarMonth, Close, Download, FileCopyOutlined, Person2Outlined } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const DashedOutlineBox = ({ children, sx }) => (
    <Box
        sx={{
            border: '1px dashed gray',
            borderRadius: 1,
            p: 2,
            ...sx
        }}
    >
        {children}
    </Box>
);

const FileInfoCard = ({ file }) => (
    <DashedOutlineBox>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Uploaded File:</Typography>
        <Typography variant="body2"><b>Name:</b> {file.name}</Typography>
        <Typography variant="body2"><b>Size:</b> {Math.round(file.size / 1024)} KB</Typography>
    </DashedOutlineBox>
);

const OrderDrawer = ({ drawerOpen, handleCloseDrawer, viewOrder, onUpdateOrder }) => {
    const [adminResponse, setAdminResponse] = useState('');
    const [responseDocument, setResponseDocument] = useState(null);
    const [fileInfo, setFileInfo] = useState(null);

    const handleResponseChange = (e) => {
        setAdminResponse(e.target.value);
    };

    const handleDocumentChange = (e) => {
        const file = e.target.files[0];
        setResponseDocument(file);
        setFileInfo(file);
    };

    const handleSubmit = () => {
        // Create a FormData object to send both text and file
        const formData = new FormData();
        formData.append('adminResponse', adminResponse);
        if (responseDocument) {
            formData.append('responseDocument', responseDocument);
        }

        // Call the onUpdateOrder function with the formData to update the order
        onUpdateOrder(formData);

        // Clear the input fields after submission
        setAdminResponse('');
        setResponseDocument(null);
        setFileInfo(null);
    };

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleCloseDrawer}
            PaperProps={{ sx: { width: 500, p: 2 } }} // Adjust width and padding
        >
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">View Order</Typography>
                    <IconButton onClick={handleCloseDrawer}>
                        <Close />
                    </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />
                {viewOrder ? (
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                            <Typography variant="body2"><b>Order ID:</b> {viewOrder._id}</Typography>
                            <Typography variant="body2" sx={{ color: green[500] }}><b>Status:</b> {viewOrder.orderStatus}</Typography>
                        </Box>
                        <Box pt={3} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Person2Outlined />
                            <Typography variant="body2">Name: {viewOrder.user?.username || 'N/A'}</Typography>
                        </Box>
                        <Box pt={3} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <FileCopyOutlined />
                            <Typography variant="body2">Description: {viewOrder.documentType}</Typography>
                        </Box>
                        <Box pt={3} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <CalendarMonth />
                            <Typography variant="body2">Upload Date: {new Date(viewOrder.uploadDate).toLocaleDateString()}</Typography>
                        </Box>
                        <Box pt={3} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Download />
                            <a href={viewOrder.documentUrl} download>
                                {viewOrder.documentUrl && viewOrder.documentUrl.split('/').pop()}
                            </a>
                        </Box>
                        
                        {viewOrder.adminResponse && (
                            <DashedOutlineBox sx={{ mt: 2 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Admin Response:</Typography>
                                <Typography variant="body2">{viewOrder.adminResponse || 'No response'}</Typography>
                            </DashedOutlineBox>
                        )}

                        {viewOrder.adminResponseDocumentUrl && (
                            <DashedOutlineBox sx={{ mt: 2 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Admin Response Document:</Typography>
                                <a href={viewOrder.adminResponseDocumentUrl} target="_blank" rel="noopener noreferrer">
                                    View Document
                                </a>
                            </DashedOutlineBox>
                        )}

                        {/* Admin Response Form */}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6">Add Admin Response</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Admin Response"
                                variant="outlined"
                                value={adminResponse}
                                onChange={handleResponseChange}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ mb: 2 }}
                            >
                                Upload Response Document
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleDocumentChange}
                                />
                            </Button>
                            {fileInfo && <FileInfoCard file={fileInfo} />}
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Submit Response
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="body1">No order details available.</Typography>
                )}
            </Box>
        </Drawer>
    );
};

export default OrderDrawer;
