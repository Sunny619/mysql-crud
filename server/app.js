const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
//const promMid = require('express-prometheus-middleware');

const dbService = require('./dbService');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'html')
app.use(express.static('../client'));
const hostname = '127.0.0.1';
const port = 3000;


app.get('/', (req, res) => {s
  res.sendFile('index.html')
});
app.post('/insert', (req, res) => {
  const { email, name, hobby } = req.body
    const db = dbService.getDbServiceInstance();
    const result = db.insertRow(req.body);
    result
      .then(data => res.json({ data: data }))
      .catch(err => console.log(err));
  });
//read
app.get('/getAll', (req, res) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllData();
  result
    .then(data => res.json({ data: data }))
    .catch(err => console.log(err));
})
//update
app.put('/modify', (req, res) => {

  const { val } = req.body
  console.log(val)
  if (val == '') {
    res.json({ data: 0 });
  }
  else {
    const db = dbService.getDbServiceInstance();
    const result = db.ModifyRow(req.body);
    result
      .then(data => res.json({ data: data }))
      .catch(err => console.log(err));
  }
})

//delete
app.delete('/delete', (req, res) => {
  console.log(req.body);
  const { email } = req.body
  //console.log(date);
  const db = dbService.getDbServiceInstance();
  const result = db.deleteRow(email);
  result
    .then(data => res.json({ data: data }))
    .catch(err => console.log(err));
})

//
app.post('/searchByName', (req, res) => {
  //console.log(req.body);
  const { val } = req.body
  //console.log(date);
  const db = dbService.getDbServiceInstance();
  const result = db.searchByName(val);
  result
    .then(data => res.json({ data: data }))
    .catch(err => console.log(err));
})
app.post('/searchByHobby', (req, res) => {
  //console.log(req.body);
  const { val } = req.body
  //console.log(date);
  const db = dbService.getDbServiceInstance();
  const result = db.searchByHobby(val);
  result
    .then(data => res.json({ data: data }))
    .catch(err => console.log(err));
})

app.listen(port, () => console.log('App is running'));