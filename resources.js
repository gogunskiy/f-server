var fs = require('fs');
var axios = require('axios');

const dataSourceBaseUrl = 'http://api.football-data.org/v1/'

exports.loadResource = function(path, callback) {

    fs.readFile( __dirname + "/data/" + path + '.json', 'utf8', function (err, data) {
        if (typeof data === 'undefined' || !data) {
            console.error(err)
        }

        callback(data, err)
    });
};


exports.saveResource = function(data, path, callback) {

    var obj = JSON.stringify(data)

    if (typeof data === 'undefined' || !data || !obj) {
        callback(false)
        return
    }

    fs.writeFile(__dirname + "/data/" + path + ".json", obj);
    callback(true)
};



