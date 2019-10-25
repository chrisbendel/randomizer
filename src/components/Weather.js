import React, {useState, useEffect} from 'react';
import {getWeather} from "../api";

export function Weather() {
    const [data, setData] = useState(null);

    useEffect(async () => {
        const res = await getWeather();
        console.log(res);
        // setData(joke);
    }, []);

    return (
        <div>
            Put weather here
        </div>
    )
}
