const infoPrice = document.getElementById("infoPrice");
const infoName = document.getElementById("infoName");
const infoDescription = document.getElementById("infoDescription");
const infoCategory = document.getElementById("infoCategory");
const infoSoldCount  = document.getElementById("infoSoldCount");
const infoImg  = document.getElementById("infoImg");
const commentDiv = document.getElementById("commentDiv");
const inputText = document.getElementById("inputText");
const inputTextA = document.getElementById("inputTextA");
const opBut = document.getElementById("opBut")
const punBut = document.getElementById("punBut")
const relProd = document.getElementById("relProd")



punBut.addEventListener("click", ()=> {
    inputText.value = "";
    inputTextA.value = "";
});

opBut.addEventListener("click", ()=> {
    inputText.value = "";
    inputTextA.value = "";
});





function addComment(commentArray){
    let auxCommentText= "";
    for (const comment of commentArray){
        let stars="";
        for(var i = 0; i < comment.score; i++){
            stars +=`<span class="fa fa-star checked"></span>`
        }
        for (var j=comment.score; j<5; j++){
            stars +=`<span class="fa fa-star"></span>`
        }
        auxCommentText +=  `<div class="d-flex flex-start mb-4">
                                    <div class="card w-100">
                                        <div class="card-body p-4">
                                            <div class="">
                                                <h5>${comment.user}</h5>
                                                <p class="small" id="commentDate">${comment.dateTime}</p>
                                                <p>
                                                    ${comment.description}
                                                </p>
                            
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="d-flex align-items-center">
                                                    ${stars}
                                                    </div>
                                                    <a href="#!" class="link-muted"><i class="fas fa-reply me-1"></i> Contestar </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
    }
    commentDiv.innerHTML = auxCommentText;
};



function addImages(imagesArray) {
    let auxInfoText = "";
    for (const product of imagesArray){
        auxInfoText += `<img src=${product} class="img-thumbnail w-25 p-3">  `
    }
    infoImg.innerHTML = auxInfoText;
};


document.addEventListener("DOMContentLoaded", () => {

    productID=localStorage.getItem("productID");
    completeInfoURL = PRODUCT_INFO_URL + productID + EXT_TYPE;
    completeComentURL = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE;
    console.log(completeInfoURL);
        getJSONData(completeInfoURL).then(function(jsonObject){
            JsonInfo = jsonObject.data;
            infoName.innerHTML = `${JsonInfo.name}`;
            infoPrice.innerHTML =  `${JsonInfo.currency} ${JsonInfo.cost}`
            infoDescription.innerHTML = `${JsonInfo.description}`
            infoCategory.innerHTML = `${JsonInfo.category}`
            infoSoldCount.innerHTML = `${JsonInfo.soldCount}` 
            addImages(JsonInfo.images);
            addRelatedProduct(JsonInfo.relatedProducts);
})
        getJSONData(completeComentURL).then(function(jsonObject){
            JsonComment = jsonObject.data;
            console.log(completeComentURL);
            addComment(JsonComment);
        })
        //
});

function changeID(id){
   window.localStorage.setItem("productID", id);
   window.location="product-info.html"
}

function addRelatedProduct(array){
    let RelatedProductText = "";
    for (let content of array){
        RelatedProductText +=   `   <div class="img-thumbnail w-100 cursor-active list-group-item-action" onclick="changeID(${content.id})">
                                        <img src=${content.image} alt="" class="w-100">
                                            <hr>
                                        <h4>${content.name}</h4>   
                                    </div>
                                `
    }
    relProd.innerHTML = RelatedProductText;
}