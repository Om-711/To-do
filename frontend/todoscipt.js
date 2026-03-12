// async function todo(){

//     const input = document.getElementById("text")
//     const text = input.value

//     const li = document.createElement("li")
//     const checkbox = document.createElement("input")
//     checkbox.type = "checkbox"

//     const label = document.createElement("span")
//     label.textContent = " " + text

//     checkbox.addEventListener("change", function(){
//         if(checkbox.checked){
//             li.remove()
//         }
//     });

//     li.append(checkbox)
//     li.append(label)
//     document.getElementById("task-list").append(li)

// }

const params = new URLSearchParams(window.location.search)
const savedUser = JSON.parse(localStorage.getItem("user") || "null")
const userID = (params.get("userID") || savedUser?.userId || "").trim()

function ensureUserSelected() {
    if (!userID) {
        alert("User not found. Please create/select a user first.")
        return false
    }
    return true
}


async function loadTask(){
    if (!userID) {
        const ul = document.getElementById("task-list")
        ul.innerHTML = "<li>Please create/select a user first.</li>"
        return
    }

    const response = await axios.get("http://localhost:3000/tasks/" + userID)
    const tasks = response.data.task

    const ul = document.getElementById("task-list")
    ul.innerHTML = ""


    for(let i=0;i<tasks.length;i++){
        if (tasks[i].checkbox === true){
            continue
        }

        const li = document.createElement("li")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = tasks[i].checkbox === true

        const label = document.createElement("span")
        label.textContent = " " + tasks[i].content

        checkbox.addEventListener("change", async function(){
            if(checkbox.checked){
                await axios.delete("http://localhost:3000/task/" + tasks[i]._id)
                li.remove()
            }
        })

        li.append(checkbox)
        li.append(label)
        ul.append(li)
    }

}
async function todo(){
    if (!ensureUserSelected()) return

    const input = document.getElementById("text")
    const text = input.value.trim()
    if (!text) return
    
    await axios.post("http://localhost:3000/task", {
        userId:userID,
        content:text
    })

    input.value = ""
    await loadTask()
}

if (userID) loadTask()
