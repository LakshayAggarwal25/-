let folderAddBtn = document.querySelector("#add-button");
let folderTemplate = document.querySelector(".folder-template");
let folderContainer = document.querySelector(".folders-container");
let breadCrumb = document.querySelector(".bread-crumb");
let rootPath = document.querySelector(".path");

let fileAddBtn = document.querySelector("#add-file-button");
let fileTemplate = document.querySelector(".text-files-template");

let notepadAppTemplate = document.querySelector(".notepad-template");
let textApp = document.querySelector(".text-app");
let textAppTitle = document.querySelector(".text-app-title");
let textAppMenubar = document.querySelector(".text-app-menubar");
let textAppBody = document.querySelector(".text-app-body");

let currentFolderId = -1;
let resourceId = -1;
let resources = [];

folderAddBtn.addEventListener("click", addFolder);
rootPath.addEventListener("click", navigateBreadCrumb);

fileAddBtn.addEventListener("click", addFile);

function addFolder() {
    let folderName = prompt("Enter folder name ");
    folderName = folderName.trim();
    if (folderName) {
        if (folderName.length > 15) {
            alert("Folder name can't be more than 15 characters");
            return;
        }
        let folderNameExists = resources.filter(f => f.pid == currentFolderId).filter(r => r.resourceType == "folder").some(folder => folder.name == folderName);
        if (!folderNameExists) {
            resourceId++;
            resources.push(
                {
                    id: resourceId,
                    name: folderName,
                    pid: currentFolderId,
                    resourceType: "folder"
                }
            );
            addFolderToHTML(folderName, resourceId, currentFolderId);
            saveToLocalStorage();
        } else {
            alert("Folder name already exists, please enter new name");
        }
    }
}
function addFile() {
    let fileName = prompt("Enter file name ");
    fileName = fileName.trim();
    if (fileName) {
        if (fileName.length > 15) {
            alert("File name can't be more than 15 characters");
            return;
        }
        let fileNameExists = resources.filter(r => r.pid == currentFolderId).filter(r => r.resourceType == "file").some(r => r.name == fileName);
        if (!fileNameExists) {
            resourceId++;
            resources.push({
                id: resourceId,
                name: fileName,
                pid: currentFolderId,
                resourceType: "file",
                isBold: false,
                isItalic: false,
                isUnderline: false,
                BgColor: "#000000",
                textColor: "#ffffff",
                fontFamily: "monospace",
                fontSize: 10,
                content: "New File"
            });

            addFileToHTML(fileName, resourceId, currentFolderId);

            saveToLocalStorage();
        } else {
            alert("File name already exists !!!");
        }
    }
}
function navigateBreadCrumb() {
    // let fname = this.innerHTML;
    currentFolderId = parseInt(this.getAttribute("fid"));

    folderContainer.innerHTML = "";
    resources.filter(f => f.pid == currentFolderId).forEach(resource => {
        if (resource.resourceType == "folder") {
            addFolderToHTML(resource.name, resource.id, resource.pid);
        } if (resource.resourceType == "file") {
            addFileToHTML(resource.name, resource.id, resource.pid);
        }
    })

    while (this.nextSibling) {
        this.parentNode.removeChild(this.nextSibling);
    }

}

function viewFolder() {
    let currentFolder = this.parentNode.parentNode.parentNode.parentNode;
    let folder = currentFolder.querySelector(".folder-name");
    currentFolderId = parseInt(folder.getAttribute("fid"));

    let pathTemp = folderTemplate.content.querySelector(".img-path");
    let pathContainer = document.importNode(pathTemp, true);
    let path = pathContainer.querySelector(".path");
    pathContainer.setAttribute("fid", currentFolderId);
    pathContainer.addEventListener("click", navigateBreadCrumb);


    path.innerText = folder.innerText;

    breadCrumb.appendChild(pathContainer);

    folderContainer.innerHTML = "";
    resources.filter(f => f.pid == currentFolderId).forEach(resource => {
        if (resource.resourceType == "folder") {
            addFolderToHTML(resource.name, resource.id, resource.pid);
        } if (resource.resourceType == "file") {
            addFileToHTML(resource.name, resource.id, resource.pid);
        }
    })
}

