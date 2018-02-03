const mongoClient = require('mongodb').MongoClient;

let db = null;
let dbConnectionString = 'mongodb://localhost:27017';
let dbName = 'coin-sms-alert';

exports.initialize = (done) => {
    if (db) return process.nextTick(done);

    console.log('Connecting to mongo database: ' + dbConnectionString);

    mongoClient.connect(dbConnectionString, (err, connectedDb) => {
        if (err) {
            console.log('Couldn\'t connect to mongo database', err);
            return done(err);
        }

        db = connectedDb.db(dbName);
        return done();
    });
};

exports.dispose = (done) => {
    if (db) {
        console.log('Closing connection to mongo database: ' + dbConnectionString);
        var tempDb = db;
        db = null;
        tempDb.close((err, result) => {
            if (err) {
                console.log('Error closing connection to mongo database', err);
                return done(err);
            }
            console.log('Database connection closed');
            return done();
        });
    } else {
        return process.nextTick(done);
    }
};

exports.getDb = () => {
    return db;
};

exports.alarms = () => {
    return db.collection('alarms');
};