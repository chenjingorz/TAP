// set up ======================================================================
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const busboy = require('connect-busboy');
const mongo = require('mongoose'); 				// mongoose for mongodb
const multer = require('multer');
const csv = require('csvtojson');
const res = require("express");

const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

global.__basedir = __dirname;

// configuration ===============================================================
const db = mongo.connect("mongodb://localhost:27017/local",
  function (err, response ) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to ' + db, '+ ', response);
    }
  }); 	// Connect to local MongoDB instance

const app = express(); 			// create our app w/ express
app.use(bodyParser());
app.use(fileUpload());
app.use(busboy());

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(function( req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if ('OPTIONS' == req.method){
    return res.send(200);
  }
  next();
})

// Schema ======================================================================
const Schema = mongo.Schema;
const EmployeeSchema = new Schema({
  id: {type: String},
  login:{type: String},
  name:{type: String},
  salary:{type: Number}
}, {versionKey: false});
const model = mongo.model('employees', EmployeeSchema, 'employee')

  // api ====================================================================
  // get users
  app.get('/users', function (req, res) {
    let minSalary = Number(req.query.minSalary);
    let maxSalary = Number(req.query.maxSalary);
    let offSet = req.query.offset;
    let limit = req.query.limit;
    let sortBy = req.query.sort.slice(1);
    let direction = req.url.includes('+')
    model.find({salary: {$gte: minSalary, $lte: maxSalary}}, function(err, data){
      if (err) {
        res.status(500).send({message: err});
      } else {
        // sort ascending or descending in terms of sortBy
        switch(sortBy) {
          case "name":
            if (req.url.includes('+')){
              data.sort((a, b) => a.name.localeCompare(b.name));
            } else {
              data.sort((a, b) => b.name.localeCompare(a.name));
            }
            break;

          case "id":
            if (req.url.includes('+')){
              data.sort((a, b) => a.id.localeCompare(b.id));
            } else {
              data.sort((a, b) => b.id.localeCompare(a.id));
            }
            break;

          case "login":
            if (req.url.includes('+')){
              data.sort((a, b) => a.login.localeCompare(b.login));
            } else {
              data.sort((a, b) => b.login.localeCompare(a.login));
            }
            break;
          default:
            if (req.url.includes('+')){
              data.sort((a, b) => parseFloat(a.salary) - parseFloat(b.salary));
            } else {
              data.sort((a, b) => parseFloat(b.salary) - parseFloat(a.salary));
            }
        }
        // then take the first 30
        let items = data.slice(0, limit)
        res.send(items);
      }
    })
  });

// upload csv
app.post("/users/upload",function(req,res){
  let result;
  importCsvData2MongoDB(__basedir + '/' + req.files.file.name);
  // res.sendStatus(200);
  res.send("200");
});

// methods ====================================================================
function importCsvData2MongoDB(filePath) {
  csv()
    .fromFile(filePath)
    .then((jsonObj)=>{
      console.log(jsonObj);
      // Insert Json-Object to MongoDB
      MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        let dbo = db.db("local");
        jsonObj.forEach( record =>
        {
          if (record.id.charAt(0) !== '#'){
            dbo.collection("employee")
              .findOneAndUpdate({id: {$eq: record.id}},
              {$set: {'login': record.login, 'salary': Number(record.salary), 'name': record.name}}, {upsert: true},
            function(err, data){
              if (err) throw err;})
           }})
      });
      fs.unlinkSync(filePath);
    })
}

// listen (start app with node server.js) ======================================
app.listen(8080, function (){
  console.log("App listening on port 8080!");
});

