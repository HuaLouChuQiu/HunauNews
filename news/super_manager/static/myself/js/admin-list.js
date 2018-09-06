$(function () {
    /*管理员- */
    function admin_del(id,thisPage) {
        layer.confirm('确认要删除吗？', function (index) {
            xigaiUser('../../../../news/moveApplyUser',id,thisPage,'已删除!',1)
        });
    }
    /*管理员-停用*/
    function admin_stop(id,thisPage) {
        layer.confirm('确认要停用吗？', function (index) {
            //此处请求后台程序，下方是成功后的前台处理……
            xigaiUser('../../../../news/downLevel',id,thisPage,'已停用!',5)
        });
    }
    /*管理员-启用*/
    function admin_start(id,thisPage) {
        layer.confirm('确认要启用吗？', function (index) {
            xigaiUser('../../../../news/upLevel',id,thisPage,'已启用!',6)
        });
    }
//启用 停用 删除
function xigaiUser(url,id,thisPage,tishi,icon){
    var oText = $('.input-text').val()
    console.log("id="+id);
    $.ajax({
        type: 'POST',
        url: url,
        data:{
            user_id:id
        },
        dataType: 'json',
        success: function (data) {
            layer.msg(tishi, { icon: icon, time: 1000 });
            // var oText = $('#search').val()
            console.log("oText176="+oText);
            if(oText == ''){
                pagesUser(thisPage);
            }else{
                searchPages(oText,thisPage); 
            }
        },
        error: function (data) {
            console.log(data.msg);
        },
    });
}
    pagesUser(1);
    function pagesUser(page){
        $.ajax({
            type: 'GET',
            url: '../../../../news/showPageUser',
            data:{
                size:10
            },
            dataType: 'JSON',
            success: function(allPages){
                console.log(allPages);
                if(page>allPages){
                    manage(allPages,allPages);
                }else{
                    manage(page,allPages);
                }
            },
            error:function(error){
                console.log(error)
            }
        })
    }
    //获取各个类别的新闻
    function manage(page,allPages){
        $.ajax({
            type: 'GET',
            url: '../../../../news/showApplyUser',
            data:{
                page:page
            },
            dataType: 'JSON',
            success: function(data){
                $('#tbody').empty();
                $('.pagination').empty();
                console.log(data);
                if(data == ""){
                    $('.odd').find('.dataTables_empty').css('display:block')
                }else{
                    $('.odd').find('.dataTables_empty').css('display:none')

                    console.log(data.length);
                    for(var i=0;i<data.length;i++){
                        var oDate = new Date(data[i].create_time);
                        var oY = oDate.getFullYear() + '-';
                        var oM = (oDate.getMonth()+1 < 10 ? '0'+(oDate.getMonth()+1) : oDate.getMonth()+1) + '-';
                        var oD = oDate.getDate() + ' '; 
                        var oYMD=oY+oM+oD;

                        var html =
                        `
                        <tr class="text-c">
                        <td>
                            <input type="checkbox" value="1" name="">
                        </td>
                        <td>${data[i].user_id}</td>
                        <td>${data[i].username}</td>
                        <td>13000000000</td>
                        <td>admin@mail.com</td>
                        <td class='level'>新闻编辑</td>
                        <td>2014-6-11 11:11:42</td>
                        <td class="td-status">
                            
                        </td>
                        <td class="td-manage">
                            
                        </td>
                    </tr>
                        `
                        $('#tbody').append(html);
                        if(data[i].level == 0){
                            var html1 = 
                            `
                            <span class="label radius">已停用</span>
                            
                            `
                            var html2 = 
                            `
                            <a class="start" style="text-decoration:none" href="javascript:;" title="启用">
                            <i class="Hui-iconfont">&#xe615;</i>
                        </a>
                        <a title="删除" href="javascript:;" class="ml-5" style="text-decoration:none">
                            <i class="Hui-iconfont">&#xe6e2;</i>
                        </a>
                            `
                        }else{
                            var html1 = 
                            `
                            <span class="label label-success radius">已启用</span>
                            `
                            var html2 = 
                            `
                            <a class="stop" style="text-decoration:none" href="javascript:;" title="停用">
                            <i class="Hui-iconfont">&#xe631;</i>
                        </a>
                        <a title="删除" href="javascript:;" class="ml-5" style="text-decoration:none">
                            <i class="Hui-iconfont">&#xe6e2;</i>
                        </a>
                            
                            `
                        }
                        $('.td-status').each(function(index,item){
                            if(index == i){
                                $(item).append(html1);
                            }
                        })
                        $('.td-manage').each(function(index,item){
                            if(index == i){
                                $(item).append(html2);
                            }
                        })
                    }
                    $("td-manage").each(function (index, item) {
                        console.log("index=" + index);
                        $(item).find('.stop').click(function () {
                            admin_stop(data[index].user_id, page)
                        })
                        $(item).find('.ml-5').click(function () {
                            admin_del(data[index].user_id, page)
                        })
                        $(item).find('.start').click(function () {
                            console.log("startinedx=" + index);
                            admin_start(data[index].user_id, page)
                        })
                    })

                    // $('.stop').each(function(index,item){
                    //     console.log("stopinedx="+index);
                    //     $(item).click(function(){
                    //         admin_stop(data[index].user_id,page)
                    //     })
                    // })
                    // $('.ml-5').each(function(index,item){
                    //     $(item).click(function(){
                    //         admin_del(data[index].user_id,page)
                    //     })
                        
                    // })
                    // $('.start').each(function(index,item){
                    //     $(item).click(function(){
                    //         console.log("startinedx="+index);
                    //         admin_start(data[index].user_id,page)
                    //     })
                        
                    // })
                    
                }
                new pagination({
                    pagination:$('.pagination'),
                    maxPage: 5, //最大页码数,支持奇数，左右对称
                    startPage: 1,    //默认第一页
                    currentPage: page,          //当前页码
                    totalItemCount: data.length,    //项目总数,大于0，显示页码总数
                    totalPageCount: allPages,        //总页数
                    callback:function(pageNum){
                        console.log(pageNum)
                        pagesUser(pageNum);
                    }
                });

            },
            error:function(error){
                console.log(error);
            }
            
        });
    }
    
})