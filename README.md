# Discord Webhook sending
Fork project of [Matthew Mulfinger](https://github.com/matthew1232/discord-webhook-node#readme)

Biggest changes are:

Error returns on Discord provided length violations.
The addField function now takes a Object Array like this [{'field1': 'First field', 'field2': 'Second Field', 'field3': true|false}] the function then uses the provided Array length to create the Fields.

[![GitHub license](https://img.shields.io/github/license/Bandaras213/discord-webhook-node)](https://github.com/Bandaras213/discord-webhook-node/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Bandaras213/discord-webhook-node)](https://github.com/Bandaras213/discord-webhook-node/issues)
![GitHub package.json version](https://img.shields.io/github/package-json/v/bandaras213/discord-webhook-node)
![npm](https://img.shields.io/npm/v/@bandaras213/discord-webhook-node)
![GitHub repo size](https://img.shields.io/github/repo-size/bandaras213/discord-webhook-node)




- [Installation](#installation)
- [Examples](#examples)
    - [Basic use](#basic-use)
    - [Custom embeds](#custom-embeds)
    - [Sending files](#sending-files)
    - [Preset messages](#preset-messages)
    - [Custom settings](#custom-settings)
- [Notes](#notes)
- [API](#api)
    - [Webhook](#webhook---class)
    - [MessageBuilder](#messagebuilder---class)
- [License](#license)

# Installation
```npm install @bandaras213/discord-webhook-node``` or ```yarn add @bandaras213/discord-webhook-node```

# Examples

## Basic use
```js
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("YOUR WEBHOOK URL");

const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
hook.setUsername('Discord Webhook Node Name');
hook.setAvatar(IMAGE_URL);

hook.send("Hello there!");
```

## Custom embeds
```js
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("YOUR WEBHOOK URL");
const fieldarr = [{'field1': 'First field', 'field2': 'Second Field', 'field3': true|false}, {'field1': 'First field', 'field2': 'Second Field', 'field3': true|false},{'field1': 'First field', 'field2': 'Second Field', 'field3': true|false}]

const embed = new MessageBuilder()
.setTitle('My title here')
.setAuthor('Author here', 'https://cdn.discordapp.com/embed/avatars/0.png', 'https://www.google.com')
.setURL('https://www.google.com')
.addField(fieldarr)
.setColor('#00b0f4')
.setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
.setDescription('Oh look a description :)')
.setImage('https://cdn.discordapp.com/embed/avatars/0.png')
.setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
.setTimestamp();

hook.send(embed);
```

Keep in mind that the custom embed method `setColor` takes in a decimal color/a hex color (pure black and white hex colors will be innacurate). You can convert hex colors to decimal using this website here: [https://convertingcolors.com](https://convertingcolors.com)

## Sending files
```js
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook('YOUR WEBHOOK URL');

hook.sendFile('../yourfilename.png');
```

## Preset messages
```js
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook('YOUR WEBHOOK URL');

//Sends an information message
hook.info('**Information hook**', 'Information field title here', 'Information field value here');

//Sends a success message
hook.success('**Success hook**', 'Success field title here', 'Success field value here');

//Sends an warning message
hook.warning('**Warning hook**', 'Warning field title here', 'Warning field value here');

//Sends an error message
hook.error('**Error hook**', 'Error field title here', 'Error field value here');
```

## Custom settings
```js
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook({
    url: "YOUR WEBHOOK URL",
    //If throwErrors is set to false, no errors will be thrown if there is an error sending
    throwErrors: false,
    //retryOnLimit gives you the option to not attempt to send the message again if rate limited
    retryOnLimit: false
});

hook.setUsername('Username'); //Overrides the default webhook username
hook.setAvatar('YOUR_AVATAR_URL'); //Overrides the default webhook avatar
```

# Notes
discord-webhook-node is a promise based library, which means you can use `.catch`, `.then`, and `await`, although if successful will not return any values. For example:

```js
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("YOUR WEBHOOK URL");

hook.send("Hello there!")
.then(() => console.log('Sent webhook successfully!'))
.catch(err => console.log(err.message));
```

or using async:
```js
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("YOUR WEBHOOK URL");

(async () => {
    try {
        await hook.send('Hello there!');
        console.log('Successfully sent webhook!');
    }
    catch(e){
        console.log(e.message);
    };
})();
```

By default, it will handle Discord's rate limiting, and if there is an error sending the message (other than rate limiting), an error will be thrown. You can change these options with the custom settings options below.

# API
## Webhook - class
Constructor
- options (optional) : object
    - throwErrors (optional) : boolean
    - retryOnLimit (optional) : boolean

Methods
- setUsername(username : string) returns this
- setAvatar(avatarURL : string (image url)) returns this
- async sendFile(filePath : string)
- async send(payload : string/MessageBuilder)
- async info(title : string, fieldName (optional) : string, fieldValue (optional) : string, inline (optional) : boolean)
- async success(title : string, fieldName (optional) : string, fieldValue (optional) : string, inline (optional) : boolean)
- async warning(title : string, fieldName (optional) : string, fieldValue (optional) : string, inline (optional) : boolean)
- async error(title : string, fieldName (optional) : string, fieldValue (optional) : string, inline (optional) : boolean)
- 
## MessageBuilder - class
Methods
- setText(text: string)
- setAuthor(author: string (text), authorImage (optional) : string (image url), authorUrl (optional) : string (link))
- setTitle(title: string)
- setURL(url: string)
- setThumbnail(thumbnail : string (image url))
- setImage(image : string (image url))
- setTimestamp(date (optional) number/date object)
- setColor(color : string/number (hex or decimal color))
- setDescription(description : string)
- addField(fieldName : string, fieldValue: string, inline (optional) : boolean)
- setFooter(footer : string, footerImage (optional) : string (image url))

# License

MIT
