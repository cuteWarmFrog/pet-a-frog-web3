import React, { useCallback, useState } from "react";
import { Container } from "@mui/material";
import { Button } from '@mui/material';
import { CircularProgress } from "@mui/material";
import { TextField } from '@mui/material';
import { Alert } from '@mui/material';

import './Header.scss';

const pStyle = {
    color: 'white',
    fontSize: 'large'
}


export const Header = (props) => {
    const { currentAccount, petAFrog, connectWallet, totalPets, petting } = props;

    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState(false);

    const onInputChange = (e) => {
        setMessage(e.target.value);
    }

    const onPetAFrogClick = useCallback(() => {
        console.log(`message: ${message}`);
        if (message === '') {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 4000);
        } else {
            petAFrog(message);
        }
    }, [message, petAFrog])

    const renderButtons = useCallback(() => {
        if (currentAccount) {
            if (petting) {
                return (
                    <>
                        <p style={pStyle}>petting in progress... I love it!</p>
                        <CircularProgress color='info' />
                    </>
                )
            } else {
                return (
                    <Container style={{
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}>
                        <TextField
                            style={{ backgroundColor: '#74ad66', marginRight: '10px', borderRadius: '7px' }}
                            color='error'
                            label='Message'
                            variant='filled'
                            onChange={onInputChange}
                        />

                        <Button
                            style={{
                                fontWeight: 600,
                                fontSize: 'large'
                            }}
                            onClick={onPetAFrogClick}
                            variant='contained'
                        >
                            Pet a Frog!
                        </Button>

                    </Container>

                )
            }
        }
        return (
            <Button
                onClick={connectWallet}
                variant="contained"
            >
                Connect wallet
            </Button>
        )
    }, [currentAccount, connectWallet, petting, onPetAFrogClick])

    console.log(`totalPetsHeader: ${totalPets}`)

    return (
        <Container className='gradient-border' style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center'
        }}>
            <img width={300} height={300} src="me.jpg" alt="here should be my but something has broken :(" />
            <p style={pStyle}>
                Hi there! It's me, cute frog ⊂(◉‿◉)つ
            </p>

            <p style={{ color: 'white', fontSize: 'small' }}>
                Petting me also gets you 0.001 eth!
                </p>

            {currentAccount && <p style={pStyle}>
                You've petted me {totalPets} times already (✿◠‿◠)
            </p>}
            {alert && <Alert style={{ margin: '15px', fontSize: 'large', fontWeight: 600 }} variant="outlined" severity="info">
                Message is too short!
            </Alert>}
            {renderButtons()}
        </Container>
    )
}