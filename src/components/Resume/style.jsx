import styled, { keyframes, css } from 'styled-components';
import { Card, Button, Box } from '@mui/material';


// Keyframes for fade-in and fade-out animation
const fadeInOut = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Keyframes for glowing animation
export const glow = keyframes`
    0% {
        box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
    }
    50% {
        box-shadow: 0 0 15px rgba(0, 0, 255, 0.8);
    }
    100% {
        box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
    }
`;

// Styled Card component with animation
export const AnimatedCard = styled(Card)`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 200px;
    z-index: 1000;
    animation: ${fadeInOut} 0.5s ease-in-out;
`;

// Styled Exit Button
export const ExitButton = styled(Button)`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1100; /* Ensure it appears above the card */
    background-color: transparent;
    color: #000; /* Optional: Adjust color for better visibility */
`;

// Styled Box for actions
export const ActionBox = styled(Box)`
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s, color 0.3s;

    ${({ glowing }) =>
        glowing &&
        css`
            &:hover {
                background-color: blue;
                color: white;
                animation: ${glow} 1.5s infinite;
            }
        `}

    &:hover {
        background-color: blue;
        color: white;
    }
`;

// Styled Box for dashed outline
export const DashedOutline = styled(Box)`
    border: 2px dashed green; /* Updated border color */
    border-radius: 5px;
    padding: 20px;
    display: flex;
    height: 350px;
    margin-top: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    text-align: center; /* Center text and emoji */
    
    &::before {
        content: '👍'; /* Thumbs up emoji */
        font-size: 50px; /* Adjust size as needed */
        margin-bottom: 10px;
    }
`;
