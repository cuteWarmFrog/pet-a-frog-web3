import React, { useCallback } from "react";
import { Container } from "@mui/material";
import { Button } from '@mui/material';
import { CircularProgress } from "@mui/material";

const pStyle = {
    color: 'white',
    fontSize: 'large'
}

export const Header = (props) => {
    const { currentAccount, petAFrog, connectWallet, totalPets, petting } = props;

    const renderButtons = useCallback(() => {
        if (currentAccount) {
            if (petting) {
                return (
                    <>
                        <p style={pStyle}>petting in progress... I love it!</p>
                        <CircularProgress color="info"/>
                    </>
                )
            } else {
                return (
                    <Button
                        onClick={petAFrog}
                        variant="contained" 
                    >
                        Pet a Frog!
                    </Button>
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
    }, [currentAccount, petAFrog, connectWallet, petting])

    console.log(`totalPetsHeader: ${totalPets}`)

    return (
        <Container style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center'
        }}>
            <img width={300} height={300} src="me.jpg" alt="here should be my but something has broken :(" />
            <p style={pStyle}>
                Hi there! It's me, cute frog ⊂(◉‿◉)つ
            </p>
            <p style={pStyle}>
                You've petted me {totalPets} times already (✿◠‿◠)
            </p>
            {renderButtons()}
        </Container>
    )
}