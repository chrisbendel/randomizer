import React, {useState, useEffect} from 'react';
import {getDadJoke} from "../api";

export function DadJoke() {
    const [data, setData] = useState(null);

    useEffect(async () => {
        // const joke = await getDadJoke();
        // setData(joke);
    }, []);

    return (
        <div>
            {data && data.joke}
        </div>
    )
}
