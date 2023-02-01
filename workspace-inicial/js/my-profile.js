const inputFName = document.getElementById("inputFName");
const inputSName = document.getElementById("inputSName");
const inputFLastName = document.getElementById("inputFLastName");
const inputSLastName = document.getElementById("inputSLastName");
const inputMail = document.getElementById("inputMail");
const inputContact = document.getElementById("inputContact");
const submitButton = document.getElementById("submitButton");


inputMail.value = localStorage.getItem("userLog");

if (localStorage.getItem("profileInfo")==null){
    myObject = {
        FName:"",
        SName:"",
        FLast:"",
        SLast:"",
        Mail: localStorage.getItem("userLog"),
        phone:""
    }
    localStorage.setItem("profileInfo", JSON.stringify(myObject));
} else {
    object = JSON.parse (localStorage.getItem("profileInfo"));
    inputFName.value = object.FName;
    inputSName.value = object.SName;
    inputFLastName.value = object.FLast;
    inputSLastName.value = object.SName;
    inputMail.value = object.Mail;
    inputContact.value = object.phone;
}

submitButton.addEventListener("click", ()=>{
    if ( validateEmail(inputMail.value) && (inputFName.value != "") && (inputFLastName.value != "") && (inputContact.value != "")){
        
        myObject = {
            FName:`${inputFName.value}`,
            SName:`${inputSName.value}`,
            FLast:`${inputFLastName.value }`,
            SLast:`${inputSLastName.value }`,
            Mail: `${inputMail.value}`,
            phone:`${inputContact.value}`
        }
        localStorage.setItem("profileInfo", JSON.stringify(myObject));
        alert("Informacion guardada con exito")
    } else {
        validate(inputFName);
        validate(inputFLastName);
        validate(inputContact);
        if (validateEmail(inputMail.value)){
            inputMail.classList.remove("is-invalid");
            inputMail.classList.add("is-valid");
        } else {
            inputMail.classList.remove("is-valid");
            inputMail.classList.add("is-invalid");
        }

    }
});



const validate = (validated)=> {
    if (validated.value.trim() === ""){
        validated.classList.remove("is-valid");
        validated.classList.add("is-invalid");
    } else {
        validated.classList.remove("is-invalid");
        validated.classList.add("is-valid");
    }
};

const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
};




