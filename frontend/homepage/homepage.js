document.addEventListener("DOMContentLoaded", () => {
  // Center : latest post with user caption, likes, and users comments
<<<<<<< HEAD
  let selectUsers = document.querySelector("select");
  
=======

  let selectUsers = document.querySelector("select");

>>>>>>> 9fca279a8a8c7d64f82ad639c4ac0fcc09127421
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
<<<<<<< HEAD
  
  let postsFeed = document.querySelector("#postsFeed");
  let currentPosts = document.createElement("div")
  currentPosts.id = "currentPosts"
  postsFeed.appendChild(currentPosts)
  
  const createImgButton = (buttonClassName,)=>{
    let img = document.createElement("input")
    img.type="image"
    img.className = buttonClassName
    return img
  }
  const fetchLikes = async(userPost)=>{
    let numOfLike = 0;
    try {
        let likes = await axios.get(
        `http://localhost:3000/likes/posts/${userPost}`
        );
        likeNum = likes.data.body;
          numOfLike = likeNum.length
        } catch (err) {
          console.log(err);
        }
        return numOfLike;
  }
  const fetchComments = async(post) =>{
    try {
          let commentsData = await axios.get(`http://localhost:3000/comments/posts/${post}`);
          return commentsData.data.postComments
        } catch (err) {
          console.log(err);
        }
  }
  
  const fetchUserLikes = async (post,user) =>{
    try {
      let userlike = await axios.get(`http://localhost:3000/likes/${post}/${user}`);
      if(userlike.data.body.length){
        return true
      } else{
        return false
      }
    } catch (err) {
      console.log(err);
    }
  }
  const createSubmitForm = ()=>{
    let dataform = document.createElement("form")
    dataform.action = "submit"
    let textInput = document.createElement("input")
    textInput.type="text"
    textInput.name = "userText"
    textInput.placeholder = "Enter text here"
    textInput.id = "userText"
    textInput.required = true
    let submitInput = document.createElement("input")
    submitInput.type="submit"
    submitInput.value ="submit"
    dataform.appendChild(textInput)
    dataform.appendChild(submitInput)
    return dataform
  }
  let submitPost = createSubmitForm()
  submitPost.addEventListener("submit",async (e)=>{
    e.preventDefault()
    if(selectUsers.value==="Select User") return
    let postInfo = {
      author_id:selectUsers.value,
      body:submitPost.userText.value
    }
    try{
      await axios.post(`http://localhost:3000/posts/`,postInfo)
      loadNewPosts()
    }catch(err){
      console.log(err)
    }
  })
  postsFeed.prepend(submitPost);
  
  
  const createPost = async (userPost)=>{
    let latestPostP = document.createElement("div");
    let buttons = document.createElement("div");
    buttons.className = "postButtons"
    latestPostP.className = "latestPostP";
    latestPostP.id = userPost.id;
    currentPosts.appendChild(latestPostP);
    
    let h3 = document.createElement("h3");
    h3.innerText = userPost.body;
    latestPostP.appendChild(h3);
    let timeP = document.createElement("p");
    timeP.className = "timeP";
    timeP.innerHTML = userPost.created_at;
    latestPostP.appendChild(timeP);
    let likeBtn = createImgButton("likeBtn")
    let commentBtn = createImgButton("commentBtn")
    let numOfLike = document.createElement("p")
    let unlikePost = "https://www.onlygfx.com/wp-content/uploads/2016/05/hand-drawn-heart-4.png"
    let likePost = "https://www.onlygfx.com/wp-content/uploads/2016/05/hand-drawn-heart-1.png"
    commentBtn.src = "https://www.freeiconspng.com/uploads/speech-bubble-png-10.png";
    let postID = latestPostP.id
    let userLikes = await fetchUserLikes(postID,selectUsers.value)
    if(userLikes){
      likeBtn.src = likePost
    }else{
      likeBtn.src = unlikePost
    }
    numOfLike.innerText = await fetchLikes(postID)
    buttons.appendChild(likeBtn)
    buttons.appendChild(numOfLike)
    buttons.appendChild(commentBtn)
    latestPostP.appendChild(buttons)
    likeBtn.addEventListener("click", async(event) =>{
      let currentUser =selectUsers.value
      if(currentUser==="Select User"){
        return
      }
      
      let postId = event.target.parentNode.parentNode.id
      if (likeBtn.src === unlikePost){
        likeBtn.src = likePost
        let likeInfo = {liker_id:currentUser}
        try{
          await axios.post(`http://localhost:3000/likes/posts/${postId}`, likeInfo)
          numOfLike.innerText = Number(numOfLike.innerText)+1
          
        }catch(err){
          console.log(err)
        }
      } else if(likeBtn.src === likePost){
        likeBtn.src = unlikePost
        if(Number(numOfLike.innerText)){
          numOfLike.innerText = Number(numOfLike.innerText)-1
        }
        try{
          await axios.delete(`http://localhost:3000/likes/${postId}/${currentUser}`)
        }catch(err){
          console.log(err)
        }
      }
    })
    let comments = document.createElement("ul")
    comments.className = "comments"
    latestPostP.appendChild(comments)
    commentBtn.addEventListener("click", async (event)=>{
      comments.innerHTML =""
      let id = event.target.parentNode.parentNode.id
      let commentsList = await fetchComments(id)
      if(commentsList){
        commentsList.forEach(comment=>{
          let li =document.createElement("li")
          li.innerText = comment.body
          comments.appendChild(li)
        })
      }
      // commentBtn.addEventListener("click", (e)=>{
      //   e.preventDefault()
      //   comments.innerHTML =""
  
      // })
    })
    
    let submitComment = createSubmitForm()
    latestPostP.appendChild(submitComment)
    submitComment.addEventListener("submit",async(e)=>{
      e.preventDefault()
      let userComment = {commentBody:submitComment.userText.value}
      await axios.post(`http://localhost:3000/comments/posts/${postID}/${selectUsers.value}`,userComment)
      if(comments.innerHTML){
        let li = document.createElement("li")
        li.innerText = submitComment.userText.value
        comments.appendChild(li)
      }
      submitComment.reset()
    })
    
  }
  const loadNewPosts = async () => {
    currentPosts.innerHTML = ""
    try {
      let postsData = await axios.get("http://localhost:3000/posts");
      let postsList =postsData.data.body.reverse()
      postsList.forEach(post => {
        createPost(post)
=======

  let postsFeed = document.querySelector("#postsFeed");

  const loadNewPosts = async () => {
    try {
      let res = await axios.get("http://localhost:3000/posts");
      res.data.body.forEach(post => {
        let latestPostP = document.createElement("p");

        latestPostP.innerHTML = post.body;
        // let h3 = document.createElement("h3");
        // h3.innerText = option.innerText;
        // postsFeed.appendChild(h3);
        latestPostP.className = "latestPostP";
        postsFeed.appendChild(latestPostP);
        let timeP = document.createElement("p");
        timeP.className = "timeP";
        timeP.innerHTML = post.created_at;
        postsFeed.appendChild(timeP);
        latestPostP.postID = post.id;

        let likeBtn = document.createElement("img");
        let unliked =
          "https://www.onlygfx.com/wp-content/uploads/2016/05/hand-drawn-heart-4.png";
        // "https://cdn0.iconfinder.com/data/icons/healthcare-medicine/512/heart-512.png";

        let liked =
          "https://www.onlygfx.com/wp-content/uploads/2016/05/hand-drawn-heart-1.png";
        //"https://getdrawings.com/free-icon/love-icon-png-61.png";

        likeBtn.src = unliked;

        likeBtn.postId = post.id;
        likeBtn.className = "likeBtn";
        postsFeed.appendChild(likeBtn);

        let commentBtn = document.createElement("img");
        commentBtn.src =
          "https://www.freeiconspng.com/uploads/speech-bubble-png-10.png";
        commentBtn.className = "commentBtn";
        postsFeed.appendChild(commentBtn);

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
            let res = await axios.delete(
              `http://localhost:3000/likes/${e.target.postId}/${option.value}`
            );
            debugger;
            // console.log(option.innerText);
            likeBtn.src = unliked;
          } catch (err) {
            console.log(err);
          }
        });

        //comments
>>>>>>> 9fca279a8a8c7d64f82ad639c4ac0fcc09127421
      });
    } catch (err) {
      console.log(err);
    }
  };
<<<<<<< HEAD
  selectUsers.addEventListener("change",loadNewPosts)
});
=======
  loadNewPosts();
});

// loadNewPosts();
>>>>>>> 9fca279a8a8c7d64f82ad639c4ac0fcc09127421
