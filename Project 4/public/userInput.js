var inputByUser;
function getUserInput(functionToBeCalled) {
    inputByUser = false;
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
                inputByUser = userInput;
                input.value = "";
                functionToBeCalled();
            }
        }
        closePopup();
    }

    function closePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");
    }

    openPopup();
}