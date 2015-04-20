//接收主程式傳過來的資料
self.addEventListener('message', function (event) {
    //event.data //Tom
    self.requestFileSystemSync = self.webkitRequestFileSystemSync || self.requestFileSystemSync;
    var fs = requestFileSystemSync(TEMPORARY, 5*1024 * 1024 /*5MB*/); 
    var fileEntry = fs.root.getFile("image.png", { create: true });
    fileEntry.createWriter().write(dataURItoBlob(event.data));  
    self.postMessage('儲存完成');
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