function viewFolderByImg() {
    let currentFolder = this.parentNode.parentNode;
    let folder = currentFolder.querySelector(".folder-name");
    currentFolderId = parseInt(folder.getAttribute("fid"));

    let pathTemp = folderTemplate.content.querySelector(".img-path");
    let pathContainer = document.importNode(pathTemp, true);
    let path = pathContainer.querySelector(".path");
    pathContainer.setAttribute("fid", currentFolderId);
    pathContainer.addEventListener("click", navigateBreadCrumb);


    path.innerText = folder.innerText;

    breadCrumb.appendChild(pathContainer);

    folderContainer.innerHTML = "";
    resources.filter(f => f.pid == currentFolderId).forEach(resource => {
        if (resource.resourceType == "folder") {
            addFolderToHTML(resource.name, resource.id, resource.pid);
        } if (resource.resourceType == "file") {
            addFileToHTML(resource.name, resource.id, resource.pid);
        }
    })
}

function editFolder() {
    let currentFolder = this.parentNode.parentNode.parentNode.parentNode;
    let oldFolder = currentFolder.querySelector(".folder-name");
    let oldFolderName = oldFolder.innerText;
    let newFolderName = prompt("Enter new name for " + oldFolderName);
    newFolderName = newFolderName.trim();
    if (newFolderName) {
        if (newFolderName.length > 15) {
            alert("Folder name can't be more than 15 characters");
            return;
        }
        if (newFolderName != oldFolderName) {
            let folderNameAlreadyExists = resources.filter(folder => folder.pid == currentFolderId).some(folder => folder.name == newFolderName);
            if (!folderNameAlreadyExists) {
                // Updating in folders array
                let folderInArray = resources.filter(folder => folder.pid == currentFolderId).find(f => f.name == oldFolderName);
                folderInArray.name = newFolderName;
                //Updating on html
                oldFolder.innerText = newFolderName;
                // updating in local storage
                saveToLocalStorage();
            } else {
                alert("Folder name already Exists!!!");
            }
        } else {
            alert("This is same as old folder name, enter something new");
        }
    }
}
function editFile() {
    let fileBox = this.parentNode.parentNode.parentNode.parentNode;
    let file = fileBox.querySelector(".text-file-name");
    let fileName = file.innerText;
    let newFileName = prompt("Enter new name for " + fileName);
    let fileId = parseInt(file.getAttribute("fid"));
    newFileName = newFileName.trim();
    if (newFileName) {
        if (newFileName.length > 15) {
            alert("File name can't be more than 15 characters");
            return;
        }
        if (newFileName != fileName) {

            let fileNameAlreadyExists = resources.filter(folder => folder.pid == currentFolderId).filter(r => r.resourceType == "file").some(folder => folder.name == newFileName);
            if (!fileNameAlreadyExists) {
                // Updating in folders array
                let fileInArray = resources.filter(r => r.id == fileId);
                fileInArray.name = newFileName;
                textAppTitle.innerText = newFileName;
                //Updating on html
                file.innerText = newFileName;
                // updating in local storage
                saveToLocalStorage();
            } else {
                alert("File name already Exists!!!");
            }
        } else {
            alert("This is same as old File name, enter something new");
        }
    }
}

function deleteFolder() {
    let folder = this.parentNode.parentNode.parentNode.parentNode;
    let oldFolder = folder.querySelector(".folder-name");
    let oldFolderName = oldFolder.innerText;
    let res = confirm("Are you sure you want to delete " + oldFolderName);
    let folderIdToBeDelete = parseInt(oldFolder.getAttribute("fid"));

    if (res) {

        let containsFolders = resources.some(f => f.pid == folderIdToBeDelete);
        if (!containsFolders) {

            let folderIndexInArray = resources.findIndex(f => f.id == folderIdToBeDelete);
            resources.splice(folderIndexInArray, 1);
            folderContainer.removeChild(folder);
            saveToLocalStorage();
        } else {
            alert("Can't delete, folder contains other folders")
        }
    }
}
function deleteFile() {
    let fileBox = this.parentNode.parentNode.parentNode.parentNode;
    let file = fileBox.querySelector(".text-file-name");
    let fileName = file.innerText;
    let openFileId = parseInt(textAppTitle.getAttribute("fid"));
    let fileIdToBeDelete = parseInt(file.getAttribute("fid"));
    if (textApp.style.display == "flex" && openFileId == fileIdToBeDelete) {
        alert("Error!!! This file is currently open");
        return;
    }
    let res = confirm("Are you sure you want to delete " + fileName);

    if (res) {

        let folderIndexInArray = resources.findIndex(f => f.id == fileIdToBeDelete);
        resources.splice(folderIndexInArray, 1);
        folderContainer.removeChild(fileBox);
        saveToLocalStorage();
    }
}

