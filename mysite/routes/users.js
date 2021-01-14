var express = require('express');
var router = express.Router();
const usersDal =  require('../Models/usersDal')

/* GET users listing. */
router.get('/',  async function(req, res, next) {
  
  let sess = req.session

  if(!sess.approve || !sess.admin)
  {
    res.redirect("/login")
  }

  else{
  let allUsers =  await usersDal.getUsersData()

  res.render('users', { title: 'Users ManageMent Page', allUsers: allUsers });
 }
});



router.get("/add", async function(req, res, next) 
{
  res.render("userData", { title: "User Data Page", Username: "", Password:"", number:"", button:"Save"})
});



router.get("/add/:Username", async function(req, res, next)
{
  let allUsers = await usersDal.getUsersData()
  let user = allUsers.find((user) => user.Username == req.params.Username);

  res.render("userData", {title:"User Data Page", Username: user.Username, Password: user.Password, number: user.transaction, button: "Update"});
});



router.post("/update", async function(req, res, next)
{
  let newUser = {
    Username: req.params.Username, 
    Password: req.body.Password,
    CreatedDate:  new Date(), 
    NumOfTransactions: req.body.transaction, 
  };

  let allUsers = await usersDal.getUsersData();
 
  
  let thisUSer = allUsers.find((user) => user.Username == req.body.Username);

  if(thisUSer)
  {
    let deleteUser = allUsers.find((user) => user.Username == req.body.Username);

    let index = allUsers.indexOf(deleteUser);

    allUsers.splice(index,1 )
  };

  allUsers.push(newUser);
  
  let resultAdd = await usersDal.wirteUser(allUsers);

  res.render("Success", {title: "OK", results: resultAdd})
});



router.get("/delete/:username", async function(req, res, next)
{
  let allUsers = await usersDal.getUsersData();

  let deleteUser = allUsers.find((user) => user.Usernmae == req.params.Username);
  let index = allUsers.indexOf(deleteUser);

  allUsers.splice(index, 1);
  let resultsDelete = await usersDal.wirteUser(allUsers);

  res.render("Success", {title:"OK", results: resultsDelete})
})


module.exports = router;
