const fs = require("fs").promises;
const axios = require("axios");
const xml2js = require("xml2js");

async function importBloggerPosts() {
    try {
        // Replace with your Blogger RSS feed URL
        const response = await axios.get("https://alsunnahalislam.blogspot.com/feeds/posts/default");
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(response.data);
        const posts = result.feed.entry || [];

        // Generate HTML files for each post
        for (const post of posts) {
            const title = post.title[0]._;
            const content = post.content[0]._;
            const date = post.published[0];
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>My Blog</h1>
        <a href="../index.html">Back to Home</a>
    </header>
    <main>
        <article>
            <h2>${title}</h2>
            <p><time datetime="${date}">${new Date(date).toDateString()}</time></p>
            <div>${content}</div>
        </article>
    </main>
</body>
</html>`;
            await fs.writeFile(`posts/${slug}.html`, html);
        }

        // Generate posts.json for homepage
        const postList = posts.map(post => ({
            title: post.title[0]._,
            url: `posts/${post.title[0]._.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.html`,
            date: post.published[0]
        }));
        await fs.writeFile("posts.json", JSON.stringify(postList, null, 2));
    } catch (error) {
        console.error("Error importing posts:", error);
    }
}

importBloggerPosts();