function addFolderToHTML(folderName, folderID, parentID) {
    let folderTemp = folderTemplate.content.querySelector(".folder-box");
    let folder = document.importNode(folderTemp, true);

    let menuBtn = folder.querySelector(".three-dots");
    let menu = folder.querySelector(".mini-menu");
    let viewBtn = folder.querySelector("[action='view']");
    let editBtn = folder.querySelector("[action='edit']");
    let deleteBtn = folder.querySelector("[action='delete']");
    let fname = folder.querySelector(".folder-name");
    let folderImg = folder.querySelector(".folder-img");

    fname.innerText = folderName;
    fname.setAttribute("fid", folderID);
    fname.setAttribute("pid", parentID);

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
    editBtn.addEventListener("click", editFolder);
    deleteBtn.addEventListener("click", deleteFolder);

    folderContainer.appendChild(folder);

}
function addFileToHTML(fileName, fileId, parentId) {
    let textFile = fileTemplate.content.querySelector(".text-file-box");
    let tFile = document.importNode(textFile, true);

    let menuBtn = tFile.querySelector(".three-dots");
    let menu = tFile.querySelector(".mini-menu");
    let viewBtn = tFile.querySelector("[action='view']");
    let editBtn = tFile.querySelector("[action='edit']");
    let deleteBtn = tFile.querySelector("[action='delete']");
    let fname = tFile.querySelector(".text-file-name");
    let tFileImg = tFile.querySelector(".file-img");

    fname.innerText = fileName;
    fname.setAttribute("fid", fileId);
    fname.setAttribute("pid", parentId);

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
    tFileImg.addEventListener("click", viewFileByImg);
    editBtn.addEventListener("click", editFile);
    deleteBtn.addEventListener("click", deleteFile);

    folderContainer.appendChild(tFile);
}

function saveToLocalStorage() {
    let resourcesString = JSON.stringify(resources);
    localStorage.setItem("resources", resourcesString);
}
function loadFromLocalStorage() {
    let resourcesString = localStorage.getItem("resources");
    if (resourcesString) {
        resources = JSON.parse(resourcesString);
        resources.forEach(resource => {
            if (resource.id > resourceId) {
                resourceId = resource.id;
            }
            if (resource.pid == currentFolderId) {
                if (resource.resourceType == "folder") {
                    addFolderToHTML(resource.name, resource.id, resource.pid);
                } if (resource.resourceType == "file") {
                    addFileToHTML(resource.name, resource.id, resource.pid);
                }
            }
        }
        );
    }
}
loadFromLocalStorage();

