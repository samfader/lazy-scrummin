/* 1. what are you working on? (comma separated, bullet points, etc.)
2. what emoji represents you today (:neutral_milk:)
3. how does this look? (y/n)
4. post to slack
*/

/* Instructions to install:

1) go here https://api.slack.com/apps/AAJV2MWG7/oauth?success=1
2) click Install to workspace
3) authorize to post as you in #support
4) copy token
5) create file called `.env` in root that contains one line: `SLACK_TOKEN='token'`
6) run it using `node index.js`
*/

/* TO do
- bug: @ support center not tagging supportcenter
- extra credit: auto complete emoji list
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

// get slack emoji list
// var data = null;
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
//
// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });
//
// xhr.open("GET", "https://slack.com/api/emoji.list?token=xoxp-2546826112-310995180102-320573456167-9d1060e1acdfa163a6f80611f96135ad&pretty=1");
// xhr.setRequestHeader("Cache-Control", "no-cache");
// xhr.setRequestHeader("Postman-Token", "c75bdfc9-8e10-2eb5-d616-e5867832df0f");
//
// xhr.send(data);

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

(async function interrogator(){
    const questions = [
        {
            type: 'list',
            name: 'todos',
            message: 'Hi there! 🤠 What are you working on today?',
        },
        {
            type: 'autocomplete',
            name: 'emoji',
            message: 'What is your emoji today?',
            choices: [
                { title: 'poop', value: ':poop:' },
                { title: 'sad_bread', value: ':sad_bread:' },
            ]
        }

    ];
    // Need to keep confirmation as an isolated object?
    const confirmation = [
      {
          type: 'confirm',
          name: 'confirmed',
          message: 'Does this look right to you?'
      }
    ];

    const answers = await prompts(questions);

    var i;
    var finalMessage = '';
    for (i=0; i < answers.todos.length; i++) {
      finalMessage += answers.emoji + " " + answers.todos[i] + "\n";
    }

    console.log(finalMessage);
    const allGood = await prompts(confirmation);

    if (allGood.confirmed) {
    // TO DO - change this to @supportcenter (turns out this is not possible?)
    sendMessage("<@UABKFKPDY> - here's my day today: \n" + finalMessage);
    } else {
    // restart function
    interrogator();
  };
})();
