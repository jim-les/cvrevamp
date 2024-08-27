import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import jsPDF from 'jspdf';

const ClientOverview = ({ personalInfo, education, workExperience, skills, additionalInfo }) => {
    const saveAsPDF = () => {
        const doc = new jsPDF();
        
        doc.setFontSize(16);
        doc.text('CV Overview', 20, 20);

        let y = 30;
        const lineHeight = 10;

        const addText = (text) => {
            doc.text(text, 20, y);
            y += lineHeight;
        };

        addText(`Personal Information`);
        addText(`First Name: ${personalInfo.firstName}`);
        addText(`Surname: ${personalInfo.surname}`);
        addText(`Postal Code: ${personalInfo.postalCode}`);
        addText(`City: ${personalInfo.city}`);
        addText(`Country: ${personalInfo.country}`);
        addText(`Phone: ${personalInfo.phone}`);
        addText(`Email: ${personalInfo.email}`);

        addText(`Education`);
        addText(`School: ${education.school}`);
        addText(`Degree: ${education.degree}`);
        addText(`Field of Study: ${education.fieldOfStudy}`);
        addText(`Start Date: ${education.startDate}`);
        addText(`End Date: ${education.endDate}`);
        addText(`Description: ${education.description}`);

        addText(`Work Experience`);
        addText(`Company: ${workExperience.company}`);
        addText(`Job Title: ${workExperience.jobTitle}`);
        addText(`Start Date: ${workExperience.startDate}`);
        addText(`End Date: ${workExperience.endDate}`);
        addText(`Description: ${workExperience.description}`);

        addText(`Skills`);
        addText(skills);

        addText(`Additional Information`);
        addText(additionalInfo);

        doc.save('CV_Overview.pdf');
    };

    const handlePlaceOrder = () => {
        // Implement the logic for placing an order
        alert('Order placed successfully!');
    };

    return (
        <Box style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
            <Paper style={{ padding: 20, borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Typography variant='h4' style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                    CV Overview
                </Typography>

                <Typography variant='h6' style={{ fontWeight: 'bold' }}>Personal Information</Typography>
                <Typography>First Name: {personalInfo.firstName}</Typography>
                <Typography>Surname: {personalInfo.surname}</Typography>
                <Typography>Postal Code: {personalInfo.postalCode}</Typography>
                <Typography>City: {personalInfo.city}</Typography>
                <Typography>Country: {personalInfo.country}</Typography>
                <Typography>Phone: {personalInfo.phone}</Typography>
                <Typography>Email: {personalInfo.email}</Typography>

                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 20 }}>Education</Typography>
                <Typography>School: {education.school}</Typography>
                <Typography>Degree: {education.degree}</Typography>
                <Typography>Field of Study: {education.fieldOfStudy}</Typography>
                <Typography>Start Date: {education.startDate}</Typography>
                <Typography>End Date: {education.endDate}</Typography>
                <Typography>Description: {education.description}</Typography>

                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 20 }}>Work Experience</Typography>
                <Typography>Company: {workExperience.company}</Typography>
                <Typography>Job Title: {workExperience.jobTitle}</Typography>
                <Typography>Start Date: {workExperience.startDate}</Typography>
                <Typography>End Date: {workExperience.endDate}</Typography>
                <Typography>Description: {workExperience.description}</Typography>

                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 20 }}>Skills</Typography>
                <Typography>{skills}</Typography>

                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 20 }}>Additional Information</Typography>
                <Typography>{additionalInfo}</Typography>

                <Box display='flex' justifyContent='center' style={{ marginTop: 40, gap: 20 }}>
                    <Button variant='contained' color='primary' onClick={saveAsPDF}>Download PDF</Button>
                    <Button variant='contained' color='secondary' onClick={handlePlaceOrder}>Place Order</Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ClientOverview;