function viewFile() {
    let fileBox = this.parentNode.parentNode.parentNode.parentNode;
    textApp.style.display = "flex";
    let cross = textApp.querySelector("[action='close-app']");
    cross.addEventListener("click", function () {
        textApp.style.display = "none";
    })
    let file = fileBox.querySelector(".text-file-name");
    let fileName = file.innerText;
    let fid = parseInt(file.getAttribute("fid"));

    let notepadTemp = notepadAppTemplate.content.querySelector(".notepad-app");
    let notepad = document.importNode(notepadTemp, true);
    let notepadMenu = notepad.querySelector(".notepad-menu");
    let notepadBody = notepad.querySelector(".notepad-body");

    let spanBold = notepadMenu.querySelector("[action='bold']");
    let spanItalic = notepadMenu.querySelector("[action='italic']");
    let spanUnderline = notepadMenu.querySelector("[action='underline']");
    let spanSave = notepadMenu.querySelector("[action='save']");
    let bgColor = notepadMenu.querySelector("[purpose='bg-color']");
    let textColor = notepadMenu.querySelector("[purpose='fg-color']");
    let fontFamily = notepadMenu.querySelector("[purpose='font-family']");
    let fontSize = notepadMenu.querySelector("[purpose='font-size']");


    textAppMenubar.innerHTML = "";
    textAppMenubar.appendChild(notepadMenu);

    textAppBody.innerHTML = "";
    textAppBody.appendChild(notepadBody);

    textAppTitle.innerText = fileName;
    textAppTitle.setAttribute("fid", fid);

    spanBold.addEventListener("click", makeNotepadBold);
    spanItalic.addEventListener("click", makeNotepadItalic);
    spanUnderline.addEventListener("click", makeNotepadUnderline);
    spanSave.addEventListener("click", saveNotepad);
    bgColor.addEventListener("change", changeNotepadBgColor);
    textColor.addEventListener("change", changeNotepadTextColor);
    fontFamily.addEventListener("change", changeNotepadFontFamily);
    fontSize.addEventListener("change", changeNotepadFontSize);

    let resource = resources.find(r => r.id == fid);
    let textArea = textAppBody.querySelector("textArea");

    spanBold.setAttribute("pressed", !resource.isBold);
    spanItalic.setAttribute("pressed", !resource.isItalic);
    spanUnderline.setAttribute("pressed", !resource.isUnderline);
    bgColor.value = resource.BgColor;
    textColor.value = resource.textColor;
    fontFamily.value = resource.fontFamily;
    fontSize.value = resource.fontSize;
    textArea.innerHTML = resource.content;


    spanBold.dispatchEvent(new Event("click"));
    spanItalic.dispatchEvent(new Event("click"));
    spanUnderline.dispatchEvent(new Event("click"));
    bgColor.dispatchEvent(new Event("change"));
    textColor.dispatchEvent(new Event("change"));
    fontFamily.dispatchEvent(new Event("change"));
    fontSize.dispatchEvent(new Event("change"));
}
function viewFileByImg() {
    let fileBox = this.parentNode.parentNode;
    textApp.style.display = "flex";
    let cross = textApp.querySelector("[action='close-app']");
    cross.addEventListener("click", function () {
        textApp.style.display = "none";
    })
    let file = fileBox.querySelector(".text-file-name");
    let fileName = file.innerText;
    let fid = parseInt(file.getAttribute("fid"));

    let notepadTemp = notepadAppTemplate.content.querySelector(".notepad-app");
    let notepad = document.importNode(notepadTemp, true);
    let notepadMenu = notepad.querySelector(".notepad-menu");
    let notepadBody = notepad.querySelector(".notepad-body");

    let spanBold = notepadMenu.querySelector("[action='bold']");
    let spanItalic = notepadMenu.querySelector("[action='italic']");
    let spanUnderline = notepadMenu.querySelector("[action='underline']");
    let spanSave = notepadMenu.querySelector("[action='save']");
    let bgColor = notepadMenu.querySelector("[purpose='bg-color']");
    let textColor = notepadMenu.querySelector("[purpose='fg-color']");
    let fontFamily = notepadMenu.querySelector("[purpose='font-family']");
    let fontSize = notepadMenu.querySelector("[purpose='font-size']");


    textAppMenubar.innerHTML = "";
    textAppMenubar.appendChild(notepadMenu);

    textAppBody.innerHTML = "";
    textAppBody.appendChild(notepadBody);

    textAppTitle.innerText = fileName;
    textAppTitle.setAttribute("fid", fid);

    spanBold.addEventListener("click", makeNotepadBold);
    spanItalic.addEventListener("click", makeNotepadItalic);
    spanUnderline.addEventListener("click", makeNotepadUnderline);
    spanSave.addEventListener("click", saveNotepad);
    bgColor.addEventListener("change", changeNotepadBgColor);
    textColor.addEventListener("change", changeNotepadTextColor);
    fontFamily.addEventListener("change", changeNotepadFontFamily);
    fontSize.addEventListener("change", changeNotepadFontSize);

    let resource = resources.find(r => r.id == fid);
    let textArea = textAppBody.querySelector("textArea");

    spanBold.setAttribute("pressed", !resource.isBold);
    spanItalic.setAttribute("pressed", !resource.isItalic);
    spanUnderline.setAttribute("pressed", !resource.isUnderline);
    bgColor.value = resource.BgColor;
    textColor.value = resource.textColor;
    fontFamily.value = resource.fontFamily;
    fontSize.value = resource.fontSize;
    textArea.innerHTML = resource.content;


    spanBold.dispatchEvent(new Event("click"));
    spanItalic.dispatchEvent(new Event("click"));
    spanUnderline.dispatchEvent(new Event("click"));
    bgColor.dispatchEvent(new Event("change"));
    textColor.dispatchEvent(new Event("change"));
    fontFamily.dispatchEvent(new Event("change"));
    fontSize.dispatchEvent(new Event("change"));
}
function makeNotepadBold() {
    let textArea = textAppBody.querySelector("textArea");
    let isPressed = this.getAttribute("pressed") == "true";
    if (isPressed == false) {
        this.setAttribute("pressed", true);
        textArea.style.fontWeight = "bold";
    } else {
        this.setAttribute("pressed", false);
        textArea.style.fontWeight = "normal";
    }
}
function makeNotepadItalic() {
    let textArea = textAppBody.querySelector("textArea");
    let isPressed = this.getAttribute("pressed") == "true";
    if (isPressed == false) {
        this.setAttribute("pressed", true);
        textArea.style.fontStyle = "italic";
    } else {
        this.setAttribute("pressed", false);
        textArea.style.fontStyle = "normal";
    }
}
function makeNotepadUnderline() {
    let textArea = textAppBody.querySelector("textArea");
    let isPressed = this.getAttribute("pressed") == "true";
    if (isPressed == false) {
        this.setAttribute("pressed", true);
        textArea.style.textDecoration = "underline";
    } else {
        this.setAttribute("pressed", false);
        textArea.style.textDecoration = "none";
    }
}
function saveNotepad() {

    let fid = parseInt(textAppTitle.getAttribute("fid"));
    let resource = resources.find(r => r.id == fid);
    let textArea = textAppBody.querySelector("textArea");


    let spanBold = textAppMenubar.querySelector("[action='bold']");
    let spanItalic = textAppMenubar.querySelector("[action='italic']");
    let spanUnderline = textAppMenubar.querySelector("[action='underline']");
    let bgColor = textAppMenubar.querySelector("[purpose='bg-color']");
    let textColor = textAppMenubar.querySelector("[purpose='fg-color']");
    let fontFamily = textAppMenubar.querySelector("[purpose='font-family']");
    let fontSize = textAppMenubar.querySelector("[purpose='font-size']");

    resource.isBold = spanBold.getAttribute("pressed") == "true";
    resource.isItalic = spanItalic.getAttribute("pressed") == "true";;
    resource.isUnderline = spanUnderline.getAttribute("pressed") == "true";;
    resource.BgColor = bgColor.value;
    resource.textColor = textColor.value;
    resource.fontFamily = fontFamily.value;
    resource.fontSize = fontSize.value;
    resource.content = textArea.value;

    saveToLocalStorage();


}
function changeNotepadFontSize() {
    let fontSize = this.value;
    let textArea = textAppBody.querySelector("textArea");
    textArea.style.fontSize = fontSize;
}
function changeNotepadFontFamily() {
    let fontFamily = this.value;
    let textArea = textAppBody.querySelector("textArea");
    textArea.style.fontFamily = fontFamily;
}
function changeNotepadBgColor() {
    let color = this.value;
    let textArea = textAppBody.querySelector("textArea");
    textArea.style.backgroundColor = color;
}
function changeNotepadTextColor() {
    let color = this.value;
    let textArea = textAppBody.querySelector("textArea");
    textArea.style.color = color;
}
