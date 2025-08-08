const fs = require("fs");
const axios = require("axios");
const xml2js = require("xml2js");

async function importRss() {
    const response = await axios.get("https://alsunnahalislam.blogspot.com/feeds/posts/default");
    const parser = new xml2js.Parser();
    parser.parseString(response.data, (err, result) => {
        const posts = result.feed.entry;
        posts.forEach(post => {
            const title = post.title[0]._;
            const content = post.content[0]._;
            const date = post.published[0];
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const html = `...`; // Same HTML template as above
            fs.writeFileSync(`posts/${slug}.html`, html);
        });
        // Update posts.json for homepage
        const postList = posts.map(post => ({
            title: post.title[0]._,
            url: `posts/${post.title[0]._.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.html`,
            date: post.published[0]
        }));
        fs.writeFileSync("posts.json", JSON.stringify(postList));
    });
}

importRss();