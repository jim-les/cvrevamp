// SuccessConfetti.js
import React from 'react';
import Confetti from 'react-confetti';

const SuccessConfetti = ({ width, height }) => {
    return (
        <Confetti
            width={width}
            height={height}
        />
    );
};

export default SuccessConfetti;
