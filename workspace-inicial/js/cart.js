const cartTable = document.getElementById("cartTable");
const cartURL = CART_INFO_URL + "25801" + EXT_TYPE;
const subtotalCost = document.getElementById("subtotalCost");
const shippingCost = document.getElementById("shippingCost");
const totalCost = document.getElementById("totalCost");
const inputRadio15 = document.getElementById("inputRadio15");
const inputRadio7 = document.getElementById("inputRadio7");
const inputRadio5 = document.getElementById("inputRadio5");
const transfLabel = document.getElementById("transfLabel");
const creditCardLabel = document.getElementById("creditCardLabel");
const cardInput = document.getElementById("cardInput");
const expirationInput = document.getElementById("expirationInput");
const secInput = document.getElementById("secInput");
const accNumber = document.getElementById("accNumber");
const selectPar = document.getElementById("selectPar");
const street =document.getElementById("street");
const corner = document.getElementById("corner");
const number = document.getElementById("number");
const methodError = document.getElementById("methodError");

localStorage.setItem("submit","false");



document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(cartURL).then(function(jsonObject){
        JsonInfo = jsonObject.data;
        let cartArray = [];
        for (article of JsonInfo.articles){
            object = {
                "id": article.id,
                "name": article.name,
                "count": article.count,
                "unitCost": article.unitCost,
                "currency": article.currency,
                "image": article.image
            }
            cartArray.push(object);
        }
        localStorage.setItem("cartArray",JSON.stringify(cartArray))
        loadCart();
        localStorage.setItem("SubtotalToPay", 0)
        setSubTotal();
});
});

function loadCart(){
    cartText = "";
    for (let array of JSON.parse(localStorage.getItem("cartArray"))) {
    cartText += 
    `<tr>
        <th> <img style="width: 75px;" src=${array.image} class="col img-fluid"> </th>
        <th> ${array.name} </th>
        <th> ${array.currency}  ${array.unitCost}  </th>
        <th> <input min="1" max="100" oninput="calSubTotal(${array.id},${array.unitCost}),setSubTotal()" type="number" value=${array.count} id="cart${array.id}" > </th>
        <th > ${array.currency} <span id=${array.id}> ${mult(array.unitCost,array.count)} <span> </th>
    </tr>`;

    }
    cartTable.innerHTML = cartText;
};

function getSubTotal(){
    Total = 0;
    for (let array of JSON.parse(localStorage.getItem("cartArray"))){
        const input = document.getElementById("cart" + array.id);
        if (array.currency == "USD"){
        Total += (array.unitCost * input.value)
        } else {
            Total += ((array.unitCost * input.value)/40)
        }
    }
    localStorage.setItem("SubtotalToPay", Total)
}

function setSubTotal(){
    getSubTotal()
    subTotalToPay = JSON.parse(localStorage.getItem("SubtotalToPay"));
    subtotalCost.innerHTML="USD " + subTotalToPay;
    if (inputRadio15.checked){
        shipping = subTotalToPay*(0.15);
        shippingCost.innerHTML=`USD ${shipping}`;
        total = (shipping + subTotalToPay);
        totalCost.innerHTML= `USD ${total}`;
    } else if (inputRadio7.checked){
        shipping = subTotalToPay*(0.07);
        shippingCost.innerHTML=`USD ${shipping}`;
        total = (shipping + subTotalToPay);
        totalCost.innerHTML= `USD ${total}`;
    } else if (inputRadio5.checked){
        shipping = subTotalToPay*(0.05);
        shippingCost.innerHTML=`USD ${shipping}`;
        total = (shipping + subTotalToPay);
        totalCost.innerHTML= `USD ${total}`;
    } else {
        shippingCost.innerHTML="Seleccione un tipo de envio";
        totalCost.innerHTML= "Seleccione un tipo de envio";
    }
}



function calSubTotal(id,cost){
    const input = document.getElementById("cart" + id);
    const number = input.value;
    const subTotal = document.getElementById(id);
    subTotal.innerHTML = mult(number,cost);
};

function mult(num1,num2){
    return num1 * num2;
}

function checkPaymentMethod(){
    if (creditCardLabel.checked){
        expirationInput.disabled=false;
        secInput.disabled=false;
        cardInput.disabled=false;
        accNumber.disabled=true;
        selectPar.innerHTML="Tarjeta de credito"
    } else {
        expirationInput.disabled=true;
        secInput.disabled=true;
        cardInput.disabled=true;
        accNumber.disabled=false;
        selectPar.innerHTML="Transferencia bancaria"
    }
}

function submitEvent(event){
    console.log("entra al onsubmit")
    event.preventDefault();
    localStorage.setItem("submit", "true")
    if(street.value!="" && corner.value!="" && number.value!=""){
        if (creditCardLabel.checked){
            if(cardInput.value != "" && expirationInput.value != "" && secInput.value != ""){
                alert("¡Has comprado con exito!");
                window.location="cart.html"
            }
        } else if (transfLabel.checked){
            if (accNumber.value!=""){
                alert("¡Has comprado con exito!");
                window.location="cart.html"
            }
        }
    }
    autenticar(event)
}

function autenticar(event){
    
    if (localStorage.getItem("submit") == "true"){
        if(inputRadio7.checked || inputRadio15.checked || inputRadio5.checked){
            event.preventDefault();
            validate(street);
            validate(corner);
            validate(number);
            if (creditCardLabel.checked){
                if(cardInput.value != "" && expirationInput.value != "" && secInput.value != ""){
                    methodError.classList.add("d-none");
                } else {
                    methodError.classList.remove("d-none");
                }
            } else if (transfLabel.checked){
                if(accNumber.value != ""){
                    methodError.classList.add("d-none");
                } else {
                    methodError.classList.remove("d-none");
                }
            } else {
                console.log("entra ak")
                methodError.classList.remove("d-none");
            }
        } else {
            alert("Selecciona un tipo de envio")
        }
    }
}

const validate = (validated)=> {
    if (validated.value.trim() === ""){
        validated.classList.remove("is-valid");
        validated.classList.add("is-invalid");
    } else {
        validated.classList.remove("is-invalid");
        validated.classList.add("is-valid");
    }
};