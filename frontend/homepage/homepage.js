document.addEventListener("DOMContentLoaded", () => {
  // Center : latest post with user caption, likes, and users comments

  let selectUsers = document.querySelector("select");

  const fetchAllUsers = async user => {
    let userUrl = "http://localhost:3000/users/";
    try {
      let usersDb = await axios.get(userUrl);
      let users = usersDb.data.body;
      users.forEach(user => {
        let option = document.createElement("option");
        option.className = "optionTag";
        option.innerText = `${user.first_name} ${user.last_name}`;
        option.value = user.id;
        selectUsers.appendChild(option);
      });
    } catch (err) {
      console.log(err);
    }
  };
  fetchAllUsers();

  let postsFeed = document.querySelector("#postsFeed");

  const loadNewPosts = async () => {
    try {
      let res = await axios.get("http://localhost:3000/posts");
      res.data.body.forEach(post => {
        let latestPostP = document.createElement("div");
        latestPostP.className = "latestPostP";
        postsFeed.appendChild(latestPostP);

        let h3 = document.createElement("h3");
        h3.innerText = post.body;
        latestPostP.appendChild(h3);
        let timeP = document.createElement("p");
        timeP.className = "timeP";
        timeP.innerHTML = post.created_at;
        latestPostP.appendChild(timeP);
        // latestPostP.postID = post.id;

        let likeBtn = document.createElement("img");
        let numlike = document.createElement("p");

        // const likes = async userPost => {
        //   let numOfLike = "";
        //   try {
        //     let likes = await axios.get(
        //       `http://localhost:3000/likes/posts/${userPost.id}`
        //     );
        //     debugger;
        //   } catch (err) {
        //     console.log(err);
        //   }
        //   return numOfLike;
        // };

        likes = axios.get(`http://localhost:3000/likes/posts/${userPost.id}`);

        numOfLike = likes.data.body.length;
        debugger;
        numlike.innerText = numOfLike;
        latestPostP.appendChild(numlike);
        let unliked =
          "https://www.onlygfx.com/wp-content/uploads/2016/05/hand-drawn-heart-4.png";
        // "https://cdn0.iconfinder.com/data/icons/healthcare-medicine/512/heart-512.png";

        let liked =
          "https://www.onlygfx.com/wp-content/uploads/2016/05/hand-drawn-heart-1.png";
        //"https://getdrawings.com/free-icon/love-icon-png-61.png";

        likeBtn.src = unliked;

        // likeBtn.postId = post.id;
        likeBtn.className = "likeBtn";
        latestPostP.appendChild(likeBtn);
        // debugger;

        let commentBtn = document.createElement("img");
        commentBtn.src =
          "https://www.freeiconspng.com/uploads/speech-bubble-png-10.png";
        commentBtn.className = "commentBtn";
        latestPostP.appendChild(commentBtn);

        likeBtn.addEventListener("dblclick", async e => {
          try {
            let res = await axios.post(
              `http://localhost:3000/likes/posts/${e.target.postId}`
            );
            likeBtn.src = liked;
          } catch (err) {
            console.log(err);
          }
        });

        likeBtn.addEventListener("click", async e => {
          let option = document.querySelector(".optionTag");
          try {
            // debugger;
            let res = await axios.delete(
              `http://localhost:3000/likes/${e.target.postId}/${option.value}`
            );
            // debugger;
            // console.log(option.innerText);
            likeBtn.src = unliked;
          } catch (err) {
            console.log(err);
          }
        });

        //comments
      });
    } catch (err) {
      console.log(err);
    }
  };
  loadNewPosts();
});

// loadNewPosts();
