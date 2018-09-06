$(function(){
    // 添加数据 模拟
    $.session.set('userID', '4')
    $.session.set('username', 'hjy')

    var oUserId = $.session.get('userID');
    var oUserName = $.session.get('username');

    console.log(oUserId);
    console.log(oUserName);
    if (oUserId != null) {
        $.ajax({
            type: 'GET',
            url: '../../../news/findLevel',
            data:{
                user_id:oUserId,
            },
            dataType: 'JSON',
            success: function(data){
                console.log(data);
                if (data[0].level == 2) {
                    $('.dropDown_A').text(oUserName);
                }else {
                    window.location.href = "http://172.20.10.2:8080/news/HunauNews/news/index.html";
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    } else {
        console.log('a')
        window.location.href = "http://172.20.10.2:8080/news/HunauNews/news/product_show.html?news_id=259&class_id=2";
    }
    $('#exit').click(function(){
        //清除数据
        $.session.clear();
        window.location.href = "http://172.20.10.2:8080/news/HunauNews/news/product_show.html?news_id=259&class_id=2";
    })
})