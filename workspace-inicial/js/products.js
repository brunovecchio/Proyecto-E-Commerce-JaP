let ID = localStorage.getItem("catID");
let productsArray = undefined;
const container = document.getElementById("container-prod")
const ascPrice = "0-9";
const descPrice = "9-0";
const artVen = "Cant.";
let minCost = undefined;
let maxCost = undefined;
let currentProductsArray = [];
let currentSortCriterio = undefined;

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}


function organizarCats(criterio, array){
    let result = [];
    if (criterio === ascPrice)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === descPrice){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === artVen){
        result = array.sort(function(a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if ( aSoldCount > bSoldCount ){ return -1; }
            if ( aSoldCount < bSoldCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

function organAndAdd(sortCriterio, categoriesArray){
    currentSortCriterio = sortCriterio;
    if(categoriesArray != undefined){
        currentProductsArray = categoriesArray;
    }
    currentProductsArray = organizarCats(currentSortCriterio, currentProductsArray);

    addProducts(productsArray.products);
}

function addProducts(dataArray){
    let auxText = "";
    console.log("ADD PROD")
    for(const item of dataArray) {
        if(((minCost == undefined) || (minCost != undefined && parseInt(item.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(item.cost) <= maxCost))){
        auxText += `
        <div class="album py-5 bg-light">  
            <div class="container w-50 p-3 d-flex justify-content-center">  
                <div class="row">   
                    <div class="card mb-4 box-shadow"> 
                    <img class="card-img-top" alt="Thumbnail [100%x225]" style="height:100%; width: 100%; display: block;" src="${item.image}" data-holder-rendered="true">
                        <div class="card-body"> <p class="card-text">${item.name} <br> ${item.description} <br> ${item.currency} ${item.cost} <br>   </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" onclick="setProductID(${item.id})">
                                <button type="button" class="btn btn-sm btn-outline-secondary">Más información</button>
                                </div>  <small class="text-muted">${item.soldCount} articulos vendidos </small>
                            </div>  
                        </div>  
                    </div>  
                </div>  
            </div> 
         </div>`
        }
        
        container.innerHTML = auxText;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    let localID = localStorage.getItem("catID");
    let completeURL = PRODUCTS_URL + localID + EXT_TYPE;
    getJSONData(completeURL).then(function(jsonObject){
            productsArray = jsonObject.data
            addProducts(productsArray.products)
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        organAndAdd(ascPrice,productsArray.products);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        organAndAdd(descPrice,productsArray.products);
    });

    document.getElementById("sortBySoldArticle").addEventListener("click", function(){
        organAndAdd(artVen,productsArray.products);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        addProducts(productsArray.products);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }
        addProducts(productsArray.products);
});
});

