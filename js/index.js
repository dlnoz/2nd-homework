let elForm = document.querySelector(".todo-form")
let elList = document.querySelector(".list")
let elDeleteBtn = document.querySelector(".delete-btn")


let users = JSON.parse(localStorage.getItem("users")) || []

elForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        id: users[users.length -1]?.id ? users[users.length -1].id +1 : 1,
        name:e.target.todo.value
    }
    users.push(data)
    localStorage.setItem("users", JSON.stringify(users))

    fetch("http://localhost:3000/users", {
        method:"post",
        body: JSON.stringify(data),
        headers:{"Content-type":"application/json"}
    })
})


async function getTodos(){
    let res = await fetch("http://localhost:3000/users")
    let data = await res.json()
    return data
}
getTodos().then(res => {
    elList.innerHTML = null
    res.map((item, index) => {
    let elItem = document.createElement("li");
    elItem.className = "w-[250px] bg-slate-800 rounded-[35px] p-5 space-y-[15px]"
    elItem.innerHTML = `
    <div class=" flex justify-around">
    <strong class="text-blue-600 text-[16px] "> <span class="text-white text-[14px] ">Name:</span> ${item.name}</strong>
    <span class="text-[16px] text-red-600"> <span class="text-white text-[14px]">Id:</span> ${item.id}</span>
    </div>
    
    <div class=" flex gap-[15px] justify-center items-center">
    <button onclick="handleDeleteBtn(${item.id})" class="delete-btn hover:scale-[1.1] cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
    </svg></button>
    <button onclick="handlePutBtn(${item.id})" class="hover:scale-[1.1] cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
    </svg></button>
    </div>
    `
    elList.append(elItem)
    })
})
//delete

function handleDeleteBtn(id) {
    let deleteId = users.findIndex(item => item.id == id)
    users.splice(deleteId, 1)

    fetch(`http://localhost:3000/users?id=${id}`, {
        method: 'DELETE'

    }).then(() => getTodos()) 
}

//put 
function handlePutBtn(id){

    fetch(`http://localhost:3000/users?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
}