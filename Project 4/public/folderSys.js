var inputByUserFolder;
function addFolderUser() {
    inputByUserFolder = false;
    let popup = document.querySelector(".pop-up-input");
    let overlay = document.querySelector("#overlay");
    let input = document.querySelector("#pop-up-input-content");
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
                addFolder();
                closePopup();
                return;    
            }
        }
        closePopup();
        return;
    }

    function closePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");
        return;

    }

    openPopup();
    return;
}

var inputByUserFile;
function addFileUser() {
    inputByUserFile = false;
    let popup = document.querySelector(".pop-up-input-2");
    let overlay = document.querySelector("#overlay-2");
    let input = document.querySelector("#pop-up-input-content-2");
    let inputEntered = document.querySelector("#pop-up-input-ok-2");
    let closePop = document.querySelector("#pop-up-input-cancel-2");

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
                inputByUserFile = userInput;
                input.value = "";
                addFile();
                closePopup();
                return;
            }
        }
        closePopup();
        return;

    }

    function closePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");
        return;

    }

    openPopup();
    return;
}

let folderMainTemplate = document.querySelector(".folders-template");
let breadCrumbMainTemplate = document.querySelector(".breadcrumb-template");
let breadCrumb = document.querySelector(".bread-crumb-container");
let resourcesContainer = document.querySelector(".resources-container");

let resources = [];
let cfid = -1;
let id = -1;

let addFolderBtn = document.querySelector("#add-folder");

breadCrumb.style.opacity = "1";

addFolderBtn.addEventListener("click", () => {
    if(breadCrumb.style.opacity==0){
        alert("Can not create a folder here!!!");
        return;
    }
    addFolderUser();
});

function addFolder() {
    if (inputByUserFolder == false) {
        return;
    }
    if (inputByUserFolder.length > 15) {
        alert("Folder name cannot be more than 15 characters");
        return;
    }
    let folderNameExists = resources.filter(r => r.pid == cfid).filter(r => r.rType == "folder").some(f => f.name == inputByUserFolder);
    if (folderNameExists) {
        alert("Folder name already exists");
        return;
    }
    id++;

    // Updating RAM
    resources.push({
        pid: cfid,
        id: id,
        name: inputByUserFolder,
        rType: "folder"
    });

    //Updating View
    addFolderToHtml(inputByUserFolder, id, cfid);

    //Updating Storage
    saveToLocalStorage();
}
function addFolderToHtml(name, id, pid) {
    let folderTemplate = folderMainTemplate.content.querySelector(".folder-box");
    let folderBoxDiv = document.importNode(folderTemplate, true);

    let menuBtn = folderBoxDiv.querySelector(".three-dots");
    let menu = folderBoxDiv.querySelector(".mini-menu");
    let fname = folderBoxDiv.querySelector(".folder-name");
    let viewBtn = folderBoxDiv.querySelector("[action='view']");
    let renameBtn = folderBoxDiv.querySelector("[action='rename']");
    let deleteBtn = folderBoxDiv.querySelector("[action='delete']");
    let folderImg = folderBoxDiv.querySelector(".folder-img");

    fname.innerText = name;
    folderBoxDiv.setAttribute("id", id);
    folderBoxDiv.setAttribute("pid", pid);

    let menuClosed = true;
    function toggleMenuDisplay() {
        if (menuClosed) {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }
        menuClosed = !menuClosed;
    }
    menuBtn.addEventListener("click", toggleMenuDisplay);
    menuBtn.parentNode.addEventListener("mouseleave", function () {
        menu.style.display = "none";
        menuClosed = true;
    })

    viewBtn.addEventListener("click", viewFolder);
    folderImg.addEventListener("click", viewFolderByImg);
    renameBtn.addEventListener("click",renameFolder);
    deleteBtn.addEventListener("click", deleteFolder);

    resourcesContainer.appendChild(folderBoxDiv);
}
function viewFolder() {
    let currentFolder = this.parentNode.parentNode.parentNode.parentNode;
    cfid = parseInt(currentFolder.getAttribute("id"));
    let temp = resources.filter(r => r.pid == cfid);
    addToHtml(temp, cfid);
    makeBreadCrumb(cfid);

}
function viewFolderByImg() {
    let currentFolder = this.parentNode.parentNode;
    cfid = parseInt(currentFolder.getAttribute("id"));
    let temp = resources.filter(r => r.pid == cfid);
    addToHtml(temp, cfid);
    makeBreadCrumb(cfid);

}
function renameFolder() {
    let newName = prompt("Enter new name ");
    let currentFolderBox = this.parentNode.parentNode.parentNode.parentNode;
    let currentName = currentFolderBox.querySelector(".folder-name");
    let tempid = parseInt(currentFolderBox.getAttribute("id"));
    if (newName == false) {
        return;
    }
    if (newName.length > 15) {
        alert("Folder name cannot be more than 15 characters");
        return;
    }
    let folderNameExists = resources.filter(r => r.pid == cfid).filter(r => r.rType == "folder").some(f => f.name == newName);
    if (folderNameExists) {
        alert("Folder name already exists");
        return;
    }

    let folderInArray = resources.find(r=>r.id==tempid);
    folderInArray.name = newName;
    currentName.innerText = newName;

    saveToLocalStorage();
}
function deleteFolder() {
    let folder = this.parentNode.parentNode.parentNode.parentNode;
    let folderIdToBeDelete = parseInt(folder.getAttribute("id"));
    let oldFolder = folder.querySelector(".folder-name");
    let oldFolderName = oldFolder.innerText;
    let res = confirm("Are you sure you want to delete " + oldFolderName);

    if (res == false) {
        return;
    }
    
    let containsFolders = resources.some(f => f.pid == folderIdToBeDelete);
    if (containsFolders==true) {
        alert("Can't delete, folder contains other folders");
        return;
    }

    let folderIndexInArray = resources.findIndex(f => f.id == folderIdToBeDelete);
    resources.splice(folderIndexInArray, 1);
    resourcesContainer.removeChild(folder);
    saveToLocalStorage();
    
}
function navigateBreadCrumb() {
    cfid = parseInt(this.getAttribute("id"));
    addToHtml(resources,cfid);
    while (this.nextSibling) {
        this.parentNode.removeChild(this.nextSibling);
    }

}

