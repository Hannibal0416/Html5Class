var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var flag = false;

//開始畫圖
canvas.addEventListener("mousedown", function () {
    flag = true;
    
    //to do 開始一個新路徑，產生後再使用繪圖指令來設定路徑。
    context.beginPath();

    //to do 移動畫筆到指定的滑鼠點選的位置上
    //使用event.offsetX 取得滑鼠的x軸座標點
    //使用event.offsetY 取得滑鼠的y軸座標點
    context.moveTo(event.offsetX, event.offsetY);

    //讀取使用者選取的顏色
    var color = document.querySelector("#color1").value;
    //讀取使用者設定線條的寬度
    var w = document.querySelector("#number1").value;

    //to do 設定線條顏色
    context.strokeStyle = color;

    //to do 設定線條寬度
    context.lineWidth = w;
}, false);

//畫圖中
canvas.addEventListener("mousemove", function () {
    if (flag) {
        //從目前繪圖點畫一條直線到滑鼠點選的位置上
        //使用event.offsetX 取得滑鼠的x軸座標點
        //使用event.offsetY 取得滑鼠的y軸座標點
        context.lineTo(event.offsetX, event.offsetY);

        //to do 畫出圖形的線條
        context.stroke();
    }
}, false);

//結束畫圖
canvas.addEventListener("mouseup", function () {
    flag = false;

    //閉合路徑好讓新的繪圖指令來設定路徑。
    context.closePath();
}, false);


document.querySelector("#text1").addEventListener("blur", function () {
    
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.font = "italic 2em 標楷體";
    context.textAlign = "center";
    context.fillStyle = "purple";

    //to do 請將輸入在text1裡面的文字寫到canvas中
    //使用this.value 讀出text1裡面的文字
    context.fillText(this.value, x, y);
}, false);

document.querySelector("#file1").addEventListener("change", function () {
    var imageObj = new Image();
    imageObj.onload = function () {
        for (var i = 0; i < 20; i++) {
            var w = Math.floor(Math.random() * 40);    //設定繪製圖型的大小
            var x = Math.floor(Math.random() * canvas.width); //設定繪製圖型位置的x座標
            var y = Math.floor(Math.random() * canvas.height); //設定繪製圖型位置的y座標

            //to do 將選取的圖,放大縮小後繪到canvas中
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
    
    //to do 使用FileWriter將圖存到fileSystem中
    //寫入時要將從canvas讀到的圖轉成blob，使用dataURItoBlob function
    //dataURItoBlob(canvas.toDataURL("image/png"))
    


}, false);

function dataURItoBlob(dataURI, callback) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString = atob(dataURI.split(',')[1]);
    //console.log(byteString);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    //console.log(mimeString);

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    // var bb = new window.WebKitBlobBuilder(); // or just BlobBuilder() if not using Chrome
    // bb.append(ab);
    // return bb.getBlob(mimeString);

    var blob = new Blob([ab], { type: "image/png" });
    return blob
};

//從fileSystem中讀出圖     
document.querySelector("#buttonRead").addEventListener("click", function () {
    //to do 使用FileReader將從fileSystem中讀到的圖，畫到Canvas上
   
}, false);



function errorHandler(err) {
    var msg = '';
    switch (err.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    };
    alert('Error: ' + msg);
}
//清除
document.querySelector("#buttonClear").addEventListener("click", function () {
    location.reload();
}, false);






