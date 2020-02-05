document.addEventListener("DOMContentLoaded",()=>{
    let selectUsers = document.querySelector("#users")
    let search = document.querySelector("#search")
    let results = document.querySelector("#results")
    
    const fetchData = async (url)=>{
        try{
            let data = await axios.get(url)
            return data.data
        }catch(err){
            console.log(err)
        }
    }

    const fetchAllUsers = async()=>{
        let userUrl = "http://localhost:3000/users/"
        let usersDb = await fetchData(userUrl)
        let users = usersDb.body

        users.forEach(user =>{
            let option = document.createElement("option")
            option.innerText = `${user.first_name} ${user.last_name}`
            option.value = user.id
            selectUsers.appendChild(option)
        })
        search.reset()
    }

    fetchAllUsers()

    let newUser = document.querySelector("#newUser");

    newUser.addEventListener("submit", async (event)=>{
        event.preventDefault()
        results.innerHTML = ""
        let userInfo = {first_name:newUser.firstName.value,last_name:newUser.lastName.value,age:newUser.age.value,about_statement:aboutStatement.value}
        let userUrl = "http://localhost:3000/users/"

        try{
            let usersDb = await axios.post(userUrl,userInfo)
            if(usersDb.status = 200){
                let h4 = document.createElement("h4")
                h4.innerText = `${usersDb.data.status} ${usersDb.data.message}`
                results.appendChild(h4)
            }
            fetchAllUsers()
            newUser.reset()
        } catch (err){
            console.log(err)
        }


    })

    newUser.addEventListener("input",()=>{
        results.innerHTML=""
    })
    search.addEventListener("change",()=>{
        results.innerHTML=""
    })

    const createUserCard = (profileData) =>{
        let profileId = profileData.id
        let card = document.createElement("div")
        card.className = "userCard"
        let profileName = document.createElement("h4")
        let profileAge = document.createElement("h5")
        let profileAbout = document.createElement("h5")
        let profileSince = document.createElement("h5")
        let deleteButton = document.createElement("button")
        
        deleteButton.innerText = "Delete"
        profileName.innerText = `User Name: ${profileData.first_name} ${profileData.last_name}`
        profileAge.innerText = `Age: ${profileData.age}`
        profileAbout.innerText = `About Statment: ${profileData.about_statement}`
        profileSince.innerText = `Member Since: ${profileData.created_at}`

        card.appendChild(profileName)
        card.appendChild(profileAge)
        card.appendChild(profileAbout)
        card.appendChild(profileSince)
        card.appendChild(deleteButton)
        results.appendChild(card)

        deleteButton.addEventListener("click", async ()=>{
            try{
                await axios.delete(`http://localhost:3000/users/${profileId}`)
                fetchAllUsers()
            }catch (err){
                console.log(err)
            }
            results.innerHTML =""
        })

    }

    const getUserProfile = async (user) =>{
        let userUrl = `http://localhost:3000/users/${user}`
        let userData = await fetchData(userUrl)
        let profile = userData.body
        createUserCard(profile)
        debugger

    }

    search.addEventListener("submit",(event)=>{
        event.preventDefault()

        let userSelected = search.users.value

        if(userSelected === "Select User"){
            return alert("Must selected a valid user")
        }

        if(search.userProfile.checked === true){
            getUserProfile(userSelected)
            debugger
        } else if(search.postSearch.checked === true){
            getUserPosts(userSelected)
        }
    })
})