let fileMainTemplate = document.querySelector(".files-template");
let addFileBtn = document.querySelector("#add-file");

addFileBtn.addEventListener("click", () => {
    if(breadCrumb.style.opacity==0){
        alert("Can not create a file here!!!");
        return;
    }
    addFileUser();
});

function addFile() {
    if (inputByUserFile == false) {
        return;
    }
    if (inputByUserFile.length > 15) {
        alert("File name cannot be more than 15 characters");
        return;
    }
    let fileNameExists = resources.filter(r => r.pid == cfid).filter(r => r.rType == "file").some(f => f.name == inputByUserFile);
    if (fileNameExists) {
        alert("file name already exists");
        return;
    }
    id++;

    // Updating RAM
    resources.push({
        pid: cfid,
        id: id,
        name: inputByUserFile,
        rType: "file",
        styleBold : false,
        styleItalic : false,
        styleUnderline : false,
        styleBgColor : "#ffffff",
        styleFgColor : "#000000",
        styleFontFam : "serif",
        styleFontSize : "14pt",
        content : "This is new file",
        containerColor : "#f08080"
    });

    //Updating View
    addFileToHtml(inputByUserFile, id, cfid);

    //Updating Storage
    saveToLocalStorage();
}
function addFileToHtml(name, id, pid) {
    let fileTemplate = fileMainTemplate.content.querySelector(".file-box");
    let fileBoxDiv = document.importNode(fileTemplate, true);

    let menuBtn = fileBoxDiv.querySelector(".three-dots");
    let menu = fileBoxDiv.querySelector(".mini-menu");
    let fname = fileBoxDiv.querySelector(".file-name");
    let viewBtn = fileBoxDiv.querySelector("[action='view']");
    let renameBtn = fileBoxDiv.querySelector("[action='rename']");
    let deleteBtn = fileBoxDiv.querySelector("[action='delete']");
    let fileImg = fileBoxDiv.querySelector(".file-img");

    fname.innerText = name;
    fileBoxDiv.setAttribute("id", id);
    fileBoxDiv.setAttribute("pid", pid);

    let menuClosed = true;
    function toggleMenuDisplay() {
        if (menuClosed) {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }
        menuClosed = !menuClosed;
    }
    menuBtn.addEventListener("click", toggleMenuDisplay);
    menuBtn.parentNode.addEventListener("mouseleave", function () {
        menu.style.display = "none";
        menuClosed = true;
    })

    viewBtn.addEventListener("click", viewFile);
    fileImg.addEventListener("click", viewFileByImg);
    renameBtn.addEventListener("click",renameFile);
    deleteBtn.addEventListener("click", deleteFile);

    resourcesContainer.appendChild(fileBoxDiv);
}
function viewFile() {
    let fileBox = this.parentNode.parentNode.parentNode.parentNode;
    let id = parseInt(fileBox.getAttribute("id"));
    let file = resources.find(r=>r.id==id);
    
    if(breadCrumb.style.opacity==0){
        makeBreadCrumb(file.pid);
        addToHtml(resources,file.pid);
        return;
    }

    openTextApp(file);
}
function viewFileByImg() {
    let fileBox = this.parentNode.parentNode;
    let id = parseInt(fileBox.getAttribute("id"));
    let file = resources.find(r=>r.id==id);

    if(breadCrumb.style.opacity==0){
        makeBreadCrumb(file.pid);
        addToHtml(resources,file.pid);
        return;
    }
    openTextApp(file);
}
function renameFile() {
    let newName = prompt("Enter new name ");
    let currentFileBox = this.parentNode.parentNode.parentNode.parentNode;
    let currentName = currentFileBox.querySelector(".file-name");
    let tempid = parseInt(currentFileBox.getAttribute("id"));
    if (newName == false) {
        return;
    }
    if (newName.length > 15) {
        alert("File name cannot be more than 15 characters");
        return;
    }
    let fileNameExists = resources.filter(r => r.pid == cfid).filter(r => r.rType == "file").some(f => f.name == newName);
    if (fileNameExists) {
        alert("File name already exists");
        return;
    }

    let fileInArray = resources.find(r=>r.id==tempid);
    fileInArray.name = newName;
    currentName.innerText = newName;

    saveToLocalStorage();
}
function deleteFile() {
    let file = this.parentNode.parentNode.parentNode.parentNode;
    let folderIdToBeDelete = parseInt(file.getAttribute("id"));
    let oldFolder = file.querySelector(".file-name");
    let oldFolderName = oldFolder.innerText;
    let res = confirm("Are you sure you want to delete " + oldFolderName);

    if (res == false) {
        return;
    }
    
    let containsFolders = resources.some(f => f.pid == folderIdToBeDelete);
    if (containsFolders==true) {
        alert("Can't delete, file contains other folders");
        return;
    }

    let folderIndexInArray = resources.findIndex(f => f.id == folderIdToBeDelete);
    resources.splice(folderIndexInArray, 1);
    resourcesContainer.removeChild(file);
    saveToLocalStorage();
    
}


