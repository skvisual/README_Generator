var fs = require('fs')
var axios = require('axios')
var inquirer = require('inquirer')
var util = require('util')
var appendFileAsync = util.promisify(fs.appendFile)

function makeLine(){
  inquirer
    .prompt([
      {
      type: 'list',
      message: 'Select the type of text',
      choices: ['Header', 'Plain Text'],
      name: 'textStyle',
    },  
  ]).then(function(answers){
    if (answers.textStyle === 'Header') {
      inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter Desired Text for Header:',
          name: 'headerText',
        },
      ]).then(function({headerText}) {
        appendFileAsync('README.md', '## '+ headerText + '\n')
        askNew()
      })} else {
        inquirer
        .prompt([
          {
            type: 'input',
            message: 'Enter Desired Plain Text:',
            name: 'plainText',
          },
        ]).then(function({plainText}) {
          appendFileAsync('README.md', plainText + '\n')
          askNew()
        });
      };
  });
};

function askNew(){
  inquirer
  .prompt([
    {
      type: 'confirm',
      message: 'Do you want to add another line?',
      name: 'confirmNew',
    },
  ]).then(function({confirmNew}) {
    if (confirmNew === true) {
      makeLine();
    } else {
      console.log('run next questions')
    }
  })
}

const questions = [
  {
    type: 'input',
    message: 'Enter your GitHub username:',
    name: 'username'
  },
  {
    type: 'input',
    message: 'Enter a project title:',
    name: 'projectName'
  },
  {
    type: 'input',
    message: 'Add a description of your project',
    name: 'projectDesc'
  },
  {
    type: 'confirm',
    message: 'Do you want to make a ToC now?',
    name: 'tableConfirm'
  },
];

inquirer
  .prompt(questions)
  .then(async function({ username, projectName, projectDesc, tableConfirm}) {
    //Define queryURL with const. use ${username}
    const queryURL = `https://api.github.com/users/${username}`;

    axios
    .get(queryURL) //use queryURL defined above
    .then(function(res) { //run function with the response data as a parameter
        // console.log(res);
        // console.log(res.data.avatar_url);
      
        // console.log(res.data.email);
    });
    // console.log(username)
    // console.log(projectName)

    //Append projectName to 'README.md' using fs method appendFile(), make large by using #? fs.appendFile('README.md', '#' + res.projectName, function(err){}); 
     await appendFileAsync('README.md', '# ' + projectName + `\n`)
     .then(function(){
      //  console.log('append success')
     }).catch(function(err){
       console.log(err)
     })
     
      //Append projectDesc to 'README.md' using fs method appendFile()
      await appendFileAsync('README.md', projectDesc + `\n`)
      .then(function(){
        // console.log('append desc success')
      }).catch(function(err){
        console.log(err)
      })
        //WHERE TABLE OF CONTENT GENERATION BEGINS
      if (tableConfirm === true) {
        await appendFileAsync('README.md', '# Table of Contents' + `\n`)
        makeLine()
      } else {
        console.log('questionsTWO()')
      }
  });

  // inquirer
  // .prompt(finishQuestions)
  // .then(async function({}) {
