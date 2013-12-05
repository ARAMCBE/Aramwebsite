var pg = require('pg');


var conString = process.env.HEROKU_POSTGRESQL_COPPER_URL || "postgres://aram:arampass@localhost/aramwebsite";

module.exports = {
   query: function(text, values, cb) {
      pg.connect(conString, function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          cb(err, result);
        });
      });
   }
}