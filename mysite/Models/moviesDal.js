const jsonfile = require('jsonfile')

exports.readMovies = async function()
{
    return new Promise((resolve, reject)=>
    {
        jsonfile.readFile(__dirname + '/newMovie.json', (err, data)=>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}
exports.wirteNewMovie = async function(addMovie)
{
    return new Promise((resolve, reject)=>
    {
        jsonfile.writeFile(__dirname + '/newMovie.json', addMovie, (err)=>
        {
            if(err)
            {
                reject(err)

            }
            else
            {
                resolve("success")
            }
        })

    })
}

