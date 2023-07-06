// add comment to blogPost
const addComment =  async function(event) {
    event.preventDefault();
    const blogPostID = document.querySelector("#blogPostID").value;
    const commentText = document.querySelector("commentText");
    await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({
            blogPostID,
            body: commentText,
        }),
        headers: {"Contnet-Type": "application/json"}
    });
    document.location.reload()
};

document.querySelector("#newComment").addEventListener("submit", addComment);