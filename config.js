const relayPins = [8, 10, 12, 16, 18, 22, 24, 26];

const config = {
    litOnSunSet: true,
    longitude: '41.815101',
    latitude: '-88.261404',
    relays: [
        {
            pin: relayPins[0],
            name: ''
        },
        {
            pin: relayPins[1],
            name: ''
        },
        {
            pin: relayPins[2],
            name: ''
        },
        {
            pin: relayPins[3],
            name: ''
        },
        {
            pin: relayPins[4],
            name: 'TV LED'
        },
        {
            pin: relayPins[5],
            name: ''
        },
        {
            pin: relayPins[6],
            name: 'Wax Warmer'
        },
        {
            pin: relayPins[7],
            name: 'Floor Lamp'
        }
    ],
    relayPins
};
module.exports = config;
