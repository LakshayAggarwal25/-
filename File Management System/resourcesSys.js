var userInput;

let folderMainTemplate = document.querySelector(".resources-template");
let breadCrumbMainTemplate = document.querySelector(".breadcrumb-template");
let breadCrumb = document.querySelector(".bread-crumb-container");
let resourcesContainer = document.querySelector(".resources-container");

let resources = [];
let cfid = -1;
let id = -1;
let resourceTypeToBeAdded = -1;
// 1 -> Folder, 2 -> File, 3 -> Album

let addFolderBtn = document.querySelector("#add-folder");
breadCrumb.style.opacity = "1";


addFolderBtn.addEventListener("click", () => {
    resourceTypeToBeAdded = 1;
    if(breadCrumb.style.opacity==0){
        alert("Can not create a folder here!!!");
        return;
    }
    takeUserInput();
});

function addResource(){
    if (userInput == false || userInput == null){
        return;
    }
    if (userInput.length > 15) {
        alert("Name cannot be more than 15 characters");
        return;
    }
}

function takeUserInput(){
    userInput = false;
    let popup = document.querySelector(".pop-up-input");
    let input = document.querySelector("#pop-up-input-content");
    let overlay = document.querySelector("#overlay");
    let inputEntered = document.querySelector("#pop-up-input-ok");
    let closePop = document.querySelector("#pop-up-input-cancel");

    inputEntered.addEventListener("click", getInput);
    closePop.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);

    function openPopup() {
        popup.classList.add("active");
        overlay.classList.add("active");
    }

    function getInput() {
        let userInput = input.value;
        if (userInput) {
            userInput = userInput.trim();
            if (userInput) {
                inputByUserFolder = userInput;
                input.value = "";
                addResource();
            }
        }
        closePopup();
        return;
    }

    function closePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");
        inputEntered.removeEventListener("click", getInput);
        closePop.removeEventListener("click", closePopup);
        overlay.removeEventListener("click", closePopup);
        return;

    }
    openPopup();
}