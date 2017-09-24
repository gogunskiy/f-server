var express = require('express');
var app = express();

const resources = require('./resources');

app.get('/competitions', function (req, res) {
    
    resources.loadResource("_competitions?season=2017", function (data, error) {
        if (typeof data === 'undefined' || !data) {
            res.end( error );
        } else {
            res.end( data );
        }
    })
})

app.get('/competitions/:id/teams', function (req, res) {

    var id = req.params.id;

    resources.loadResource("_competitions_" + id + "_teams", function (data, error) {
        if (typeof data === 'undefined' || !data) {
            res.end( error );
        } else {
            res.end( data );
        }
    })
})

app.get('/teams/:id/players', function (req, res) {

    var id = req.params.id;

    resources.loadResource("_teams_" + id + "_players", function (data, error) {
        if (typeof data === 'undefined' || !data) {
            res.end( error );
        } else {
            res.end( data );
        }
    })
})

app.get('/competitions/:id/fixtures', function (req, res) {

    var id = req.params.id;

    resources.loadResource("_competitions_" + id + "_fixtures", function (data, error) {
        if (typeof data === 'undefined' || !data) {
            res.end( error );
        } else {
            res.end( data );
        }
    })
})


app.get('/competitions/:id/leagueTable', function (req, res) {

    var id = req.params.id;

    resources.loadResource("_competitions_" + id + "_leagueTable", function (data, error) {
        if (typeof data === 'undefined' || !data) {
            res.end( error );
        } else {
            res.end( data );
        }
    })
})


var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)

})

