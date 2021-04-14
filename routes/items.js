var express = require('express');
var router = express.Router();
var db = require('../mock/db.json');
const fs = require('fs')

/* GET items listing. */
router.get('/', function(req, res, next) {
  let existUsers = getUserData();
  res.json(existUsers);
});

// POST new Entry
router.post('/', async (req, res, next) =>{
  console.log('here inserting new entry', req.body);
  let existUsers = getUserData();
  console.log(existUsers);
  try {
    const { value } = req.body;
    console.log(value);
    existUsers.push({'value':value});
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
  } catch (e) {
    return next(e)
  }
})

//read the user data from json file
const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync('mock/db.json', stringifyData)
}

const getUserData = () => {
  const jsonData = fs.readFileSync('mock/db.json')
  return JSON.parse(jsonData)    
}

module.exports = router;
