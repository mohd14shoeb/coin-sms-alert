const _ = require('underscore');

const coinDataRepo = require('../dataAccess/repos/coinDataRepository');
const alarmRepo = require('../dataAccess/repos/alarmRepository');
const Alarm = require('../models/alarm');

exports.configure = (app) => {

    app.get('/api/coins', getCoinData);

};

function getCoinData(req, res, done) {

    coinDataRepo.getCoinData((err, coinsData) => {

        alarmRepo.getAlarms((err, alarms) => {

            alarms.forEach((alarm) => {

                let latestCoinData = _.findWhere(coinsData, {id: alarm.coinId});

                if (latestCoinData && alarm.isTriggered(latestCoinData)) {
                    console.log(`* ALARM * ${alarm.coinId}: $${latestCoinData.price_usd} is ${ alarm.thresholdDirection} threshold $${alarm.priceUsdThreshold}`);
                }
                
            });

            res.json(coinsData);
        });

    });

}