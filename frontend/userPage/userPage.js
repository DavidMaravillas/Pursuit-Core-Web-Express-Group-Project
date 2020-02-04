document.addEventListener("DOMContentLoaded", () => {
    // // logo/header
    // let header = document.querySelector("#logo");
    // let logoPic = document.querySelector("#logoPic");
  
    // nav bar/ table of contents
    let tableOfContents = document.querySelector("#tableOfContents");
    let tOCList = document.querySelector("#tOCList");
  
    // left side - user page : pic, name
    let leftSideDiv = document.querySelector("#leftSideDiv");
    let profileImg = document.querySelector("#profileImg");
    let profilePic = document.querySelector("#profilePic");
    let userName = document.querySelector("#userName");
    //albums and alum list
    let albumsSection = document.querySelector("#albumsSection");
    let userAlbumCollection = document.querySelector("#userAlbumCollection");
    let userAlbums = document.querySelector("#userAlbums");
    
    const listAlbums = async () => {
        try {
            let res = await axios.get("http://localhost:3000/users");
            let users = res.data.users:
            let ul = document.querySelector("ul");
            ul.innerHTML = "";
            users.forEach(user => {
                let li = document.createElement("li");
                li.innerText = user.name;
                ul.appendChild(li);
            })
                debugger;
        } catch (error) {
            console.log(error);
        }
    }
    
    listAlbums();    

    //about me section/ right
    let aboutMeDiv = document.querySelector("#aboutMe");
    let userNameAboutMe = document.querySelector("#userNameAboutMe");
    let userAge = document.querySelector("#userAge");
    let aboutStatement = document.querySelector("#aboutStatement");


  });