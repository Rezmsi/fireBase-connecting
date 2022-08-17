/* --------------get dom elements i need --------------------------------------------*/
let usersContainer = document.querySelector('#wrap-users')
let deleteModal = document.querySelector('.modal-container')
let modalnoBtn = document.querySelector('.unaccept-btn')
let modalyesBtn = document.querySelector('.accept-btn')
let userID =null
let editmodal = document.querySelector('#edit-modal')
let firstnameEdited = document.querySelector('.firstname')
let lastnameEdited = document.querySelector('.lastname')
let ageEdited = document.querySelector('.password')
/* ---------------- onloaded event --------------------------------------------*/
window.addEventListener('load',getMethod)

/* ------------------ http GET method --------------------------------------------*/
async function getMethod (){

   await fetch('https://login-form-9b365-default-rtdb.firebaseio.com/users.json')
        .then( (res)=>{
            return res.json()
        } )
        .then( (user) => {
            
            let toArrayuser = Object.entries(user)
             usersContainer.innerHTML =''
            toArrayuser.forEach( (person)=> {
               
                
             usersContainer.insertAdjacentHTML('beforeend',
                                    `
                        <div class="user">
                            <div class="user-profile-wrap">
                                <div class="user-profile-description">
                                    <h1 class="user-profile-name"> ${person[1].userName} <span class="user-age"> ${person[1].userAge} </span> </h1>
                                    <h3 class="user-explanations"> ${person[1].userFamily} </h3>
                                </div>
                            </div>

                            <div class="btn-groups-column">
                                <button class="delete-user-btn" onclick="deleteHandler('${person[0]}')">delete</button>
                                <button class="edit-user-btn" onclick="editHandler('${person[0]}')">edit</button>
                            </div>
                        </div>
                        `
            
                    )
             })
         })
        
}

/* --------- handlers of delete btn and modal btn --------------------------------------------*/
function deleteHandler(id){

    userID =id
    console.log(userID);
    deleteModal.classList.add('visible')
    
    modalnoBtn.addEventListener('click', ()=>{
        closeModal()
    })

}

async function deletePerson (){
    
    await fetch(`https://login-form-9b365-default-rtdb.firebaseio.com/users/${userID}.json`,{
            method:'DELETE'
        })
        .then(res => console.log(res))
        .catch(res => console.log(res))
        closedeleteModal()
        getMethod()
    }


modalyesBtn.addEventListener('click',deletePerson)

/* --------------- close modal function --------------------------------------------*/
function closedeleteModal (){
    deleteModal.classList.remove('visible')
}
function closeeditModal (){
    editmodal.classList.remove('visible')
}
/* --------------- put method --------------------------------------------*/
function editHandler(id){
     userID=id
     editmodal.classList.add('visible')
}

async function updateUser(){
    editedUser ={
         userName : firstnameEdited.value,
         userFamily : lastnameEdited.value,
         userAge : ageEdited.value
     }
    await fetch(`https://login-form-9b365-default-rtdb.firebaseio.com/users/${userID}.json`,{
        method:'PUT',
        Headers:{'Content-type':'application/json'},
        body: JSON.stringify(editedUser)
    })
    .then(res => console.log(res))
    .catch(res => console.log(res))
    closeeditModal()
    getMethod()
}