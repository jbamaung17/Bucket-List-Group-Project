const express = require("express");
const parser = require("body-parser");
const server = express();

server.use(parser.json());
server.use(express.static("client/build"));
server.use(parser.urlencoded({extended: true}));

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017", function(err, client) {
  if(err){
    console.log(err);
    return;
  }

  const db = client.db("bucket_listDB");

  console.log("Connected to the database");



  server.post("/api/countries", function(req, res){
    const countriesCollection = db.collection("countries");
    const countryToSave = req.body;

    countriesCollection.save(countryToSave, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      console.log("Save to the Database!");
      res.status(201);
      res.json(countryToSave);
    });
  });



  server.get("/api/countries", function(req, res){
    const countriesCollection = db.collection("countries");

    countriesCollection.find().toArray(function(err, allCountries){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(allCountries);
    });
  });


  server.delete("/api/countries", function(req, res){
    const countriesCollection = db.collection("countries");
    const filterObject = {};

    countriesCollection.deleteMany(filterObject, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });



  server.listen(3000, function(){
    console.log("Listening on port 3000!");
  });
});
