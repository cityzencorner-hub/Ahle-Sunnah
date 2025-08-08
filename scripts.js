const posts = [
    { title: "My First Post", url: "post1.html", date: "2025-08-08" },
    // Add more posts here
];

fetch("posts.json")
    .then(response => response.json())
    .then(posts => {
        const postList = document.getElementById("post-list");
        posts.forEach(post => {
            const postLink = document.createElement("a");
            postLink.href = post.url;
            postLink.textContent = `${post.title} (${post.date})`;
            postList.appendChild(postLink);
        });
    });