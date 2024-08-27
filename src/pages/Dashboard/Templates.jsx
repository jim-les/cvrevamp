import React, {useEffect, useState } from 'react'
import { Grid, Typography, Button, Box, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Typography as MuiTypography } from '@mui/material';
import Wrapper from '../../components/common/Wrapper';
import DashboardTopbar from '../../components/DashboardTopbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';


const Templates = () => {
    const [templates, setTemplates] = useState([]);

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
            <Grid container spacing={3} height={1}>
                <Grid item md={3} height={1}>
                    <Sidebar />
                </Grid>
                <Grid item md={9} height={1} width={1} style={{ backgroundColor: '#f1f1f5' }}>
                    <DashboardTopbar />
                    <Box p={3} style={{ overflowY: 'scroll', height: 'calc(100vh - 100px)' }}>
                        <Typography variant='h6' style={{ fontWeight: 'bold' }}>Resume Templates</Typography>
                        <Grid container spacing={3} style={{ marginTop: 20 }}>
                            {templates.map((template) => (
                                <Box key={template._id} m={1} position="relative">
                                    <Card
                                        sx={{ width: 280, height: 400 }}
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
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Wrapper>
    )
}

export default Templates