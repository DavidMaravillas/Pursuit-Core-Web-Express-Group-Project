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
    
    let selectUsers = document.querySelector("#users");
    let userAlbums = document.querySelector("#userAlbums");
    let backButton = document.createElement("button");
    let ul = document.querySelector("#userAlbums");
    
    let user = "";

    const fetchAllUsers = async()=>{
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
    
    fetchAllUsers();
    
    
    selectUsers.addEventListener("change", (event) => {
        user = event.target.value;
        const listAlbums = async() => {
            try {
                let res = await axios.get("http://localhost:3000/albums/" + event.target.value);
                let albums = res.data.body;
                ul.innerText = "";
                albums.forEach(album => {
                    let li = document.createElement("li");
                    li.value = album.id;
                    li.innerText = album.album_name;
                    ul.appendChild(li);
                })
            //     ul.addEventListener("click", async(listEvent)=>{
            //         // console.log(listEvent.target.value);
            //         // debugger;
            //         try {
            //             ul.innerHTML = "";
            //             let res = await axios.get("http://localhost:3000/pictures/" + listEvent.target.value);
            //             let pictures = res.data.body;
            //             // console.log(pictures);
            //             // debugger;
            //             userAlbums.innerHTML = "";
            //             pictures.forEach(photos => {
            //                 // console.log(photos);
            //                 // debugger;
            //                 let img = document.createElement("img");
            //                 img.src = photos.picture;
            //                 userAlbums.appendChild(img);
            //             })
            //             backButton.innerText = "Back";
            //             userAlbums.appendChild(backButton);
            //         } catch(error) {
            //             console.log(error);
            //         };
                    
            //     })
            } catch (error) {
                console.log(error);
            }
        }

        
        listAlbums();    
        
        const userInfo = async() => {
            try {
                let res = await axios.get("http://localhost:3000/users/" + event.target.value);
                let info = res.data.body;
                let userName = document.querySelector("#userName");
                userName.innerHTML = info.first_name + " " + info.last_name;
                let userAge = document.querySelector("#userAge");
                userAge.innerHTML = info.age;
                let aboutStatement = document.querySelector("#aboutStatement");
                aboutStatement.innerHTML = info.about_statement;
            } catch (error) {
                console.log(error);
            }
        }
        
        userInfo();
        
    });


    ul.addEventListener("click", async(listEvent)=>{
        // console.log(listEvent.target.value);
        // debugger;
        try {
            ul.innerHTML = "";
            let res = await axios.get("http://localhost:3000/pictures/" + listEvent.target.value);
            let pictures = res.data.body;
            // console.log(pictures);
            // debugger;
            userAlbums.innerHTML = "";
            pictures.forEach(photos => {
                // console.log(photos);
                // debugger;
                let img = document.createElement("p");
                // img.src = photos.picture;
                img.innerText = photos.picture;
    // had to change img to p
                userAlbums.appendChild(img);
                let deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                deleteButton.value = photos.id;
                // console.log(deleteButton.value);
                // debugger;
                userAlbums.appendChild(deleteButton);
                deleteButton.addEventListener("click", async() => {
                    try {
                        // console.log(Number(deleteButton.value));
                        // debugger;
                        let res = await axios.delete("http://localhost:3000/pictures/" + Number(deleteButton.value));
            
                    } catch (error) {
                        console.log(error);
                    };
                });
            });
            backButton.innerText = "Back";
            userAlbums.appendChild(backButton);
        } catch(error) {
            console.log(error);
        };
    });

    
    backButton.addEventListener("click", async() => {
        try {
            let res = await axios.get("http://localhost:3000/albums/" + user);
            let albums = res.data.body;
            let ul = document.querySelector("#userAlbums");
            ul.innerText = "";
            albums.forEach(album => {
                let li = document.createElement("li");
                li.value = album.id;
                li.innerText = album.album_name;
                ul.appendChild(li);
            });
        } catch(error) {
            console.log(error);
        };
    });

    // deleteButton.addEventListener("click", async() => {
    //     try {
    //         console.log(deleteButton.value);
    //         // debugger;
    //         let res = await axios.delete("http://localhost:/3000/pictures/" + Number(deleteButton.value));

    //     } catch (error) {
    //         console.log(error);
    //     };
    // });

    // addPicture.addEventListener("click", async() => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     };
    // });

    //about me section/ right
    let aboutMeDiv = document.querySelector("#aboutMe");
    let userNameAboutMe = document.querySelector("#userNameAboutMe");
    
    
});

