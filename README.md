<div align="center">
  <p>
    <a href="https://nodei.co/npm/@freitagfelipe/discord.js-pagination/">
      <img src="https://nodei.co/npm/@freitagfelipe/discord.js-pagination.png?downloads=true&stars=true" alt="NPM info" />
    </a>
  </p>
</div>

# @freitagfelipe/discord.js-pagination
- A simple way to send and paginate discord message embeds. Built on discord.js@^13.1.0.

> this module is inspired and with a large part of the code of [discord.js-pagination](https://github.com/saanuregh/discord.js-pagination)

### Instalation
- npm i @freitagfelipe/discord.js-pagination

### Usage

```js
const pagination = require("@freitagfelipe/discord.js-pagination");
const { MessageEmbed } = require("discord.js);
const pageOne = new MessageEmbed();
const endPage = new MessageEmbed();
const pages = [
    pageOne,
    ...,
    pageN
]

// Message and pages arguments are required
// emojiList default is equal to ['⏪', '⏩']
// timeout default is equal to 60000
// endPage default is equal to undefined, but if you want the message to change after the timeout you can pass an embed in endPage

pagination(message, pages, emojiList, timeout, endPage);
