var connection = null;
exports.connectToDatabase = function(client) {
    var dbName = databaseForClient(client);
    // previous connection?
    if (connection) {
        // same database?
        if (currentClient == client) { console.log("Re-using the same connection to "+client); return; } // previous connection open
        else {
            connection.close(function () {  // different connection, purgue it.
                console.log("Cleared different previous connection");
            });
        }
    }
    var db = mongoose.createConnection('mongodb://localhost/' + dbName, {server: { poolSize: 5 }} );
    console.log("Created new connection to "+client);
    currentClient = client;
    connection = db;
    defineCompanyDatabaseSchemas(db);
}

process.on('exit', function () {close (connection )});
process.on('SINGINT', function () {close(connection); });