const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

MongoClient.connect(url, options, function(err, db) {
  if (err) throw err;
  const dbo = db.db('json_parse');
  fs.readFile(__dirname + '/vehicle.json', 'utf8', (err, data) => {
    if (err) throw err;
    dbo.collection('owners').insertMany(JSON.parse(data), function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
});

