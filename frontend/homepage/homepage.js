document.addEventListener("DOMContentLoaded", () => {
  // Center : latest post with user caption, likes, and users comments

  let postsFeed = document.querySelector("#postsFeed");

  const loadNewPosts = async () => {
    try {
      let res = await axios.get("http://localhost:3000/posts");
      res.data.body.forEach(post => {
        // console.log(post);
        // debugger
        let latestPostP = document.createElement("p");
        // post.body = res.data.body.body
        latestPostP.innerHTML = post.body;
        console.log(latestPostP)
        latestPostP.id = "latestPostP";
        postsFeed.appendChild(latestPostP);
        let timeP = document.createElement("p");
        timeP.id = "timeP";
        timeP.innerHTML = post.created_at;
        postsFeed.appendChild(timeP);
        let postId = post.id
        // console.log(postId)

        // console.log(latestPostP.value)

let likeBtn = document.createElement("button")
postsFeed.appendChild(likeBtn)
likeBtn.addEventListener("click", async () => {
  try {
let res = await axios.post(`http://localhost:3000/posts/${postId}`)
console.log(postId)

//how do i connect each post to button??? what can i put in as post_id 
  } catch (err) {
    console.log(err);
  }
})

      });
    } catch (err) {
      console.log(err);
    }


  };
  loadNewPosts();
});

// loadNewPosts();
