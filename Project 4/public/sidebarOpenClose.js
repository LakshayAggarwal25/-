(function(){
    let sidebarBtn = document.querySelector(".sidebar-btn");
    let sidebarContainer = document.querySelector(".sidebar-container");
    let isSideBarOpen = true;
    sidebarBtn.addEventListener("click", toggleSideBar);
    function toggleSideBar() {
        if (isSideBarOpen) {
            let opacity = 1;
            document.body.style.cursor = "not-allowed";
            sidebarBtn.style['pointer-events'] = 'none';

            let intervalID = setInterval(function () {
                if (opacity > 0) {
                    opacity = opacity - 0.1;
                    sidebarContainer.style.opacity = opacity;
                } else {
                    sidebarBtn.style['pointer-events'] = 'all';
                    document.body.style.cursor = "auto";
                    sidebarContainer.style.visibility = "hidden";
                    clearInterval(intervalID);
                }
            }, 45);
        } else {
            let opacity = 0;
            sidebarContainer.style.opacity = opacity;
            let intervalID = setInterval(function () {
                if (opacity < 1) {
                    opacity = opacity + 0.1;
                    sidebarContainer.style.opacity = opacity;
                } else {
                    clearInterval(intervalID);
                }
            }, 45);
            sidebarContainer.style.visibility = "visible";
        }
        isSideBarOpen = !isSideBarOpen;
    }
})();