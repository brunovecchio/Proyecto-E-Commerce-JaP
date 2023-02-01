const CATEGORIES_URL = "http://localhost:3000/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/emercado-api/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/emercado-api/products_comments/";
const CART_INFO_URL = "http://localhost:3000/emercado-api/user_cart/";
const CART_BUY_URL = "http://localhost:3000/emercado-api/cart/buy.json";
const EXT_TYPE = "";

console.log(CATEGORIES_URL)
//const completeURL = PRODUCTS_URL + localStorage + EXT_TYPE;
//console.log(completeURL)

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function logOut (){
  window.localStorage.removeItem("userLog");
  window.location = "index.html";
};

if(window.localStorage.getItem("userLog") == null){
  window.location.href = "login.html"
} else {
  let lsUserid = document.getElementById("lsUserid");
  lsUserid.innerHTML = `<div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                            ${localStorage.getItem("userLog")}
                          </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownUser">
                              <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
                              <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                              <li><a class="dropdown-item" onclick="logOut()" >Cerrar sesión</a></li>
                            </ul>
                        </div>`
};