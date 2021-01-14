const jsonfile =  require('jsonfile')

exports.getUsersData  =   function()
{
    return new Promise((resolve, reject) =>
    {
        jsonfile.readFile(__dirname + '/users.json', function(err, data) 
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

exports.wirteUser = function(addUser)
{
    return new Promise((resolve, reject) =>
    {
        jsonfile.writeFile(__dirname + '/users.json', addUser, (err) =>
        {
            if(err)
            {
                reject(err)  
            }
            else{
            resolve("success")
            }         
        });
    });
};