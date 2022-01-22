(function () {
    let btn = document.querySelector(".three-dots");
    let mm = document.querySelector(".mini-menu");
    let mmc = document.querySelector(".mini-menu-container");
    let menuClosed = true;
    let c = mm.querySelector(".check");
    function toggleMenuDisplay(){
        if(menuClosed){
            mm.style.display ="flex";
        }
        else{
            mm.style.display ="none";
        }
        menuClosed = !menuClosed;
    }
    c.addEventListener("click",function(){
        alert("Here");
        mm.style.display ="none";
        menuClosed = true;
    })
    btn.addEventListener("click",function(){
        toggleMenuDisplay()
    });
    btn.parentElement.addEventListener("mouseleave",function(){
        mm.style.display ="none";
        menuClosed = true;
    })   
})();