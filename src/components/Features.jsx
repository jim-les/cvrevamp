import React from 'react';
import styled from 'styled-components';

const Features = () => {
    const features = [
        {
            "image": "https://www.mycvcreator.com/assets/img/icon/resume.png",
            "title": "Create Resume",
            "info": "Create a professional-quality resume in minutes.",
            "button": "CREATE NEW RESUME"
        },
        {
            "image": "https://www.mycvcreator.com/assets/img/icon/letter.png",
            "title": "Create Cover Letter",
            "info": "Create an eye-catching cover letter to send with your resume.",
            "button": "CREATE NEW LETTER"
        },
        {
            "image": "https://www.mycvcreator.com/assets/img/icon/website.png",
            "title": "Create Resume Website",
            "info": "Transform your resume into a mobile-friendly website that you can share with recruiters!",
            "button": "CREATE NEW WEBSITE"
        }
    ];

    return (
        <FeaturesContainer>
            <SubTitle>CREATE A RESUME IN MINUTES</SubTitle>
            <Title>Our Features</Title>

            <FlexWrapper>
                {features.map((value, index) => (
                    <FeatureCard key={index}>
                        <Image src={value.image} alt={value.title} />
                        <FeatureTitle>{value.title}</FeatureTitle>
                        <FeatureInfo>{value.info}</FeatureInfo>
                        <FeatureButton>{value.button}</FeatureButton>
                    </FeatureCard>
                ))}
            </FlexWrapper>
        </FeaturesContainer>
    );
};

const FeaturesContainer = styled.div`
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;

const SubTitle = styled.h4`
    font-size: 1.0rem;
    margin: 0;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    margin: 0;
`;  

const FlexWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
`;

const FeatureCard = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-bottom: 1rem;
`;


const FeatureTitle = styled.h3`
    font-size: 1.5rem;
    margin: 0;
`;

const FeatureInfo = styled.p`
    font-size: 1.2rem;
    text-align: center;
    margin: 0.5rem 0;
`;

const FeatureButton = styled.button`
    padding: 1rem 2rem;
    background: linear-gradient(90deg, #007bff, #00ff00);
    color: white;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    // position: absolute;
    // bottom: 20px;
`;

export default Features;
