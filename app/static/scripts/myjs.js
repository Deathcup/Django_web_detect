var context = canvas.getContext("2d");
window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    var video = document.getElementById("video");
    var videoObj = {audio:false,video: { width: 1350, height: 1080 }};
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
$("#snap").click( function () {
    context.drawImage(video, 0, 0, 500, 400);
    var dataURL = canvas.toDataURL();
   // var opt = document.createElement("textarea");
    //opt.name ="imgdata";
    //if (dataURL !== null) { opt.value = dataURL; }
   // console.log(dataURL)

    $.ajax({
      //  async: true,
        url: "/app/ajax/upload_image/",
        type: "post",
        headers: {"X-CSRFToken": $.cookie("csrftoken")},
        data: {
            imgdata:dataURL,
            pp:'123'
        //    'csrfmiddlewaretoken':'{{% csrf_token %}}'
        },
       // dataType:info,
      //  processData: false,// 默认时True, 是不会进行序列化. 这里正好相反
       // contentType: false,
        success: function(data){
            console.log(data)
            document.getElementById("score").innerHTML = data;
            document.getElementById("score").style.display = "block"
        },
    });
    //var temp = document.createElement("form");
    //temp.action = "/app/upload_image/";
    //temp.method = "post";
    //temp.style.display = "none";
    //var opt = document.createElement("textarea");
    //opt.name ="imgdata";
    //if (dataURL !== null) { opt.value = dataURL; }
    //temp.appendChild(opt);
    //document.body.appendChild(temp);
    //temp.submit();
});
function clickme(){
    alert('真好用');
};
