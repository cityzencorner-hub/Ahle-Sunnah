const fs = require("fs");
const xml2js = require("xml2js");

const parser = new xml2js.Parser();
fs.readFile("blogger_backup.xml", (err, data) => {
    parser.parseString(data, (err, result) => {
        const posts = result.feed.entry.filter(entry => entry["app:control"]?.[0]["app:draft"]?.[0] !== "yes");
        posts.forEach(post => {
            const title = post.title[0]._;
            const content = post.content[0]._;
            const date = post.published[0];
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>My Blog</h1>
        <a href="index.html">Back to Home</a>
    </header>
    <main>
        <article>
            <h2>${title}</h2>
            <p><time datetime="${date}">${new Date(date).toDateString()}</time></p>
            <p>${content}</p>
        </article>
    </main>
</body>
</html>`;
            fs.writeFileSync(`posts/${slug}.html`, html);
        });
    });
});