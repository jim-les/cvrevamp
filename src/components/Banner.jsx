import React from 'react';
import styled from 'styled-components';

// images
import CV_Builder_2x from '../assets/CV_Builder_2x.png';

const Banner = () => {
    return (
        <BannerContainer>
            <BannerInfo>
                <BannerTitle>
                    Revamp Your CV, <br />
                    <span style={{color: 'blue'}}>Build Your professional CV</span> <br />
                    Secure Your Dream Job
                </BannerTitle>

                <ExtraInfo>
                    Create a professional CV in minutes with our free CV builder. <br />
                    Get the job you want.
                </ExtraInfo>
                <h5><i>Online resume builder with AI assistance</i></h5>

                {/* create cv button */}
                <ActionButton>
                    Create Your CV Now
                </ActionButton>
            </BannerInfo>

            {/* image */}
            <ImageContainer>
                <Image src={CV_Builder_2x} alt="CV Builder" loading="lazy" />
            </ImageContainer>
        </BannerContainer>
    )
}

const BannerContainer = styled.div`
    padding: 2rem 0;
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;

const BannerInfo = styled.div`
    width: 100%;
    max-width: 600px;
`;

const BannerTitle = styled.h1`
    margin: 0;
`;

const ExtraInfo = styled.p`
    margin-top: 1rem;
    font-size: 1.2rem;
`;

const ImageContainer = styled.div`
    margin-top: 2rem;
`;

const Image = styled.img`
    width: 100%;
    max-width: 500px;
    height: auto;
`;

const ActionButton = styled.button`
    padding: 1rem 4rem;
    margin-top: .1rem;
    background: linear-gradient(90deg, #007bff, #00ff00);
    color: white;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.3s ease;
    position: relative;
    overflow: hidden;
    &:hover {
        background-color: #007bff;
    }

    // animation for before moving like a light left to right to illuminate the button
    ::before {
        content: '';
        position: absolute;
        width: 200%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 40px;
        z-index: 10;
        top: 0;
        left: 10%;
        animation: shine 1.5s infinite;
    }

    @keyframes shine {
        0% {
            left: -100%;
        }
        50% {
            left: 100%;
        }
        100% {
            left: 100%;
        }
    }
`;

export default Banner;
