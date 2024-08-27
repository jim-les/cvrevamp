import React from 'react';
import styled from 'styled-components';


const DashboardWidgetcard = () => {
    return (
        <Card>
            <h1>Widget Card</h1>
        </Card>
    )
}

const Card = styled.div`
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    height: 100%;
`;

export default DashboardWidgetcard