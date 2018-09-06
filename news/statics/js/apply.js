$(function () {

    // 添加数据 模拟
    // $.session.set('userID', '1')
    // $.session.set('username', 'hjy')

    //删除数据
    // $.session.remove('key');

    //获取数据
    var oUserId = $.session.get('userID');
    var oUserName = $.session.get('username');
    console.log(oUserId);
    console.log(oUserName);
    if(oUserId != null){
        console.log(oUserId);
        console.log(oUserName);
    }else{
        window.location.href="./news/HunauNews/news/super_manager/index.html";
    }
    //清除数据
    // $.session.clear();

    $('#apply').click(function () {

        let html =
            `
        <a href="javascript:void(0);" target="_self">
        <span style="color:#2495e4" data-title="已申请">已申请</span>
        <i class="fa fa-angle-right"></i>
    </a>
        `
        $(this).empty()
        $(this).append(html);
    })
})