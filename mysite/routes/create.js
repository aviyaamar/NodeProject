var express = require('express')
var router = express.Router();
const moviesDal = require('../Models/moviesDal');
const moviesRest = require('../Models/RestMovies');

router.get("/",  function(req, res, next) 
{
    let sess = req.session
    if(!sess.approve)
    {
        res.redirect("/login")
    }
    else{
    res.render("create", {title: "Create new Movie Page"})
 }
})


router.post("/newMovie", async function(req, res, next)
{
    let newId = 0;

    let movieArr = await moviesDal.readMovies()
    let lastDalId = LastID(movieArr);

    if(lastDalId > 0)
    {
        newId = ++lastDalId;
    }
    else
    {
        let allWS = await moviesRest.getData()
        let movieRestArr = allWS.getData;

        let lastRestID = LastID(movieRestArr);
        newId = ++lastRestID;

    }

    let genreInput = req.body.genres;
    let geners =  genreInput.split(", ");


    let newMovie = {
        id:newId, 
        name: req.body.moviename, 
        language: req.body.language,
        geners:geners , 
    };

    movieArr.push(newMovie);
    
    let result = await moviesDal.wirteNewMovie(movieArr);

    res.render("Success", {title: "OK", results: result})

});

function LastID(arr)
{
    let lastId = 0;
    
    if(arr[arr.length - 1])
    {
        lastId = arr[arr.length - 1].id;
    }

    return lastId;
}


module.exports = router;