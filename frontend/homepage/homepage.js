document.addEventListener("DOMContentLoaded", () => {
  // Center : latest post with user caption, likes, and users comments

  let selectUsers = document.querySelector("select")

  const fetchAllUsers = async(user)=>{
    let userUrl = "http://localhost:3000/users/"
    try{
        let usersDb = await axios.get(userUrl)
        let users = usersDb.data.body
        users.forEach(user =>{
            let option = document.createElement("option")
            option.innerText = `${user.first_name} ${user.last_name}`
            option.value = user.id
            selectUsers.appendChild(option)
        })
    } catch (err){
        console.log(err)
    }
}
fetchAllUsers()

  let postsFeed = document.querySelector("#postsFeed");

  const loadNewPosts = async () => {
    try {
      let res = await axios.get("http://localhost:3000/posts");
      res.data.body.forEach(post => {
        let latestPostP = document.createElement("p");

        latestPostP.innerHTML = post.body;

        latestPostP.className = "latestPostP";
        postsFeed.appendChild(latestPostP);
        let timeP = document.createElement("p");
        timeP.className = "timeP";
        timeP.innerHTML = post.created_at;
        postsFeed.appendChild(timeP);
        latestPostP.postID = post.id;

        let likeBtn = document.createElement("img");
        let unliked = "https://cdn0.iconfinder.com/data/icons/healthcare-medicine/512/heart-512.png";

        let liked = "https://getdrawings.com/free-icon/love-icon-png-61.png";

        likeBtn.src = unliked;

        likeBtn.postId = post.id;
        postsFeed.appendChild(likeBtn);
        likeBtn.className = "likeBtn";

        likeBtn.addEventListener("click", async e => {
          try {
            let res = await axios.post(
              `http://localhost:3000/likes/posts/${e.target.postId}`
            );
            likeBtn.src = liked;
            // debugger
            // console.log(e.target.postId);
          } catch (err) {
            console.log(err);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  loadNewPosts();
});

// loadNewPosts();
