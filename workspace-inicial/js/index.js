document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
    /*if(window.localStorage.getItem("userLog") == null){
    window.location.href = "login.html"
} else {
    let lsUserid = document.getElementById("lsUserid");
    lsUserid.innerHTML = localStorage.getItem("userLog");
} */
});