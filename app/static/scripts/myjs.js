var context = canvas.getContext("2d");
window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    var video = document.getElementById("video");
    var videoObj = {"video" : true};
    navigator.mediaDevices.getUserMedia(videoObj)
    .then(function(stream) {
    /* 使用这个stream stream */
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
    /* 处理error */
        console.log("Video capture error: ", err.code)
    });
}, false);
document.getElementById("snap").addEventListener("click", function () {
    context.drawImage(video, 0, 0, 500, 400);
    var dataURL = canvas.toDataURL();
    var temp = document.createElement("form");    
    temp.action = "/app/upload_image/";
    temp.method = "post";     
    temp.style.display = "none";
    var opt = document.createElement("textarea");
    opt.name ="imgdata";                        
    if (dataURL !== null) { opt.value = dataURL; }
    temp.appendChild(opt);
    document.body.appendChild(temp);
    temp.submit();
});
function clickme(){
    alert('真好用');
};
