let folderAddBtn = document.querySelector("#add-button");
let folderTemplate = document.querySelector(".folder-template");
let folderContainer = document.querySelector(".folders-container");
let breadCrumb = document.querySelector(".bread-crumb");
let rootPath = document.querySelector(".path");
let currentFolderId = -1;
let folderId = -1;
let folders = [];

folderAddBtn.addEventListener("click",addFolder);
rootPath.addEventListener("click",navigateBreadCrumb);

function addFolder(){
    let folderName = prompt("Enter folder name ");
    if(folderName){
        if(folderName.length > 15){
            alert("Folder name can't be more than 15 characters");
            return;
        }
        let folderNameExists = folders.filter(f => f.pid == currentFolderId).some(folder => folder.name == folderName);
        if(!folderNameExists){
            folderId++;
            folders.push(
                {
                    id : folderId,
                    name : folderName,
                    pid : currentFolderId
                }
            );
            addFolderToHTML(folderName,folderId,currentFolderId);
            saveToLocalStorage();
        }else{
            alert("Folder name already exists, please enter new name");
        }
    }
}

function navigateBreadCrumb(){
    // let fname = this.innerHTML;
    let currentFolderId = parseInt(this.getAttribute("fid"));

    folderContainer.innerHTML = "";
    folders.filter(f=>f.pid == currentFolderId).forEach(f=>{
        addFolderToHTML(f.name,f.id,f.pid);
    })

    while(this.nextSibling){
        this.parentNode.removeChild(this.nextSibling);
    }

}

function viewFolder(){
    let currentFolder = this.parentNode.parentNode.parentNode.parentNode;
    let folder = currentFolder.querySelector(".folder-name");
    currentFolderId = parseInt(folder.getAttribute("fid"));

    let pathTemp = folderTemplate.content.querySelector(".img-path");
    let pathContainer  = document.importNode(pathTemp,true);
    let path = pathContainer.querySelector(".path");
    pathContainer.setAttribute("fid",currentFolderId);
    pathContainer.addEventListener("click",navigateBreadCrumb);


    path.innerText = folder.innerText;

    breadCrumb.appendChild(pathContainer);

    folderContainer.innerHTML = "";
    folders.filter(f=>f.pid == currentFolderId).forEach(f=>{
        addFolderToHTML(f.name,f.id,f.pid);
    })
}

function viewFolderByImg(){
    let currentFolder = this.parentNode.parentNode;
    let folder = currentFolder.querySelector(".folder-name");
    currentFolderId = parseInt(folder.getAttribute("fid"));

    let pathTemp = folderTemplate.content.querySelector(".img-path");
    let pathContainer  = document.importNode(pathTemp,true);
    let path = pathContainer.querySelector(".path");
    pathContainer.setAttribute("fid",currentFolderId);
    pathContainer.addEventListener("click",navigateBreadCrumb);


    path.innerText = folder.innerText;

    breadCrumb.appendChild(pathContainer);

    folderContainer.innerHTML = "";
    folders.filter(f=>f.pid == currentFolderId).forEach(f=>{
        addFolderToHTML(f.name,f.id,f.pid);
    })
}

function editFolder(){
    let currentFolder = this.parentNode.parentNode.parentNode.parentNode;
    let oldFolder = currentFolder.querySelector(".folder-name");
    let oldFolderName = oldFolder.innerText;
    let newFolderName = prompt("Enter new name for " + oldFolderName);
    if(newFolderName){
        if(newFolderName.length > 15){
            alert("Folder name can't be more than 15 characters");
            return;
        }
        if(newFolderName!=oldFolderName){
            let folderNameAlreadyExists = folders.filter(folder=>folder.pid == currentFolderId).some(folder=>folder.name == newFolderName);
            if(!folderNameAlreadyExists){   
                // Updating in folders array
                let folderInArray = folders.filter(folder=>folder.pid == currentFolderId).find(f => f.name == oldFolderName);
                folderInArray.name = newFolderName;
                //Updating on html
                oldFolder.innerText = newFolderName;
                // updating in local storage
                saveToLocalStorage();
            }else{
                alert("Folder name already Exists!!!");
            }
        }else{
            alert("This is same as old folder name, enter something new");
        }
    }
}

function deleteFolder(){
    let folder = this.parentNode.parentNode.parentNode.parentNode;
    let oldFolder = folder.querySelector(".folder-name");
    let oldFolderName = oldFolder.innerText; 
    let res = confirm("Are you sure you want to delete " + oldFolderName);
    let folderIdToBeDelete = parseInt(oldFolder.getAttribute("fid"));

    if(res){
        
        let containsFolders = folders.some(f => f.pid == folderIdToBeDelete);
        if(!containsFolders){

            let folderIndexInArray = folders.findIndex(f => f.id == folderIdToBeDelete);
            folders.splice(folderIndexInArray,1);
            folderContainer.removeChild(folder);
            saveToLocalStorage();
        }else{
            alert("Can't delete, folder contains other folders")
        }
    }
}

function addFolderToHTML(folderName,folderID,parentID){
    let folderTemp = folderTemplate.content.querySelector(".folder-box");
    let folder  = document.importNode(folderTemp,true);

    let menuBtn = folder.querySelector(".three-dots");
    let menu = folder.querySelector(".mini-menu");
    let viewBtn = folder.querySelector("[action='view']");
    let editBtn = folder.querySelector("[action='edit']");
    let deleteBtn = folder.querySelector("[action='delete']");
    let fname = folder.querySelector(".folder-name");
    let folderImg = folder.querySelector(".folder-img");

    fname.innerText = folderName;
    fname.setAttribute("fid",folderID);
    fname.setAttribute("pid",parentID);

    let menuClosed = true;
    function toggleMenuDisplay(){
        if(menuClosed){
            menu.style.display = "flex";
        }else{
            menu.style.display = "none";
        }
        menuClosed = !menuClosed;
    }
    menuBtn.addEventListener("click",toggleMenuDisplay);
    menuBtn.parentNode.addEventListener("mouseleave",function(){
        menu.style.display = "none";
        menuClosed = true;
    })

    viewBtn.addEventListener("click",viewFolder);
    folderImg.addEventListener("click",viewFolderByImg);    
    editBtn.addEventListener("click",editFolder);
    deleteBtn.addEventListener("click",deleteFolder);

    folderContainer.appendChild(folder);

}

function saveToLocalStorage(){
    let foldersString = JSON.stringify(folders);
    localStorage.setItem("folders",foldersString);
}

function loadFromLocalStorage(){
    let foldersString = localStorage.getItem("folders");
    if(foldersString){
        folders = JSON.parse(foldersString);
        folders.forEach(folder => 
            {
                if(folder.id > folderId){
                    folderId = folder.id;
                }
                if(folder.pid == currentFolderId){
                    addFolderToHTML(folder.name,folder.id);
                }
            }
        );
    }
}
loadFromLocalStorage();