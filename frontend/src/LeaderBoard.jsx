import React, { useMemo } from "react";
import { Container } from "@mui/material";

const pStyle = {
    color: 'white',
    fontSize: 'large'
}

export const LeaderBord = (props) => {
    const { list = [] } = props;

    const sorted = useMemo(() => {
        
        let sortedItems = [];
        if (list.length > 0) {
            const map = new Map();
            list.forEach(el => {
                map.set(el.address, Math.max(map.get(el.address) + 1 || 0, 1));
            });
            sortedItems = [...map.entries()].sort((a, b) => b[1] - a[1])
        }
        return sortedItems;
    }, [list]);

    return (
        <Container className='gradient-border'
            style={{ marginRight: '15px'}}
        >
            <p style={pStyle}>Leader Board</p>
            {sorted.map((el, i) => {
                return (
                    <p key={i} style={pStyle}>{`${el[0]}: ${el[1]}`}</p>
                )
            })}
        </Container>
    )
}