/* 1. what are you working on? (comma separated, bullet points, etc.)
2. what emoji represents you today (:neutral_milk:)
3. how does this look? (y/n)
4. post to slack
*/
'use strict';

var Slack = require('slack-api');
var inquirer = require('inquirer');

// take input from user
var questions = [
  {
    type: 'input',
    name: 'day_summary',
    message: "🤠 Good morning! What are you working on today?"
  }
];

inquirer.prompt(questions).then(answers => {
  console.log(day_summary);
});

Slack.api.test({}, function (error, data) {
  console.log(data);
});


// https://github.com/ustice/slack-api
