var fs = require('fs');
var axios = require('axios');


exports.loadData = function(url, authToken, callback) {

    var config = {
        headers: {'X-Auth-Token': authToken}
    }

    axios.get(url, config)
        .then(response => {
             if (typeof response.data === 'undefined' || !response.data) {
                 console.error(error)
             }
              callback(response.data, null)
})
.catch(error => {
        callback(null, error)

});
};
