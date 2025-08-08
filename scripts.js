// Example: Hardcoded post list (replace with dynamic fetching if using a backend)
const posts = [
    { title: "My First Post", url: "posts/post1.html", date: "2025-08-08" },
    // Add more posts here
];

const postList = document.getElementById("post-list");
posts.forEach(post => {
    const postLink = document.createElement("a");
    postLink.href = post.url;
    postLink.textContent = `${post.title} (${post.date})`;
    postList.appendChild(postLink);
});