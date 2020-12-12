// set up ======================================================================
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const mongo = require('mongoose'); 				// mongoose for mongodb
const fileUpload = require("express-fileupload");

const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

const csv = require('csvtojson');
const multer = require('multer');
global.__basedir = __dirname;

// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
  }
});
const upload = multer({storage:storage});

// const morgan = require('morgan');
// const methodOverride = require('method-override');

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
app.use(busboy());
app.use(fileUpload());

app.use(bodyParser.json()); // parse application/json
// app.use(morgan('dev'));  // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
// app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
// app.use(express.static('./src')); 		// set the static files location /public/img will be /img for users
app.use(function( req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
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
// methods ====================================================================
// function getEmployees(res) {
//   Employee.find(function (err, employees) {
//     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//     if (err) {
//       res.send(err);
//     }
//     res.json(employees); // return all todos in JSON format
//   });
// };

  // api ---------------------------------------------------------------------
  // get users
  app.get('/users', function (req, res) {
    console.log(req.query)
    console.log(req.url)
    console.log(req.url.includes('+'))
    let minSalary = Number(req.query.minSalary);
    let maxSalary = Number(req.query.maxSalary);
    let offSet = req.query.offset;
    let limit = req.query.limit;
    let sortBy = req.query.sort.slice(1);
    console.log(sortBy)
    // use mongoose to get all todos in the database
    model.find({salary: {$gte: minSalary, $lte: maxSalary}}, function(err, data){
      if (err) {
        res.send(err);
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
        console.log(items)
        res.send(items);
      }
    })
  });

// upload csv
// app.post('/users/upload', (req, res) =>{
//   req.pipe(req.busboy);
//   req.busboy.on('file', function (fieldname, file, filename) {
//     console.log("Uploading: " + filename);
//     const fstream = fs.createWriteStream(__dirname + '/files/' + filename);
//     file.pipe(fstream);
//     fstream.on('close', function () {
//       res.redirect('back');
//     });
//   });
// });
// -> Express Upload RestAPIs
// app.post('/users/upload', upload.single("uploadfile"), (req, res) =>{
//   importCsvData2MongoDB(__basedir + '/uploads/' + req.file.filename);
//   res.json({
//     'msg': 'File uploaded/import successfully!', 'file': req.file
//   });
// });
//
// // -> Import CSV File to MongoDB database
// function importCsvData2MongoDB(filePath){
//   csv()
//     .fromFile(filePath)
//     .then((jsonObj)=>{
//       console.log(jsonObj);
//       // Insert Json-Object to MongoDB
//       MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
//         if (err) throw err;
//         let dbo = db.db("local");
//         dbo.collection("employee").insertMany(jsonObj, (err, res) => {
//           if (err) throw err;
//           console.log("Number of documents inserted: " + res.insertedCount);
//           db.close();
//         });
//       });
//
//       fs.unlinkSync(filePath);
//     })
// }

// listen (start app with node server.js) ======================================
app.listen(8080, function (){
  console.log("App listening on port 8080!");
});

