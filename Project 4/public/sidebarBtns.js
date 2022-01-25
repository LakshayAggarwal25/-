let rootSBtn = document.querySelector(".root-list");
let folderSBtn = document.querySelector(".folder-list");
let fileSBtn = document.querySelector(".file-list");

rootSBtn.addEventListener("click",()=>{
    addToHtml(resources,-1);
    breadCrumb.style.opacity = "1";
    breadCrumb.style['pointer-events'] = 'all';
    breadCrumb.innerHTML ="";
    let temp = `<a class="path" id="-1">Root</a>`
    breadCrumb.innerHTML = temp;
    let tempRoot = breadCrumb.querySelector("a");
    tempRoot.addEventListener("click",navigateBreadCrumb);
})

folderSBtn.addEventListener("click",()=>{
    let onlyFoldersArray = resources.filter(r=>r.rType == "folder");
    breadCrumb.style.opacity = "0";
    breadCrumb.style['pointer-events'] = 'none';
    addToHtml(onlyFoldersArray,-2);
})

fileSBtn.addEventListener("click",()=>{
    let onlyFilesArray = resources.filter(r=>r.rType == "file");
    breadCrumb.style.opacity = "0";
    breadCrumb.style['pointer-events'] = 'none';
    addToHtml(onlyFilesArray,-2);
})