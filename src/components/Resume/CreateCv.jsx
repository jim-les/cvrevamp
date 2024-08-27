import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button } from '@mui/material';

const PersonalInfo = () => {
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
                    />
                </Grid>

                <Grid item md={4}>
                    <TextField
                        label="Surname"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item md={4}>
                    <TextField
                        label="Postal Code"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item md={2}>
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item md={2}>
                    <TextField
                        label="Country"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item md={4}>
                    <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item md={4}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const Education = () => {
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
                    />
                </Grid>

                <Grid item md={4}>
                    <TextField
                        label="Degree"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item md={4}>
                    <TextField
                        label="Field of Study"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item md={2}>
                    <TextField
                        label="Start Date"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item md={2}>
                    <TextField
                        label="End Date"
                        variant="outlined"
                        fullWidth
                        required
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
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const WorkExperience = () => {
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
                    />
                </Grid>

                <Grid item md={4}>
                    <TextField
                        label="Job Title"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item md={4}>
                    <TextField
                        label="Start Date"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item md={2}>
                    <TextField
                        label="End Date"
                        variant="outlined"
                        fullWidth
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
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const Skills = () => {
    return (
        <Box>
            <Typography variant='h5' color="blue" style={{ fontWeight: 'bold', marginTop: 20 }}>Skills</Typography>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Grid item md={12}>
                    <TextField
                        label="Skills"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="List your skills here"
                        required
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const AdditionalInfo = () => {
    return (
        <Box>
            <Typography variant='h5' color="blue" style={{ fontWeight: 'bold', marginTop: 20 }}>Additional Information</Typography>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Grid item md={12}>
                    <TextField
                        label="Additional Information"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Add any additional information here"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const CreateCv = ({ setStage }) => {
    const [steps, setSteps] = React.useState(0);

    const handleNext = () => {
        setSteps(steps + 1);
    };

    const handleBack = () => {
        if (steps === 0) {
            setStage('');
        } else {
            setSteps(steps - 1);
        }
    };

    return (
        <Box>
            <Container style={{ overflowY: 'scroll', height: 'calc(100vh - 100px)' }}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={2} style={{ marginTop: 20 }}>
                    <Typography variant='h4' style={{ fontWeight: 'bold' }}>Create a New CV</Typography>
                    <Typography variant='body1'>Start creating a professional CV in minutes</Typography>
                </Box>

                {steps === 0 && <PersonalInfo />}
                {steps === 1 && <Education />}
                {steps === 2 && <WorkExperience />}
                {steps === 3 && <Skills />}
                {steps === 4 && <AdditionalInfo />}

                <Box display='flex' justifyContent='flex-end' style={{ marginTop: 40, gap: 30 }}>
                    <Button variant='outlined' color='primary' style={{ width: '280px', height: '60px' }} onClick={handleBack}>Back</Button>
                    <Button variant='contained' color='primary' style={{ width: '280px', height: '60px' }} onClick={handleNext}>{steps === 4 ? 'Finish' : 'Continue'}</Button>
                </Box>
            </Container>
        </Box>
    );
};

export default CreateCv;
