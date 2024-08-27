import React from 'react';
import { Container, Button, Box } from '@mui/material';
import { keyframes } from 'styled-components';
import styled from 'styled-components';

// Import components
import Header from '../components/Header';
import Banner from '../components/Banner';
import Features from '../components/Features';
import ResumeLetters from '../components/ResumeLetters';


// Define the shaking animation using keyframes
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

// Styled button with shaking animation
const ShakingButton = styled(Button)`
  animation: ${shake} 0.9s ease-in-out infinite;
`;

const Home = () => {
    return (
        <Container>
            <Header />
            
            {/* Banner */}
            <Banner />

            {/* Features */}
            <Features />

            {/* Resume letters */}
            <ResumeLetters />

            {/* Call to action */}
            <Box textAlign="center" py={4}>
                <h1 style={{ fontSize: '4.8rem', color: 'blue' }}>
                    Join over 20,00,133 <br /> users worldwide
                </h1>
                <h3>Start for free - try our resume builder now</h3>

                <ShakingButton variant="contained" color="primary" size="large" style={{ marginTop: '2rem' }}>
                    Create Your CV Now
                </ShakingButton>
            </Box>

            <p>Click on the Vite and React logos to learn more</p>
        </Container>
    );
};

export default Home;
