//接收主程式傳過來的資料
//self.addEventListener('message', function (event) {
//    //event.data //Tom
//    var reader = new FileReaderSync();
//    var data = reader.readAsDataURL(event.data)
//    //將Hello Tom傳給主程式
//    self.postMessage(data);
//}, false);

self.addEventListener('message', function (event) {
    //event.data //Tom
    self.requestFileSystemSync = self.webkitRequestFileSystemSync || self.requestFileSystemSync;
    var fs = requestFileSystemSync(TEMPORARY, 5 * 1024 * 1024 /*5MB*/);


    var fileEntry = fs.root.getFile("image.png", { create: true });
    var file = fileEntry.file();
    var reader = new FileReaderSync();
    var data = reader.readAsDataURL(file)
    self.postMessage(data);

}, false);



//window.requestFileSystem(window.Temporary, 5 * 1024 * 1024, function (fs) {
//    fs.root.getFile("image.png", { create: true }, function (fileEntry) {
//        //讀取
//        fileEntry.file(function (file) {
//            var worker = new Worker("ReaderWorker.js");
//            worker.postMessage(file);
//            worker.addEventListener("message", function (event) {
//                var imageObj = new Image();
//                imageObj.src = event.data;
//                imageObj.addEventListener("load", function () {
//                    //繪製原尺寸的圖到canvas上
//                    context.drawImage(imageObj, 0, 0);
//                }, false)

//            }, false)
            //var reader = new FileReader();
            //reader.readAsDataURL(file);
            //reader.onload = function (event) {
            //    var content = event.target.result;
            //    console.log(content);
            //    //畫圖



            //}
//        }, errorHandler);

//    }, errorHandler);
//}, errorHandler);