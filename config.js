const relayPins = [16, 18, 22, 11, 13, 15, 19, 21];

const config = {
    relays: {
        1: relayPins[0],
        2: relayPins[1],
        3: relayPins[2],
        4: relayPins[3],
        5: relayPins[4],
        6: relayPins[5],
        7: relayPins[6],
        8: relayPins[7],
    },
    relayPins
}
module.exports = config;