/* 1. what are you working on? (comma separated, bullet points, etc.)
2. what emoji represents you today (:neutral_milk:)
3. how does this look? (y/n)
4. post to slack
*/

/* TO do
- message formatting
- show user how message looks and then offer confirmation before sending
- extra credit: auto complete emoji list
- extra credit: ability to cancel and rewrite list
*/
'use strict';

require('dotenv').config();

const { WebClient } = require('@slack/client');
const prompts = require('prompts');

// should be hidden const token = process.env.SLACK_TOKEN;
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'CAG0W969X';

// Takes a message from prompts, sends it to #support slack channel
function sendMessage(message) {
  // See: https://api.slack.com/methods/chat.postMessage
  // as_user sends message as authed user, not bot
  web.chat.postMessage({ channel: conversationId, text: message, as_user: true })
    .then((res) => {
      // `res` contains information about the posted message
      console.log('Message sent: ', res.ts);
    })
    .catch(console.error);
};

// example of prompts capabilities:
//      https://github.com/terkelg/prompts/blob/master/example.js

(async function(){
    const questions = [
        {
            type: 'list',
            name: 'todos',
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
    ];

    const answers = await prompts(questions);
    console.log(answers.emoji);
    console.log(answers.todos);
    var i;
    var finalMessage;
    for (i=0; i < answers.todos.length; i++) {
      finalMessage += answers.emoji + " " + answers.todos[i] + "\n";
    }
    console.log(finalMessage);
    console.log(answers);
    sendMessage(finalMessage);
})();
