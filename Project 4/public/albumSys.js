let albumId = -1;
let imageId = -1;
let images = [];

let overlay = document.querySelector("#overlay");
let albumApp = document.querySelector(".pop-up-album-app");


let albumName = albumApp.querySelector(".album-app-title");
let closeBtn = albumApp.querySelector(".album-app-close-btn");

let albumImg = albumApp.querySelector("#album-main-img");

let addImgBtn = albumApp.querySelector("[action='add-img']");
let leftBtn = albumApp.querySelector("[action='nav-left']");
let playBtn = albumApp.querySelector("[action='play']");
let rightBtn = albumApp.querySelector("[action='nav-right']");
let deleteBtn = albumApp.querySelector("[action='delete']");
let bigLeftBtn = albumApp.querySelector("[btn='left']");
let bigRightBtn = albumApp.querySelector("[btn='right']");

let thumbnailsContainer =  albumApp.querySelector(".album-app-images");

let thumbnailsMainTemplate = albumApp.querySelector(".image-thumbnails");
let thumbnailsTemplate = thumbnailsMainTemplate.content.querySelector(".album-app-thumbnail");


addImgBtn.addEventListener("click",()=>{
    let imgUrl = prompt("Enter image src ");
    if(imgUrl==false ||imgUrl==null || imgUrl == undefined){
        return;
    } 
    
    imageId++;
    images.push({
        id : imageId, 
        pid : albumId,
        imgsrc : imgUrl
    })

    saveImageToLocalStorage();
    addImageToHtml(imgUrl,imageId);
})

function addImageToHtml(imgUrl,imageId){
    let imgThumbnail = document.importNode(thumbnailsTemplate,true);
    let imgEle = imgThumbnail.querySelector('img');
    imgEle.src = imgUrl;
    albumImg.src = imgUrl;

    removeActiveClass();
    imgEle.classList.add("active");
    
    imgThumbnail.addEventListener("click",()=>{
        removeActiveClass();
        imgEle.classList.add("active");
        albumImg.src = imgUrl;
    })

    imgThumbnail.setAttribute("id",imageId);

    thumbnailsContainer.appendChild(imgThumbnail);
}

function removeActiveClass(){
    let allThumbnails = document.querySelectorAll(".album-app-thumbnail");
    if(allThumbnails.length==0){
        return;
    }
    allThumbnails = Array.from(allThumbnails);
    let allImages = allThumbnails.map(value => value.childNodes[1]);
    allImages.forEach(element => {
        element.classList.remove("active");
    });
}
function getActiveImg(){
    let allThumbnails = document.querySelectorAll(".album-app-thumbnail");
    if(allThumbnails.length==0){
        return false;
    }
    allThumbnails = Array.from(allThumbnails);
    let allImages = allThumbnails.map(value => value.childNodes[1]);
    let activeImg = allImages.find(element => {
        return element.classList.contains("active");
    });
    return activeImg;
}

deleteBtn.addEventListener("click",()=>{
    let activeImgElement = getActiveImg();
    if(activeImgElement==false){
        return;
    }
    let res = confirm("Do you want to delete this");
    if(res == false){
        return;
    }
    activeImgElement.classList.remove("active");
    let imageTBD = parseInt(activeImgElement.parentNode.getAttribute("id"));
    let idxInRam = images.findIndex(e => e.id == imageTBD);
    images.splice(idxInRam,1);
    saveImageToLocalStorage();
    thumbnailsContainer.removeChild(activeImgElement.parentNode);
    setFirstAsActive();
})

function setFirstAsActive(){
    let allThumbnails = document.querySelectorAll(".album-app-thumbnail");
    if(allThumbnails.length==0){
        albumImg.src ="";
        return false;
    }
    removeActiveClass();
    allThumbnails = Array.from(allThumbnails);
    let allImages = allThumbnails.map(value => value.childNodes[1]);
    allImages[0].classList.add("active");
    albumImg.src = allImages[0].src;
}

