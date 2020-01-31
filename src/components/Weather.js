import React, {useState, useEffect} from 'react';
import * as moment from 'moment';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
};

export function Weather() {
    const [data, setData] = useState(null);

    async function getWeather() {
        fetch('https://api.openweathermap.org/data/2.5/forecast?zip=05446,us&units=imperial&APPID=cf3c7bcd5987d7405342cbced6febcdd', {
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

    function renderForecast(list) {
        return list.slice(0, 18).map(time => {
            const date = moment(time.dt * 1000);
            const weather = time.weather[0];
            const temp = time.main;
            return (
                <div className="forecast-time" key={time.dt}>
                    <div className="datetime">
                        <div>{date.format("ddd, hA")}</div>
                        <div>{weather.description.capitalize()}</div>
                        <img width={75} height={75} src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}/>
                        <h5>{temp.temp}&#8457;</h5>
                    </div>
                </div>
            )
        })
    }


    if (!data) {
        return <div>Loading Weather...</div>
    }
    console.log(data);

    return (
        <div className="weather-container">
            <div className="weather-city">
                <h4>
                    {data.city.name}, {data.city.country}
                </h4>
                <h5>
                    Sunrise: {new Date(data.city.sunrise * 1000).toLocaleTimeString()}
                    <br/>
                    Sunset: {new Date(data.city.sunset * 1000).toLocaleTimeString()}
                </h5>
            </div>
            <div className="forecast">
                {renderForecast(data.list)}
            </div>
        </div>

    )
}
