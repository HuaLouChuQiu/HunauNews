$(function () {

    // 添加数据 模拟
    $.session.set('userID', '1')
    $.session.set('username', 'admin')

    //删除数据
    // $.session.remove('userID');
    // $.session.remove('username');

    //获取数据
    var oUserId = $.session.get('userID');
    var oUserName = $.session.get('username');
    console.log(oUserId);
    console.log(oUserName);
    if (oUserId != null) {
        $('#oUsername').text(oUserName);
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
                    let html =
                    `
                      <a href="./super_manager/index.html" target="_self">
                        <span data-title="后台">后台</span>
                        <i class="fa fa-angle-right"></i>
                    </a>
                    `
                    $('#apply').empty()
                    $('#apply').append(html);

                }else if (data[0].level == 1) {
                    let html =
                    `
                <a href="write.html" target="_self">
                <span style="color:#2495e4" data-title="编辑新闻">编辑新闻</span>
                <i class="fa fa-angle-right"></i>
            </a>
                `
                  
                    $('#apply').empty()
                    $('#apply').append(html);
                    
                }else if (data[0].level == 0){
                    if(data[0].state == 0){
                        let html =
                        `
                        <a href="javascript:void(0);" target="_self">
                        <span data-title="申请新闻编辑">申请新闻编辑</span>
                        <i class="fa fa-angle-right"></i>
                    </a>
                    `
                      
                        $('#apply').empty()
                        $('#apply').append(html);

                        $('#apply').click(function () {
                            $.ajax({
                                type: 'GET',
                                url: '../../../news/applyUp',
                                data:{
                                    user_id:oUserId,
                                },
                                dataType: 'JSON',
                                success: function(data){
                                    console.log(data)
                                    let html =
                                    `
                                <a href="javascript:void(0);" target="_self">
                                <span style="color:#2495e4" data-title="已申请">已申请</span>
                                <i class="fa fa-angle-right"></i>
                            </a>
                                `
                                    $('#apply').empty()
                                    $('#apply').append(html);
                                },
                                error:function(error){
                                    console.log(error)
                                }

                            })
                                    
                        })
                    }else{
                        let html =
                        `
                    <a href="javascript:void(0);" target="_self">
                    <span style="color:#2495e4" data-title="已申请">已申请</span>
                    <i class="fa fa-angle-right"></i>
                </a>
                    `
                      
                        $('#apply').empty()
                        $('#apply').append(html);
                    }
                    
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    } else {
        console.log('a')
        window.location.href = "http://172.20.10.2:8080/news/HunauNews/news/super_manager/index.html";
    }
    $('#exit').click(function(){
        //清除数据
        $.session.clear();
        window.location.href = "http://172.20.10.2:8080/news/HunauNews/news/super_manager/index.html";
    })
    
    
})