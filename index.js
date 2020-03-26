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

function askNew() {
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
      installHeader();
    };
  });
}

function usage(){
  inquirer
  .prompt([
    {
      type: 'confirm',
      message: 'Do you want to add a Usage HEADER?',
      name: 'confirmUsage',
    },
  ]).then(function({confirmUsage}) {
    if (confirmUsage === true) {
      appendFileAsync('README.md', '# Usage' + '\n')
      license()
    } else {
      license()
    };
  });
}

function license(){
  inquirer
  .prompt([
    {
      type: 'confirm',
      message: 'Do you want to add a License HEADER?',
      name: 'confirmLicense',
    },
  ]).then(function({confirmLicense}) {
    if (confirmLicense === true) {
      appendFileAsync('README.md', '# License' + '\n')
      contributing()
    } else {
      contributing()
    };
  });
};

function contributing(){
  inquirer
  .prompt([
    {
      type: 'confirm',
      message: 'Do you want to add a Contributing HEADER?',
      name: 'confirmContributing',
    },
  ]).then(function({confirmContributing}) {
    if (confirmContributing === true) {
      appendFileAsync('README.md', '# Contributing' + '\n')
      tests()
    } else {
      tests()
    };
  });

}

function tests(){
  inquirer
  .prompt([
    {
      type: 'confirm',
      message: 'Do you want to add a Tests HEADER?',
      name: 'confirmtests',
    },
  ]).then(function({confirmtests}) {
    if (confirmtests === true) {
      appendFileAsync('README.md', '# Tests' + '\n')
      query()
    } else {
      query()
    };
  });

}

function query(){
  inquirer
  .prompt([
    {
      type: 'confirm',
      message: 'Do you want to add a Contact HEADER?',
      name: 'confirmQuery',
    },
  ]).then(function({confirmQuery}) {
    if (confirmQuery === true) {
      appendFileAsync('README.md', '# Contact' + '\n')
      contactInfo()
    } else {
      contactInfo()
    };
  });

}


// var pictureURL = res.data.avatar_url

//make a picture var that is = the api value

function contactInfo(){
  inquirer
  .prompt([
    {
      type: 'confirm',
      message: 'Do you want to add your GitHub Picture and E-mail?',
      name: 'confirmContactInfo',
    },
    
  ]).then(function({confirmContactInfo}) {
    if (confirmContactInfo){
      inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter your GitHub username:',
          name: 'username'
        },
      ]).then(function({username}){
        const queryURL = `https://api.github.com/users/${username}`;

        axios
        .get(queryURL)
        .then(async function(res) { 
            await appendFileAsync('README.md', `![Image description](${res.data.avatar_url})  \n`)
            await appendFileAsync('README.md', 'GitHub E-mail: ' + res.data.email)
          
       })

      })
        
    }
    
  });

}

function installHeader(){
  inquirer
  .prompt([
    {
      type: 'confirm',
      message: 'Do you want to add an Installation HEADER?',
      name: 'installConfirm',
    },
  ]).then(function({installConfirm}) {
    if (installConfirm === true) {
      appendFileAsync('README.md', '## Installation' + `\n`)
      usage()
    } else {
      usage()
    }
  })
}
  

const questions = [
  
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
    message: 'Do you want to make a Table of Contents?',
    name: 'tableConfirm'
  },
];

inquirer
  .prompt(questions)
  .then(async function({ projectName, projectDesc, tableConfirm }) {

       
     await appendFileAsync('README.md', '# ' + projectName + `\n`)
     .then(function(){
      //  console.log('append success')
     }).catch(function(err){
       console.log(err)
     })
      await appendFileAsync('README.md', projectDesc + `\n`)
      .then(function(){
      }).catch(function(err){
        console.log(err)
      })
        //TABLE OF CONTENT GENERATION
      if (tableConfirm === true) {
        await appendFileAsync('README.md', '# Table of Contents' + `\n`)
        makeLine();
      } else {
        installHeader();
      }
      
      
        
        
     
  });
      
      


      

