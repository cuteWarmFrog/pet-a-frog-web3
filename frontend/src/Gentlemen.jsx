import React from "react";
import { Container } from '@mui/material';

const pStyle = {
    color: 'white',
    fontSize: 'large'
}

export const Gentlemen = (props) => {
    const { list = [] } = props;

    const lastFive = [...list].reverse().slice(0, 5);

    console.log(`list of gentleman: ${list}`)

    return (
        <Container style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '10px',
        }}>
            <p style={pStyle}>last 5 gentlemen:</p>
            {lastFive.length > 1 && lastFive.map((el, i) => {
                return (
                    <p style={pStyle} key={i}>{el}</p>
                )
            })}
        </Container>
    )
}