let userNameInput = document.querySelector('.name')
let userFamilyInput = document.querySelector('.family')
let userAgeInput = document.querySelector('.age')
let registerBtn = document.querySelector('button')


let userName = null
let userFamily = null
let userAge = null


registerBtn.addEventListener('click', (event)=>{

    event.preventDefault()

    let  newUser ={

         userName : userNameInput.value,
         userFamily : userFamilyInput.value,
         userAge : userAgeInput.value
    }
    

    clearInputs()
    postMethod(newUser)

})


function postMethod (newUser){

        fetch('https://login-form-9b365-default-rtdb.firebaseio.com/users.json',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify(newUser)
    })
        .then( res => console.log(res) )
        .catch( err => console.log(err))
}

function clearInputs (){
    userAgeInput.value = ''
    userFamilyInput.value = ''
    userNameInput.value = ''
}