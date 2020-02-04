document.addEventListener("DOMContentLoaded", () => {
  // Center : latest post with user caption and users comments

  let postsFeed = document.querySelector("#postsFeed");

  const loadNewPosts = async () => {
    try {
      //   debugger;
      let res = await axios.get("http://localhost:3000/posts");
      res.data.body.forEach(post => {
        console.log(post);
        let latestPostP = document.createElement("p");
        latestPostP.id = "latestPostP"
        // post.body = res.data.body.body
        latestPostP.innerHTML = post.body;
        postsFeed.appendChild(latestPostP);
      });
    } catch (err) {
      console.log(err);
    }
  };
  loadNewPosts();
});

loadNewPosts();
