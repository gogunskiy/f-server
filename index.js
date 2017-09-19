var falcorExpress = require('falcor-express');
var Router = require('falcor-router');
var express = require('express');
var Library = require('./champs_db.json');
var app = express();

app.use('/champs.json', falcorExpress.dataSourceRoute(function (req, res) {
  return new Router([
    {
      route: "champs",
      get: function() {
        return {path:["champs"], value: JSON.stringify(Library) };
      }
    },
    {
      route: "camps.title",
      get: function() {
        return {path:["champs","title"], value: Library.map( champ => champ.title )};
      }
    }
  ]);
}));

app.use(express.static(__dirname + '/'));

var server = app.listen(process.env.PORT || 1337);
