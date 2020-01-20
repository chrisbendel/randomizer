import React, {useState, useEffect} from 'react';

export function Weather() {
    const [data, setData] = useState(null);

    async function getWeather() {
        fetch('http://api.openweathermap.org/data/2.5/forecast?zip=05446,us&units=imperial&APPID=cf3c7bcd5987d7405342cbced6febcdd', {
            headers: {
                'Accept': 'application/xml',
                'User-Agent': 'https://github.com/chrisbendel/randomizer'
            }
        })
        .then(res => res.json())
        .then(data => {
            setData(data);
        });
    }

    useEffect(() => {
        getWeather()
    }, []);


    if (!data) {
        return <div>Loading Weather...</div>
    }
    console.log(data);

    return (
        <div className="weather-container">
            <h4>
                {data.city.name}, {data.city.country}
            </h4>
            <h5>
                Sunrise: {new Date(data.city.sunrise * 1000).toLocaleTimeString()}
                <br/>
                Sunset: {new Date(data.city.sunset * 1000).toLocaleTimeString()}
            </h5>


        </div>

    )
}
