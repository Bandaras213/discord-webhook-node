const {
    formatColor
} = require('../utils');

module.exports = class MessageBuilder {
    constructor() {
        this.payload = {
            embeds: [{
                fields: []
            }]
        };
    };

    getJSON() {
        return this.payload;
    };

    setText(text) {
        this.payload.content = text;

        return this;
    }

    setAuthor(author, authorImage, authorUrl) {
        if (!(author.length <= 256)) throw new Error(`Author length is to long. Provided length: ${author.length} Max length: 256`);

        this.payload.embeds[0].author = {};
        this.payload.embeds[0].author.name = author;
        this.payload.embeds[0].author.url = authorUrl;
        this.payload.embeds[0].author.icon_url = authorImage;

        return this;
    };

    setTitle(title) {
        if (!(title.length <= 256)) throw new Error(`Title length is to long. Provided length: ${title.length} Max length: 256`);

        this.payload.embeds[0].title = title;

        return this;
    };

    setURL(url) {
        this.payload.embeds[0].url = url;

        return this;
    };

    setThumbnail(thumbnail) {
        this.payload.embeds[0].thumbnail = {};
        this.payload.embeds[0].thumbnail.url = thumbnail;

        return this;
    };

    setImage(image) {
        this.payload.embeds[0].image = {};
        this.payload.embeds[0].image.url = image;

        return this;
    };

    setTimestamp(date) {
        if (date) {
            this.payload.embeds[0].timestamp = date;
        } else {
            this.payload.embeds[0].timestamp = new Date();
        };

        return this;
    };

    setColor(color) {
        this.payload.embeds[0].color = formatColor(color);

        return this;
    };

    setDescription(description) {
        if (!(description.length <= 4096)) throw new Error(`Description length is to long. Provided length: ${description.length} Max length: 4096`);

        this.payload.embeds[0].description = description;

        return this;
    };

    addField(fieldarr) {
        if (!(fieldarr.length <= 25 || fieldarr.length == 0)) throw new Error(`Fields Array must have at least 1 field and max 25 fields. Provided length: ${fieldarr.length}`);

        for (const field of fieldarr) {
            if (!(field[Object.keys(field)[0]].length <= 256)) throw new Error(`${field[Object.keys(field)[0]]} length is too long. Provided length: ${field[Object.keys(field)[0]].length} Max length: 256`);
            if (!(field[Object.keys(field)[1]].length <= 1024)) throw new Error(`${field[Object.keys(field)[1]]} length is too long. Provided length: ${field[Object.keys(field)[1]].length} Max length: 1024`);

            this.payload.embeds[0].fields.push({
                name: field[Object.keys(field)[0]],
                value: field[Object.keys(field)[1]],
                inline: field[Object.keys(field)[3]]
            });
        }

        return this;
    };

    setFooter(footer, footerImage) {
        if (!(footer.length <= 2048)) throw new Error(`Footer too long. Provided length: ${footer.length} Max length: 2048`);

        this.payload.embeds[0].footer = {};
        this.payload.embeds[0].footer.icon_url = footerImage;
        this.payload.embeds[0].footer.text = footer;

        return this;
    };
};