function populateThumbnails(){
    let imagesOfThisAlbum = images.filter(e=>e.pid==albumId);
    if(imagesOfThisAlbum.length==0){
        albumImg.src = "";
        return;
    }
    imagesOfThisAlbum.forEach(element => {
        addImageToHtml(element.imgsrc,element.id);
    });
    setFirstAsActive();
}


leftBtn.addEventListener("click",leftImage);
bigLeftBtn.addEventListener("click",leftImage);

function leftImage(){
    let currImg = getActiveImg();
    if(currImg ==false){
        return;
    }
    let currThumbnail = currImg.parentNode;
    if(currThumbnail.previousElementSibling == null){
        return;
    }
    let prevThumbnail = currThumbnail.previousElementSibling;
    let prevImg = prevThumbnail.childNodes[1];
    setActive(prevImg);
}

function setActive(currImg){
    removeActiveClass();
    currImg.classList.add("active");
    albumImg.src = currImg.src;
}

rightBtn.addEventListener("click",rightImage);
bigRightBtn.addEventListener("click",rightImage);

function rightImage(){
    let currImg = getActiveImg();
    if(currImg ==false){
        return false;
    }
    let currThumbnail = currImg.parentNode;
    if(currThumbnail.nextElementSibling == null){
        return false;
    }
    let prevThumbnail = currThumbnail.nextElementSibling;
    let prevImg = prevThumbnail.childNodes[1];
    setActive(prevImg);
    return prevImg;
}

playBtn.addEventListener("click", () =>{
    let currImg = getActiveImg();
    if(currImg ==false){
        return false;
    }
    let currThumbnail = currImg.parentNode;
    if(currThumbnail.nextElementSibling == null){
        return false;
    }

    let div = document.createElement("div");
    let imgOnDiv = document.createElement("img");
    div.innerHTML = "";
    div.style.display = "flex";
    div.style.alignContent = "center";
    div.style.justifyContent = "center";
    
    div.style.padding = "1rem";
    div.style.position = "fixed";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%,-50%)";
    div.style.zIndex = "12";
    div.style.height = "100%"
    div.style.width = "100%"
    div.style.backgroundColor = "black";

    
    imgOnDiv.style.margin = "1rem";
    imgOnDiv.style.maxHeight = "100%";
    imgOnDiv.style.maxWidth = "100%";
    imgOnDiv.style.objectFit = "contain";

    div.appendChild(imgOnDiv);
    document.body.insertBefore(div, document.body.firstChild);
    let setId = setInterval(()=>{
        let moreRightImages = rightImage();
        if(moreRightImages == false){
            document.body.removeChild(div);
            clearInterval(setId);
        }else{
            imgOnDiv.src = moreRightImages.src;
        } 
    },1000);  
    imgOnDiv.addEventListener("click",()=>{
        document.body.removeChild(div);
        clearInterval(setId);
    })
})


overlay.addEventListener("click", closePopup);

function openPopup() {
    overlay.classList.add("active");
    albumApp.classList.add("active");
}
function closePopup() {
    thumbnailsContainer.innerHTML = "";
    albumImg.src = "";
    overlay.classList.remove("active");
    albumApp.classList.remove("active");
}

closeBtn.addEventListener("click", closePopup);

function albumViewer(albumbox){
    albumId = parseInt(albumbox.getAttribute("id"));
    openPopup();
    let abName = albumbox.querySelector("[action='set-name']").innerText;
    albumName.innerText = abName;
    thumbnailsContainer.innerHTML = "";
    populateThumbnails();
}

function saveImageToLocalStorage(){
    let imagesString = JSON.stringify(images);
    localStorage.setItem("imageLinks",imagesString);
}

function getImageId(){
    let imagesString = localStorage.getItem("imageLinks");
    if(imagesString){
        images = JSON.parse(imagesString);
        images.forEach(e=>{
            if(e.id > imageId)
            {
                imageId = e.id;
            }
        })
    }
}
getImageId();