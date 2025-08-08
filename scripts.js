fetch("posts.json")
    .then(response => response.json())
    .then(posts => {
        const postList = document.getElementById("post-list");
        posts.forEach(post => {
            const postLink = document.createElement("a");
            postLink.href = post.url;
            postLink.textContent = `${post.title} (${new Date(post.date).toDateString()})`;
            postList.appendChild(postLink);
        });
    })
    .catch(error => console.error("Error loading posts:", error));