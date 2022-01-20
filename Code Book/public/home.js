// variable declaration
let board = document.querySelector(".my-canvas");
let body = document.querySelector("body");
let tool = board.getContext("2d");
let pencil = document.querySelector(".pencil");
let line = document.querySelector(".line");
let rect = document.querySelector(".rect");
let eraser = document.querySelector(".eraser");
let clearBoard = document.querySelector(".clearBoard");
let color = document.querySelector(".choose-color");
let sizeChangeList = document.querySelectorAll(".inner-list");
let downloadPdf = document.querySelector(".downloadPdf");
let notes = document.querySelector("#ulNotes");
let addNotes = document.querySelector(".add");
let deleteNotes = document.querySelector(".clean-notes");
let codeEditor = document.querySelector(".codeEditor");
let code = document.querySelector(".code");

board.height = window.innerHeight*.70;
board.width = window.innerWidth*.75;

let cTool = "pencil";

let pencilSize = 6;
let eraserSize = 6;
let rectSize = 6;
let lineSize = 6;
let penColor = color.value;


// // To find the offset in board 
boardLeft = board.getBoundingClientRect().left+6;
boardTop = board.getBoundingClientRect().top+3;

let initialX, initialY, finalX, finalY;
let drawingMode = false;

// Drawing Feature
body.addEventListener("mousedown", function (e) {
    boardLeft = board.getBoundingClientRect().left + 6;
    boardTop = board.getBoundingClientRect().top + 3;

    initialX = e.clientX - boardLeft;
    initialY = e.clientY - boardTop;
    if (cTool == "pencil" || cTool == "eraser") {
        drawingMode = true;
        tool.beginPath();
        tool.moveTo(initialX, initialY);
    }

});
body.addEventListener("mouseup", function (e) {
    boardLeft = board.getBoundingClientRect().left + 6;
    boardTop = board.getBoundingClientRect().top + 3;

    if (cTool == "pencil" || cTool == "eraser") {
        drawingMode = false;

    } else if (cTool == "rect" || cTool == "line") {
        // rect, line
        finalX = e.clientX - boardLeft;;
        finalY = e.clientY - boardTop;
        let width = finalX - initialX;
        let height = finalY - initialY;
        if (cTool == "rect") {
            tool.strokeRect(initialX, initialY, width, height);
        } else if (cTool == "line") {
            tool.beginPath();
            tool.moveTo(initialX, initialY);
            tool.lineTo(finalX, finalY);
            tool.stroke();
        }
    }
});
body.addEventListener("mousemove", function (e) {

    boardLeft = board.getBoundingClientRect().left + 6;
    boardTop = board.getBoundingClientRect().top + 3;

    if (drawingMode == false)
        return;
    finalX = e.clientX - boardLeft;
    finalY = e.clientY - boardTop;
    tool.lineTo(finalX, finalY);
    tool.stroke();
    initialX = finalX;
    initialY = finalY;
});

pencil.addEventListener("click", function () {
    cTool = "pencil";
    tool.strokeStyle = penColor;
    tool.lineWidth = pencilSize;
});
line.addEventListener("click", function () {
    cTool = "line";
    tool.strokeStyle = penColor;
    tool.lineWidth = lineSize;
});
rect.addEventListener("click", function () {
    cTool = "rect";
    tool.strokeStyle = penColor;
    tool.lineWidth = rectSize;
});
eraser.addEventListener("click", function () {
    cTool = "eraser";
    tool.strokeStyle = "white";
    tool.lineWidth = eraserSize;
});
clearBoard.addEventListener("click", function () {
    let res = confirm("Do you really want to clear the board?");
    if (res == true) {
        tool.clearRect(0, 0, window.innerWidth, window.innerHeight);
    } else {
        return;
    }
});

// Color change
color.addEventListener("change", function () {
    penColor = color.value;
    if (cTool != "eraser") {
        tool.strokeStyle = penColor;
    }

});

// Download as PDF
window.jsPDF = window.jspdf.jsPDF;
downloadPdf.addEventListener("click", function () {
    let pdfH = board.height;
    let pdfW = board.width;
    let pdf;
    if (pdfW > pdfH) {
        pdf = new jsPDF('l', 'px', [pdfW, pdfH]);
    }
    else {
        pdf = new jsPDF('p', 'px', [pdfH, pdfW]);
    }
    pdfW = pdf.internal.pageSize.getWidth();
    pdfH = pdf.internal.pageSize.getHeight();
    pdf.addImage(board, 'PNG', 0, 0, pdfW, pdfH);
    pdf.save("download.pdf");
})


