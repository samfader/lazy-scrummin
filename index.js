/* 1. what are you working on? (comma separated, bullet points, etc.)
2. what emoji represents you today (:neutral_milk:)
3. how does this look? (y/n)
4. post to slack
*/
'use strict';

var Slack = require('slack-api');
var inquirer = require('inquirer');
const prompts = require('prompts');

// example to work off of: https://github.com/terkelg/prompts/blob/master/example.js

(async function(){
    const questions = [
        {
            type: 'list',
            name: 'to-dos',
            message: 'Hi there! 🤠 What are you working on today?',
        },
        {
            type: 'text',
            name: 'emoji',
            message: `What is your emoji today?`,
            format: v => `:${v}:`
            // TO DO: autocomplete (see last option) with slack emojis
        },
        {
            type: 'confirm',
            name: 'confirmed',
            message: 'Can you confirm?'
        }
        // {
        //     type: 'invisible',
        //     name: 'password',
        //     message: `Enter password`
        // },
        // {
        //     type: prev => prev && 'toggle',
        //     name: 'confirmtoggle',
        //     message: 'Can you confirm again?',
        //     active: 'yes',
        //     inactive: 'no'
        // },
        // {
        //     type: 'list',
        //     name: 'keywords',
        //     message: 'Enter keywords'
        // },
        // {
        //     type: 'select',
        //     name: 'color',
        //     message: 'Pick a color',
        //     choices: [
        //       { title: 'Red', value: '#ff0000' },
        //       { title: 'Green', value: '#00ff00' },
        //       { title: 'Blue', value: '#0000ff' }
        //     ]
        // },
        // {
        //     type: 'multiselect',
        //     name: 'multicolor',
        //     message: 'Pick colors',
        //     choices: [
        //         { title: 'Red', value: '#ff0000' },
        //         { title: 'Green', value: '#00ff00' },
        //         { title: 'Blue', value: '#0000ff' }
        //     ]
        // },
        // {
        //     type: 'autocomplete',
        //     name: 'value',
        //     message: 'Pick your favorite actor',
        //     initial: 1,
        //     choices: [
        //         { title: 'Cage' },
        //         { title: 'Clooney', value: 'silver-fox' },
        //         { title: 'Gyllenhaal' },
        //         { title: 'Gibson' },
        //         { title: 'Grant' },
        //     ]
        // }
    ];

    const answers = await prompts(questions);
    console.log(answers);

})();

Slack.api.test({}, function (error, data) {
  console.log(data);
});


// https://github.com/ustice/slack-api
