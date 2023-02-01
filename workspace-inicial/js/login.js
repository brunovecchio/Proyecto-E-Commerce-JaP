
 function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

window.addEventListener("load", () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const logBut = document.getElementById("logBut");



console.log(password)

logBut.addEventListener("click", () => {
    validarDatos();
})


const validarDatos = () => {

    // Valores que deposita el usuario

    // con trim(), al valor de cada input, se le eliminan los espacios en blanco 

    const emailUser = email.value.trim();
    const passwordUser = password.value.trim();
    
    console.log(emailUser)

    localStorage.setItem("userLog", emailUser);

    // Declaracion de variables para la validacion del campo completado

    let emailValid = false;
    let passwordValid = false;

    // Corroborando datos

    if (!emailUser) {
        validateFail(email)
        emailValid = false;
    } else if (!validEmail(emailUser)){
        validateFail(email)
        emailValid = false;
    } else {
        validateOk(email);
        emailValid = true;
    }

    if (!passwordUser) {
        validateFail(password)
        passwordValid = false;
    } else {
        validateOk(password);
        passwordValid = true;
    }

    if (emailValid && passwordValid) {
        goIndex();
    } else {
        showAlertError()
    }
}

    const validateFail = (input) => {
        input.classList.add("is-invalid")

    }

    const validateOk = (input) => {
        input.classList.remove("is-invalid");
    }
 
    const validEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
    }



});

function goIndex(){
    window.location.href = "index.html"
}

