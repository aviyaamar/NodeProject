
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  let sess = req.session;
  if(!sess.approve)
  {
    res.redirect("/login")
  }

  else
  {
    if(!sess.admin)
    {
      if(sess.NumOfTransactions <= 0) 
      {
        res.send("Your login credentials have expired today")
      } 
      else
       {
        res.render("menu", {title: "Mneu", data: "", number: sess.NumOfTransactions})
      }
    }
    else
    {
      res.render('menu', { title:'Admin Menu', data:"User Management", number: sess.NumOfTransactions });
    }
  }

  });
  


router.post('/getoption', function(req, res, next) {
    
    if (req.body.actions == "Create A movie"){
      res.redirect("/create");
    }
   else if (req.body.actions == "Search for movies"){
      res.redirect("/search");
    }else{
      res.redirect("/users");
    }
  });
  
module.exports = router;