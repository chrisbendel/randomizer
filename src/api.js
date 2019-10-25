import {xml2json} from 'xml-js';

export const getWeather = () => {
  return fetch('https://wxdata.weather.com/wxdata/weather/local/05404?cc=*&unit=F&dayf=8', {
      mode: 'no-cors',
      headers: {
          'Accept': 'application/xml',
          'User-Agent': 'https://github.com/chrisbendel/randomizer'
      }
  }).then(res => res.text())
    .then(xml => {
        console.log(xml);
        let result = xml2json(xml);
        console.log(result);
        return result;
      });
};

export const getDadJoke = () => {
    return fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'https://github.com/chrisbendel/randomizer'
        }
    }).then(res => res.json());
};
