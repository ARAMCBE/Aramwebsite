var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL || "postgres://aram:arampass@localhost/aramwebsite"
  , client
  , query;

console.log("Connection String : ----> ", connectionString);

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE user_details (firstname varchar, lastname  varchar, email varchar(40), password varchar, mobile varchar(12), dob Date, country varchar(40), state varchar(40), city varchar(50), address varchar, pincode integer, gender varchar(10), CONSTRAINT email_primary_key PRIMARY KEY(email), CONSTRAINT mobile_unique_key UNIQUE(mobile))');
query.on('end', function() { client.end(); });

