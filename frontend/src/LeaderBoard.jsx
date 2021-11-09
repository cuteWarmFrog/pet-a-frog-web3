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
        if (list.length > 1) {
            console.log(list);
            const map = new Map();
            list.forEach(el => {
                map.set(el, Math.max(map.get(el) + 1 | 0, 1));
            });
            console.log(map);
            sortedItems = [...map.entries()].sort((a, b) => a[1] - b[1])
        }
        return sortedItems;
    }, [list]);

    return (
        <Container>
            <p style={pStyle}>Leader Board</p>
            {sorted.map((el, i) => {
                return (
                    <p key={i} style={pStyle}>{`${el[0]}: ${el[1]}`}</p>
                )
            })}
        </Container>
    )
}