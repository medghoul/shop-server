const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "fe44359c",
    apiSecret: "rojJMgjB4Kmpbj52"
})

module.exports = vonage;
