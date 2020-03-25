var fs = require('fs')
var axios = require('axios')
var inquirer = require('inquirer')
const apikey = '4efea0fa4c2aad2d02260be69fb7ed026869eec6'
// var username = "username"

// const questions = [

// ];

inquirer
  .prompt([
    {
      message: 'Enter your GitHub username:',
      name: 'username'
    },
    {
      message: 'Enter a project title:',
      name: 'projectName'
    },
    {
      message: 'Add a description of your project',
      name: 'projectDesc'
    },
  ])
  .then(function({ username, projectName, projectDesc }) {
    console.log(username)
    console.log(projectName)
    //Append [rojectName to 'README.md' using fs method appendFile(), make large by using #? fs.appendFile('README.md', '#' + res.projectName, function(err){}); 
    fs.appendFile('README.md', '# ' + projectName + `\n`, function(err){
      if (err) {
        console.log('error')
      }else
        console.log('success')
    });
    console.log(projectDesc) 
    //Append projectDesc to 'README.md' using fs method appendFile()
    fs.appendFile('README.md', projectDesc + `\n`, function(err){
      if (err) {
        console.log('error')
      }else
        console.log('success')
    });
    //Define queryURL with const. use ${username} and ${apikey} to dynamically insert values to API URL.
    const queryURL = `https://api.github.com/users/${username}/repos?per_page=100?apikey=${apikey}`;

    axios
    .get(queryURL) //use queryURL defined above
    .then(function(res) { //run function with the response data as a parameter
        console.log(res);
        // console.log(res.data[0].owner.avatar_url); //this logs the url of GitHub profile picture. HOW TO USE AS AN IMG?
       
    
    })
  });



    // fs.appendFile('README.md', res.username, function(err){}); //this will create README.md and append the username value inside
    // console.log(res)

 


// axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
// .then(function(res){
//     fs.appendFile('readme.md', res.data[0].name, function(err){
//         if (err){
//         console.log(err)
//         }
//     })

//     console.log(res.data[0].name)

// })

// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();
