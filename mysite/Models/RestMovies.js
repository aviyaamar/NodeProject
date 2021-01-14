const axios = require('axios')

exports.getData = function()
{
    return axios.get('https://api.tvmaze.com/shows')
}


exports.getMoviesById = function (id)
 {
    return axios.get("https://api.tvmaze.com/shows" + id);
  };