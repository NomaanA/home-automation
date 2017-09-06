const relayPins = [8, 10, 12, 16, 18, 22, 24, 26];

const config = {
    relays: {
        1: {
            pin: relayPins[0],
            name: ''
        },
        2: {
            pin: relayPins[1],
            name: ''
        },
        3: {
            pin: relayPins[2],
            name: ' '
        },
        4: {
            pin: relayPins[3],
            name: 'wax warmer'
        },
        5: {
            pin: relayPins[4],
            name: ''
        },
        6: {
            pin: relayPins[5],
            name: ''
        },
        7: {
            pin: relayPins[6],
            name: 'floor lamp'
        },
        8: {
            pin: relayPins[7],
            name: 'TV led'
        },
    },
    relayPins
}
module.exports = config;