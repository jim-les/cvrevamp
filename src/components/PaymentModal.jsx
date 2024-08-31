// PaymentModal.js
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const PaymentModal = ({ open, onClose, onConfirm, amount }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amountToPay] = useState(amount);

    const handleConfirm = () => {
        if (phoneNumber) {
            onConfirm(phoneNumber);
        } else {
            alert('Please enter a phone number.');
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="payment-modal-title"
            aria-describedby="payment-modal-description"
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 3,
                    mx: 'auto',
                    mt: '5%',
                    borderRadius: '8px',
                    boxShadow: 24,
                }}
            >
                <img 
                    src="https://www.safaricom.co.ke/images/MicrosoftTeams-image.jpg" 
                    alt="" 
                    style={{width: '100%', height: '150px'}}
                />
                <Typography id="payment-modal-description" sx={{ mt: 2 }}>
                    Please enter your phone number to proceed with payment.
                </Typography>
                <Box mt={2}>
                    <Typography variant="body1">Amount to Pay: KES {amount}</Typography>
                    <TextField
                        label="Phone Number"
                        fullWidth
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        margin="normal"
                    />
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleConfirm}
                        >
                            Confirm Payment
                        </Button>
                        <Button
                            variant="text"
                            onClick={onClose}
                            sx={{ ml: 2 }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default PaymentModal;
