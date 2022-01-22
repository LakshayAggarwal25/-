let folderAddBtn = document.querySelector("#add-button");
let foldersContainer = document.querySelector(".folders-container");
let folderTemplate = document.querySelector(".folder-template");
let folders = [];
let currentFolderId = -1;
let folderId = -1;

folderAddBtn.addEventListener("click", addFolder);
function addFolder() {
    let fname = prompt("Enter folder's name");
    if (!!fname) {
        let exists = folders.some(f => f.name == fname);
        if (exists == false) {
            folderId++;
            folders.push({
                id: folderId,
                name: fname
            });
            addFolderHTML(fname, folderId);
            saveToStorage();
        } else {
            alert(fname + " already exists");
        }
    }
}

function editFolder() {
    let divFolder = this.parentNode.parentNode.parentNode;
    let divName = divFolder.querySelector("[action='set-name']");
    let ofname = divName.innerHTML;

    let nfname = prompt("Enter new name for " + ofname);
    if (!!nfname) {
        if (nfname != ofname) {
            let exists = folders.some(f => f.name == nfname);
            if (exists == false) {
               let folder = folders.find(f => f.name == ofname);
               folder.name = nfname;
               divName.innerHTML = nfname;
               saveToStorage();
            } else {
                alert(nfname + " already exists");
            }
        } else {
            alert("This is the old name only. Please enter something new.");
        }
    }
}

function deleteFolder() {
    let divFolder = this.parentNode.parentNode.parentNode;
    let divName = divFolder.querySelector("[ action='set-name']");

    let flag = confirm("Are you sure you want to delete " + divName.innerHTML + "?");
    if (flag == true) {
        // ram
        let fidx = folders.findIndex(f => f.name == divName.innerHTML);
        folders.splice(fidx, 1);

        // html
        foldersContainer.removeChild(divFolder);

        // storage
        saveToStorage();
    }
}

function addFolderHTML(folderName, folderId) {
    let folderTemp = folderTemplate.content.querySelector(".folder-box");
    let folder = document.importNode(folderTemp, true);

    let fname = folder.querySelector("[action='set-name']");
    let editBtn = folder.querySelector("[action='edit']");
    let deleteBtn = folder.querySelector("[action='delete']");

    fname.setAttribute("fid", folderId);
    fname.innerText = folderName;
    let btn = folder.querySelector(".three-dots");
    let mm = folder.querySelector(".mini-menu");
    let menuClosed = true;
    function toggleMenuDisplay(){
        if(menuClosed){
            mm.style.display ="flex";
        }
        else{
            mm.style.display ="none";
        }
        menuClosed = !menuClosed;
    }
    btn.addEventListener("click",function(){
        toggleMenuDisplay()
    });
    btn.parentElement.addEventListener("mouseleave",function(){
        mm.style.display ="none";
        menuClosed = true;
    })
    editBtn.addEventListener("click", editFolder);
    deleteBtn.addEventListener("click", deleteFolder);

    foldersContainer.appendChild(folder);
}

function saveToStorage() {
    let foldersJSON = JSON.stringify(folders);
    localStorage.setItem("foldersList", foldersJSON);
}

function loadFromStorage() {
    let foldersJSON = localStorage.getItem("foldersList");
    if (!!foldersJSON) {
        folders = JSON.parse(foldersJSON);
        folders.forEach(f => {
            if (f.id > folderId) {
                folderId = f.id;
            }
            addFolderHTML(f.name, f.id);
        });
    }
}
loadFromStorage();