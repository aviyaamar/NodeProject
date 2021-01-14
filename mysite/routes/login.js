
var express = require('express');
var router = express.Router();
const usersBl =  require('../Models/usersDal')


let date = new Date()
let today = date.toLocaleDateString();

/* GET home page. */
router.get("/", function(req, res, next) {
  
  let sess = req.session

  if(!sess.date || sess.date != today)
  {
     sess.approve = false;
     sess.admin = false;
  }
  res.render('login', { title: 'Hello Login Page' });
});



router.post("/", async function(req, res, next) {

  let sess = req.session

    let usersList  = await usersBl.getUsersData()

    let admin = usersList[0];
    
    let filterUser = usersList.filter(item => (item.Username == req.body.username && item.Password == req.body.password))[0];

    if(!filterUser)
    {

      sess.approve = false
      sess.admin = false
      res.send("you are not reconazid")
    }
    else if(filterUser == admin)
    {
      sess.approve = true;
      sess.admin =true
      sess.NumOfTransaction = filterUser.NumOfTransactions
      res.render("menu", {title:" Admin Menu", data: "User Management", number: sess.NumOfTransactions, count: ""});
    }

    else
    {
      if(!sess.approve)
      {
        sess.approve = true;
        sess.NumOfTransaction = filterUser.NumOfTransactions;
        if(sess.NumOfTransactions <= 0)
        {

          res.send("Your login credentials have expired today")
        }
      }
    res.render("menu", {title:"Page Menu",  name: req.body.username, data: "" , number: sess.NumOfTransactions})
 }
});

module.exports = router;
