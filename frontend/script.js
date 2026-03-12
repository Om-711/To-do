async function addUser(){
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value

    const response = await axios.post("http://localhost:3000/user",{
        name : name, 
        email : email
    });

    if(response.data.message === "Work"){
        alert("User created")
    }

    localStorage.setItem("user", JSON.stringify(response.data))
    window.location.href = "./todo.html?userID=" + response.data.userId
}


async function DisplayUser(){
    const response = await axios.get("http://localhost:3000/getuser")
    const users = response.data.user
    console.log(users)
    const div = document.getElementById("list")
    let list = ""
    for(let i=0;i<users.length;i++){
        list += "Name: " + users[i].name + "<br>Email-ID: " + users[i].email + "<br><br>";
    }

    
    div.innerHTML = list
};