addNotes.addEventListener("click", function () {
    let alreadyNotes = document.querySelectorAll(".sticky");
    if (alreadyNotes) {
        if (alreadyNotes.length >= 3) {
            alert("Notes Limit Reached !");
            return;
        }
    }
    let sticky = document.createElement("div");
    sticky.setAttribute("class", "sticky");
    sticky.innerHTML = `<div class="navbar">
                    <div class="close" title="Delete this note"></div>
                </div>
                <textarea name="" class="textarea"></textarea>`;
    notes.appendChild(sticky);
    let close = sticky.querySelector(".close");
    let textArea = sticky.querySelector("textarea");
    close.addEventListener("click", function () {
        let res = confirm("Do you want to delete this note ?");
        if (res == true) {
            sticky.remove();
        } else {
            return;
        }
    })
})
deleteNotes.addEventListener("click", function () {

    let alreadyNotes = document.querySelectorAll(".sticky");
    if (alreadyNotes) {
        if (alreadyNotes.length == 0) {
            alert("No Notes Present");
            return;
        }
    }
    let res = confirm("Do you want to delete all notes");
    if (res == true) {
        notes.innerHTML = "";
    } else {
        return;
    }
})

let isCodeClosed = true;
codeEditor.addEventListener("click", function () {
    if (isCodeClosed) {
        code.style.display = "block";
    } else {
        code.style.display = "none";
    }
    isCodeClosed = !isCodeClosed;
})







let penSizes = sizeChangeList[0].querySelectorAll("li");
penSizes[0].addEventListener("click",function(){
    cTool = "pencil";
    pencilSize = 2;
    tool.strokeStyle = penColor;
    tool.lineWidth = pencilSize;
});

penSizes[1].addEventListener("click",function(){
    cTool = "pencil";
    pencilSize = 10;
    tool.strokeStyle = penColor;
    tool.lineWidth = pencilSize;
});
penSizes[2].addEventListener("click",function(){
    cTool = "pencil";
    pencilSize = 18;
    tool.strokeStyle = penColor;
    tool.lineWidth = pencilSize;
});




let lineSizes = sizeChangeList[1].querySelectorAll("li");
lineSizes[0].addEventListener("click",function(){
    cTool = "line";
    lineSize = 2;
    tool.strokeStyle = penColor;
    tool.lineWidth = lineSize;
});

lineSizes[1].addEventListener("click",function(){
    cTool = "line";
    lineSize = 10;
    tool.strokeStyle = penColor;
    tool.lineWidth = lineSize;
});
lineSizes[2].addEventListener("click",function(){
    cTool = "line";
    lineSize = 18;
    tool.strokeStyle = penColor;
    tool.lineWidth = lineSize;
});



let rectSizes = sizeChangeList[2].querySelectorAll("li");
rectSizes[0].addEventListener("click",function(){
    cTool = "rect";
    rectSize = 2;
    tool.strokeStyle = penColor;
    tool.lineWidth = rectSize;
});

rectSizes[1].addEventListener("click",function(){
    cTool = "rect";
    rectSize = 10;
    tool.strokeStyle = penColor;
    tool.lineWidth = rectSize;
});
rectSizes[2].addEventListener("click",function(){
    cTool = "rect";
    rectSize = 18;
    tool.strokeStyle = penColor;
    tool.lineWidth = rectSize;
});


let eraserSizes = sizeChangeList[3].querySelectorAll("li");
eraserSizes[0].addEventListener("click",function(){
    cTool = "eraser";
    eraserSize = 2;
    tool.strokeStyle = "white";
    tool.lineWidth = eraserSize;
});

eraserSizes[1].addEventListener("click",function(){
    cTool = "eraser";
    eraserSize = 10;
    tool.strokeStyle = "white";
    tool.lineWidth = eraserSize;
});
eraserSizes[2].addEventListener("click",function(){
    cTool = "eraser";
    eraserSize = 18;
    tool.strokeStyle = "white";
    tool.lineWidth = eraserSize;
});

