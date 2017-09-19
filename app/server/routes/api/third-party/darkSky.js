'use strict';
//https://api.darksky.net/forecast/[key]/[latitude],[longitude]
var request = require('superagent-bluebird-promise');
const API_KEY = '47bf99da87e9ee588c011cd5ecce56d7';
const longitude = '41.815101'
const latitude = '-88.261404'

const API_ENDPOINT = `https://api.darksky.net/forecast/${API_KEY}`;

const getData = (unit) => {
    let units;

    units = unit === 'f' ? 'us' : '';

    return request.get(`${API_ENDPOINT}/${longitude},${latitude}?units=${units}`).promise();
}

//TODO: add a node session to save the darksky api response

const darkSky = {
    getCurrentWeather: (unit) => {
        let data = {};
        return getData(unit)
            .then(res => {
                data = res.body;
                let filteredData = {};
                filteredData = data.currently;
                return filteredData;
            })
    },
};


module.exports = darkSky;