import React, {useState, useEffect} from 'react';

export function DadJoke() {
    const [data, setData] = useState(null);

    async function getDadJoke() {
        return fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'https://github.com/chrisbendel/randomizer'
            }
        }).then(res => res.json()).then(data => setData(data));
    }

    useEffect(() => {
        getDadJoke()
    }, []);

    return (
        <div>
            {data && data.joke}
        </div>
    )
}
