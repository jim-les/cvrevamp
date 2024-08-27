import React from 'react';
// Material UI image carousel
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from 'styled-components';
import { Box, Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

import carousel1 from '../assets/carousel/resume_two.webp';
import carousel2 from '../assets/carousel/resume2.webp';
import carousel3 from '../assets/carousel/carousel3.webp';
import smile from '../assets/lol.png';

const ResumeLetters = () => {
    const carouselImages = [
        carousel1,
        carousel2,
        carousel3
    ];

    return (
        <ResumeLettersContainer>
            
            

            <Grid container>
                <Grid item md={6}>
                    <Carousel 
                        showArrows={true} 
                        showThumbs={false} 
                        showStatus={false} 
                        infiniteLoop={true} 
                        autoPlay={true} 
                        interval={5000} 
                        transitionTime={1000}
                        style={{display: 'flex', justifyContent: 'center'}}
                    >
                        {carouselImages.map((image, index) => (
                            <CarouselItem key={index}>
                                <img src={image} alt={`cover letter ${index}`} />
                            </CarouselItem>
                        ))}
                    </Carousel>
                </Grid>
                <Grid item md={6} px={4}>
                    <Typography variant="h5" fontSize={28} style={{fontWeight: '800', color: 'blue'}}>What are the benefits of MyCv-Creator online resume Builder and Software ?</Typography>

                    <Grid container gap={2}>
                        <Grid item md={5}>
                            <Typography variant="h5" my={2}  fontSize={28} style={{fontWeight: '600'}}>1. Free to use</Typography>
                            <Typography variant="body2">MyCv-Creator is a free online resume builder and software. You can create a professional resume in minutes.</Typography>
                        </Grid>

                        {/* follor tips from experts */}
                        <Grid item md={6}>
                            <Typography variant="h5" my={2} text-primary style={{fontWeight: '600'}}>2. Follow tips from experts</Typography>
                            <Typography variant="body2">Our resume tips and examples guide you through the process of creating a resume that stands out.</Typography>
                        </Grid>

                        {/* 20+ Best Resume Templates */}
                        <Grid item md={5}>
                            <Typography variant="h5" my={2} style={{fontWeight: '600'}}>3. 20+ Best Resume Templates</Typography>
                            <Typography variant="body2">Our resume templates are designed by experts and follow best practices for resume writing.</Typography>
                        </Grid>

                        {/* Resume check */}
                        <Grid item md={6}>
                            <Typography variant="h5" my={2} style={{fontWeight: '600'}}>4. Resume check</Typography>
                            <Typography variant="body2">Our AI-powered resume checker will help you improve your resume and get more interviews.</Typography>
                        </Grid>

                        {/* its fast and easy to use */}
                        <Grid item md={5}>
                            <Typography variant="h5" my={2} style={{fontWeight: '600'}}>5. It's fast and easy to use</Typography>
                            <Typography variant="body2">Our online resume builder is user-friendly and intuitive. Create a resume in minutes.</Typography>
                        </Grid>

                        {/* Flexible text Editor */}
                        <Grid item md={6}>
                            <Typography variant="h5" my={2} style={{fontWeight: '600'}}>6. Flexible text Editor</Typography>
                            <Typography variant="body2">Our text editor allows you to customize your resume to match your personal style.</Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Button variant="outlined" color="primary" size="large" href="/resume-builder" borderWidth={5} width={200} height={50}>
                                <img src={smile} alt="" style={{width: '100px', height: '100px', marginRight: '10px'}} />
                                Create Your Resume Now
                            </Button>
                        </Grid>
                            
                    </Grid>
                </Grid>
            </Grid>


        </ResumeLettersContainer>
    );
};

const ResumeLettersContainer = styled.div`
    padding: 2rem 1rem;  // Reduced horizontal padding for better responsiveness
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;

const CarouselItem = styled.div`
    width: 100%;  // Full width for responsiveness
    // max-width: 400px;  // Max width for larger screens
    display: flex;
    justify-content: center;  // Center image horizontally
    overflow: hidden;
    
    img {
        width: 100%;  // Ensure image fits the container width
        height: auto;  // Maintain aspect ratio
        border-radius: 10px;  // Optional: rounded corners
    }
`;

export default ResumeLetters;
