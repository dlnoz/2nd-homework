let elUsersList = document.querySelector(".users-list")

const getUsers = (url) => fetch(url).then(res => res.json()).then(data => renderUsers(data, elUsersList))


function renderUsers(usersList, saveList){
    saveList.innerHTML = null
    usersList.forEach(item => {
        let elItem = document.createElement("li")
        elItem.innerHTML = `
            <div class="flex bg-slate-200 rounded-md p-3 items-center justify-between">
                <img class="w-[50px] h-[50px] rounded-full" src="./images/apple-white-logo.jpg" alt="Users logo">
                <div>
                    <h2 class="text-[20px] font-semibold">${item.name}(${item.username})</h2>
                    <p class="text-[18px]">${item.email}</p>
                </div> 
                <button>
                    <img src="./images/dots.svg" alt="Dots" width="30" height="30" />
                </button>
            </div>
        `
        saveList.append(elItem)
    })
}

getUsers("https://jsonplaceholder.typicode.com/users")