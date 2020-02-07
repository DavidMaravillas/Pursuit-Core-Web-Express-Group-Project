document.addEventListener("DOMContentLoaded", () => {
    let albumsSection = document.querySelector("#albumsSection");
    let user = "";
    let album = "";
    let selectUsers = document.querySelector("#users");
    let ul = document.createElement("ul");
   
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
    
    const listAlbums = async(user) => {

        try {
            let res = await axios.get("http://localhost:3000/albums/" + user);
            let albums = res.data.body;
            ul.innerText = "";
            albumsSection.innerHTML = "";
            albums.forEach(album => {
                let li = document.createElement("li");
                li.value = album.id;
                li.innerText = album.album_name;
                ul.appendChild(li);
            });
        albumsSection.appendChild(ul);   
        } catch (error) {
            console.log(error);
        }
    }
    
    selectUsers.addEventListener("change", (event) => {
        user = event.target.value;
        listAlbums(user);    
        
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

    let addButton = document.createElement("button");
    let backButton = document.createElement("button");
    let pictureInput = document.createElement("input");
    let addButtonDiv = document.createElement("div");

    
    const listPhotos = async(album) => {
        try {
            let res = await axios.get("http://localhost:3000/pictures/" + album);
            let pictures = res.data.body;
            albumsSection.innerHTML = "";
            pictures.forEach(photos => {
                let img = document.createElement("div");
                // img.src = photos.picture;
                img.innerText = photos.picture;
                img.value = photos.id;
    // had to change img to p
                albumsSection.appendChild(img);
                let deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                deleteButton.value = photos.id;
                albumsSection.appendChild(deleteButton);
                deleteButton.addEventListener("click", async() => {
                    try {
                        let res = await axios.delete("http://localhost:3000/pictures/" + Number(deleteButton.value));
                        img.parentNode.removeChild(img);
                        deleteButton.parentNode.removeChild(deleteButton);
                    } catch (error) {
                        console.log(error);
                    };
                });
            });

        let backButtonDiv = document.createElement("div");
        backButton.innerText = "Back to Albums";
        albumsSection.appendChild(backButtonDiv);
        backButtonDiv.appendChild(backButton);

        addButton.innerText = "Add Photo";
        albumsSection.appendChild(addButtonDiv);
        addButtonDiv.appendChild(pictureInput);
        addButtonDiv.appendChild(addButton);

        } catch(error) {
            console.log(error);
        };
    };
    
    
    ul.addEventListener("click", async(listEvent)=>{
        album = listEvent.target.value;  
        listPhotos(album);
    });
    
    addButton.addEventListener("click", async() => {
        try {
            let res = await axios.post("http://localhost:3000/pictures/" + Number(album), {picture: pictureInput.value, poster_id: Number(album)});
            let pictures = res.data.body;
            listPhotos(album);
        } catch (error) {
            console.log(error);
        };
    });
    
    backButton.addEventListener("click", async() => {
        listAlbums(user);
    });
    
});