function addToHtml(arrToBeDisplay, parentId) {
    resourcesContainer.innerHTML = "";
    if(parentId==-2){
        arrToBeDisplay.forEach(element => {
            if (element.rType == "folder") {
                addFolderToHtml(element.name, element.id, element.pid);
            }
            if (element.rType == "file") {
                addFileToHtml(element.name, element.id, element.pid);
            }
        });
    }
    arrToBeDisplay.filter(r => r.pid == parentId).forEach(element => {
        if (element.rType == "folder") {
            addFolderToHtml(element.name, element.id, element.pid);
        }
        
        if (element.rType == "file") {
            addFileToHtml(element.name, element.id, element.pid);
        }
    });
}

function saveToLocalStorage() {
    let resourcesString = JSON.stringify(resources);
    localStorage.setItem("resources", resourcesString);
}
function loadFromLocalStorage() {
    resourcesString = localStorage.getItem("resources");
    if (resourcesString) {
        resources = JSON.parse(resourcesString);
        resources.forEach(r => {
            if (r.id > id) {
                id = r.id;
            }
        })
        addToHtml(resources, -1);
    }
}
loadFromLocalStorage();



let tempArr = []
function getParents(tid){
    if(tid == -1){
        return;
    }else{
        let ele = resources.find(r => r.id==tid);
        parId = ele.pid;
        eleName = ele.name;
        tempArr.push({
            name : eleName,
            id : tid
        })
        getParents(parId);
    }
}

function makeBreadCrumb(tempId){
    tempArr = [];
    getParents(tempId);
    breadCrumb.style.opacity = "1";
    breadCrumb.style['pointer-events'] = 'all';
    breadCrumb.innerHTML ="";
    let temp = `<a class="path" id="-1">Root</a>`
    breadCrumb.innerHTML = temp;
    let tempRoot = breadCrumb.querySelector("a");
    tempRoot.addEventListener("click",navigateBreadCrumb);
    tempArr = tempArr.reverse();
    breadCrumbTemplate = breadCrumbMainTemplate.content.querySelector(".img-path");
    tempArr.forEach(e => {
        let pathContainer = document.importNode(breadCrumbTemplate, true);
        let path = pathContainer.querySelector(".path");
        pathContainer.setAttribute("id", e.id);
        pathContainer.addEventListener("click", navigateBreadCrumb);
        path.innerText = e.name;
        breadCrumb.appendChild(pathContainer);
    })
}