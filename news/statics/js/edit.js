$(function () {
    $('.summernote').summernote({
        height: 200,
        tabsize: 2,
        lang: 'zh-CN'
    });
});

function checkLength(which) {
    var maxChars = 30; //
    if (which.value.length > maxChars) {
        alert("您出入的字数超多限制!");
        // 超过限制的字数了就将 文本框中的内容按规定的字数 截取
        which.value = which.value.substring(0, maxChars);
        return false;
    } else {
        var curr = maxChars - which.value.length; //250 减去 当前输入的
        document.getElementById("sy").innerHTML = curr.toString();
        return true;
    }
}

    // 输入标题和正文不能为空 
    // console.log($('#TextArea1').val());
    var TextArea1 = $("#TextArea1").val();
    var summernote = $(".summernote").text();
    $("#publish").click(function(){
        console.log($("#TextArea1").val());
        console.log($(".summernote").val());
        if(TextArea1 == 0 && summernote ==0){
            alert("不能为空");
        }
    });
    