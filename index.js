var express = require('express');
var app = express();

const competitionsUrl = 'http://api.football-data.org/v1/competitions?season=2017'

const cron = require('cron');

const loader = require('./loader');
const resources = require('./resources');

var competitions = []

loadAll()
scheduleDataUpdates()

function scheduleDataUpdates() {
    var cronJob = cron.job("0 */10 * * * *", function(){
        loadAll();
    });

    cronJob.start();
}

function loadAll() {
    downloadAndSave(competitionsUrl, 'eebe59492a314214b93ee1bf3dc30ba8', function(data) {

        competitions =  data

            var cronJobFixtures = cron.job("0 */1 * * * *", function() {
                for (var i=0; i<data.length; i++) {
                    var comp = competitions[i]
                    downloadAndSave(comp._links.fixtures.href, 'eebe59492a314214b93ee1bf3dc30ba8')
                }
            })

            var cronJobTeams = cron.job("0 */2 * * * *", function() {
                for (var i=0; i<competitions.length; i++) {
                    var comp = competitions[i]
                    downloadAndSave(comp._links.teams.href, 'eebe59492a314214b93ee1bf3dc30ba8', function(teamsData) {
                        for (var i=0; i<teamsData.teams.length; i++) {
                            var team = teamsData.teams[i]
                            downloadAndSave(team._links.players.href, 'bf4a43952c7540e2a427b68efea76f1b')
                        }
                    })
                }
            })

            var cronJobTables = cron.job("0 */3 * * * *", function() {
                for (var i=0; i<competitions.length; i++) {
                    var comp = competitions[i]
                    downloadAndSave(comp._links.leagueTable.href, 'eebe59492a314214b93ee1bf3dc30ba8')
                }
            })

            cronJobFixtures.start();
            cronJobTeams.start();
            cronJobTables.start()

    })
}

function downloadAndSave(url, token, callback) {
    loader.loadData(url, token, function (data, error) {

        var parts = url.split('v1');
        var lastSegment = parts.pop() || parts.pop();

        resources.saveResource(data, lastSegment.replaceAll("/", "_"), function (result) {
            console.log("Downloaded successfully from ", url)

            if (callback) {
                callback(data)
            }
        })
    })
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var server = app.listen(9090, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)

})

