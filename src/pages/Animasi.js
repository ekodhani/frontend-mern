import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect } from 'react';
import { Table } from 'rsuite';
import axios from 'axios';
const { Column, HeaderCell, Cell } = Table;

function Animasi() {
    const { y } = useSpring({ y: -100, from: { y: 0 } });
    const [click, setClick] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        // cek ada token atau belum
          axios
            .get("http://localhost:8001/posts", {
              headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                setData(response.data.allPosts);
              
            });
      }, []);
    
    return (
    <div>
        <h1>Showcase</h1>
        <animated.div style={{ transform: click ? y.interpolate(y => `translate3d(0, ${y}px, 0)`) : '' }}>
            <div onClick={(e) => setClick(!click)}> Test </div>
        </animated.div>

        <Table
            height={400}
            data={data}
            wordWrap="break-word"
            autoHeight={true}
        >
            <Column width={130} align="center">
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
            </Column>

            <Column width={130}>
                <HeaderCell>title</HeaderCell>
                <Cell dataKey="title" />
            </Column>

            <Column width={130}> 
                <HeaderCell>Post Text</HeaderCell>
                <Cell dataKey="postText" />
            </Column>

            <Column width={130}>
                <HeaderCell>Username</HeaderCell>
                <Cell dataKey="username" />
            </Column>
        </Table>

    </div>
    );
}

export default Animasi;