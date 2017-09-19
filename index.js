var express = require('express');
var app = express();
var fs = require('fs');
var axios = require('axios');

axios.defaults.headers.common['Authorization'] = ''

const dataSourceBaseUrl = 'http://api.football-data.org/v1/'
const competionsUrl = 'competitions?season=2017'
 

var cron = require('cron');
var cronJob = cron.job("0 */10 * * * *", function(){
                       axios.get(dataSourceBaseUrl + competionsUrl)
  .then(response => {
        
	var obj = JSON.stringify(response.data); 
        fs.writeFile(__dirname + "/data/" + competionsUrl + ".json", obj);
  })
  .catch(error => {
    console.log(error);
  });

                       }); 
cronJob.start();


app.get('/competitions', function (req, res) {
        fs.readFile( __dirname + "/data/" + competionsUrl + '.json', 'utf8', function (err, data) {
                    res.end( data );
                    });
        })

var server = app.listen(8080, function () {
                        
                        var host = server.address().address
                        var port = server.address().port
                        
                        console.log("Example app listening at http://%s:%s", host, port)
                        
                        })

