let searchByUser = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search");

searchBtn.addEventListener("click",()=>{
    searchInput = searchByUser.value;
    let temp = validate(searchInput);
    if(temp == false){
        searchByUser.value="";
        alert("Input not valid!!");
        return;
    }
    breadCrumb.style.opacity = "0";
    breadCrumb.style['pointer-events'] = 'none';
    let arr = resources.filter(r=>{
        return r.name.includes(searchInput);
    })
    addToHtml(arr,-2);
    searchByUser.value="";
})

function validate(str){
    if(str){
        if(str.trim().length>0){
            return true;
        }
    }
    return false;
}