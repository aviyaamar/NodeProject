var express = require('express');
var router = express.Router();
const moviesDal = require('../Models/moviesDal');
const moviesRest = require('../Models/RestMovies');


router.get("/",  function(req, res, next) 
{

  let sess = req.session
  
  if(!sess.approve)
  {
    res.redirect("/menu")

  }

    res.render("search", {title: "Search Movie Page"})
});

let allMovies = [];

router.post('/find-data', async function(req, res, next)
{

  let DalMovies =  await moviesDal.readMovies();
  let RestMovies = await moviesRest.getData();
  let RestMoviesData = RestMovies.data
  
  let searchedMovies  = RestMoviesData.concat(DalMovies)

  allMovies = searchedMovies;

  let sameGenres = [];
  let concatGenres = [];

  searchedMovies = req.body.moviename ? searchedMovies.filter((item) => item.name.indexOf(req.body.moviename) > -1 ) : searchedMovies;
  searchedMovies = req.body.language ? searchedMovies.filter((item) => item.language == req.body.language) : searchedMovies;
  searchedMovies = req.body.genre ? searchedMovies.filter(item => item.genres.indexOf(req.body.genre) > -1) : searchedMovies;

    if (!req.body.genre)
    {
        // Finding movies of same genre of searchedMovies
        searchedMovies.map(searchedMovie => 
        {
            searchedMovie.genres.forEach(genre => 
            {
                concatGenres = sameGenres.concat(allMovies.filter(item => item.genres.indexOf(genre) > -1))
            })
        });
    }

  if(searchedMovies[0])
  {
    res.render("searchResult", {title: req.body.moviename , movies: searchedMovies, sameGenres: concatGenres});
  }
  else
  {

    res.render("NoResult", {title: "Movie was not found in archive"});
  };
});


router.get("/moviedata/:id" , async function(req, res, next) 
{
  let sess = req.session

  if(!sess.admin)
  {
    if(sess.NumOfTransactions <= 0)
    {
      res.send("Your login credentials have expired today")
    }

    --sess.NumOfTransactions
  }

  let [movieData] = allMovies.filter((item) => item.id == req.params.id);
  let { name, language, genres, image } = movieData;
  res.render("moviedata", { id: req.params.id,  title: name, language: language, genres: genres, image: image ? image.medium : 0,
  });
});



module.exports = router;