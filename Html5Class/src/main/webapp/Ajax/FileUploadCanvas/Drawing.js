var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var flag = false;

//開始畫圖
canvas.addEventListener("mousedown", function () {
    flag = true;
    context.beginPath();
    context.moveTo(event.offsetX, event.offsetY);
    var color = document.querySelector("#color1").value;
    var w = document.querySelector("#number1").value;
    context.strokeStyle = color;
    context.lineWidth = w;
}, false);

//畫圖中
canvas.addEventListener("mousemove", function () {
    if (flag) {
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
    }
}, false);

//結束畫圖
canvas.addEventListener("mouseup", function () {
    flag = false;
    context.closePath();
}, false);


document.querySelector("#text1").addEventListener("blur", function () {

    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.font = "italic 2em 標楷體";
    context.textAlign = "center";
    context.fillStyle = "purple";
    context.fillText(this.value, x, y);
}, false);

document.querySelector("#file1").addEventListener("change", function () {
    var imageObj = new Image();
    imageObj.onload = function () {
        for (var i = 0; i < 20; i++) {
            var w = Math.floor(Math.random() * 40);    //設定繪製圖型的大小
            var x = Math.floor(Math.random() * canvas.width); //設定繪製圖型位置的x座標
            var y = Math.floor(Math.random() * canvas.height); //設定繪製圖型位置的y座標
            context.drawImage(imageObj, x, y, w, w);
        }
    }

    imageObj.src = this.files[0].name;
}, false);
if (!window.requestFileSystem) {
    window.requestFileSystem = window.mozRequestFileSystem || window.webkitRequestFileSystem || window.msRequestFileSystem;
}
//儲存
document.querySelector("#buttonSave").addEventListener("click", function () {
    var myImg = document.querySelector("#img1");
    myImg.src = canvas.toDataURL("image/png");

    if (navigator.onLine) {
        //如果連線時，使用Ajax將圖存回Server端
        console.log("連線中")
        var canvasData = canvas.toDataURL("image/png");
        canvasData = canvasData.replace('data:image/png;base64,', '');

        //to do 將canvasData存回Server端
        //"imageData=" + canvasData + "&id=" + new Date().getTime()
      
    } else {
        //連線中斷是，暫時存放在Client端
        console.log("離線中")
        var worker = new Worker("FileSystemWorker.js");
        worker.postMessage(canvas.toDataURL("image/png"));
        worker.addEventListener("message", function (event) {
            alert(event.data);
        }, false);
    }
}, false);



//從fileSystem中讀出圖     
document.querySelector("#buttonRead").addEventListener("click", function () {
    var worker = new Worker("ReaderWorker.js");
    worker.postMessage();
    worker.addEventListener("message", function (event) {
        var imageObj = new Image();
        imageObj.src = event.data;
        imageObj.addEventListener("load", function () {
            context.drawImage(imageObj, 0, 0);
        }, false)
    }, false);
}, false);


//清除
document.querySelector("#buttonClear").addEventListener("click", function () {
    location.reload();
}, false);






