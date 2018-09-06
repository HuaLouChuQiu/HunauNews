$(function () {
    /*管理员-删除*/
    function admin_del(obj, id) {
        layer.confirm('确认要删除吗？', function (index) {
            // $.ajax({
            //     type: 'POST',
            //     url: '',
            //     dataType: 'json',
            //     success: function (data) {
            //         $(obj).parents("tr").remove();
            //         layer.msg('已删除!', { icon: 1, time: 1000 });
            //     },
            //     error: function (data) {
            //         console.log(data.msg);
            //     },
            // });
        });
    }
    /*管理员-停用*/
    function admin_stop(obj, id) {
        layer.confirm('确认要停用吗？', function (index) {
            //此处请求后台程序，下方是成功后的前台处理……

            $(obj).parents("tr").find(".td-manage").prepend('<a onClick="admin_start(this,id)" href="javascript:;" title="启用" style="text-decoration:none"><i class="Hui-iconfont">&#xe615;</i></a>');
            $(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">已禁用</span>');
            $(obj).remove();
            layer.msg('已停用!', { icon: 5, time: 1000 });
        });
    }
    /*管理员-启用*/
    function admin_start(obj, id) {
        layer.confirm('确认要启用吗？', function (index) {
            //此处请求后台程序，下方是成功后的前台处理……
            $(obj).parents("tr").find(".td-manage").prepend('<a onClick="admin_stop(this,id)" href="javascript:;" title="停用" style="text-decoration:none"><i class="Hui-iconfont">&#xe631;</i></a>');
            $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
            $(obj).remove();
            layer.msg('已启用!', { icon: 6, time: 1000 });
        });
    }

    // $('.stop').each(function(index,item){
    //     $(item).click(function(){
    //         admin_stop(this,'10001')
    //     })
    // })
    // $('.ml-5').each(function(index,item){
    //     $(item).click(function(){
    //         admin_del(this,'1')
    //     })
        
    // })
    // $('.start').each(function(index,item){
    //     $(item).click(function(){
    //         admin_start(this,'10001')
    //     })
        
    // })
    new pagination({
        pagination:$('.pagination'),
        maxPage: 5, //最大页码数,支持奇数，左右对称
        startPage: 1,    //默认第一页
        currentPage: 1,          //当前页码
        totalItemCount: 10,    //项目总数,大于0，显示页码总数
        totalPageCount: 8,        //总页数
        callback:function(pageNum){
            console.log(pageNum)
            // pages(pageNum);
        }
    });

    pagesUser(1);
    $.ajax({
        type: 'GET',
        url: '../../../../news/showPageUser',
        data:{
            size:10
        },
        dataType: 'JSON',
        success: function(allPages){
            console.log(allPages);
            // if(page>allPages){
            //     manage(allPages,allPages);
            // }else{
            //     manage(page,allPages);
            // }
        },
        error:function(error){
            console.log(error)
        }
    })
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
                // if(page>allPages){
                //     manage(allPages,allPages);
                // }else{
                //     manage(page,allPages);
                // }
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
                        <td>1</td>
                        <td>admin</td>
                        <td>13000000000</td>
                        <td>admin@mail.com</td>
                        <td>超级管理员</td>
                        <td>2014-6-11 11:11:42</td>
                        <td class="td-status">
                            <span class="label label-success radius">已启用</span>
                        </td>
                        <td class="td-manage">
                            <a class="stop" style="text-decoration:none" href="javascript:;" title="停用">
                                <i class="Hui-iconfont">&#xe631;</i>
                            </a>
                            <a title="删除" href="javascript:;" class="ml-5" style="text-decoration:none">
                                <i class="Hui-iconfont">&#xe6e2;</i>
                            </a>
                        </td>
                    </tr>
                        `
                        $('#tbody').append(html);
                        // if(data[i].state == 0){
                        //     var html1 = 
                        //     `
                        //     <span class="label label-success radius">草稿</span>
                        //     `
                        //     var html2 = 
                        //     `
                        //     <a style="text-decoration:none" class="shenhe" href="javascript:;" title="审核">审核</a>
						// 	<a style="text-decoration:none" id="myClz" class="ml-5" href="javascript:;" title="删除">
						// 		<i class="Hui-iconfont">&#xe6e2;</i>
						// 	</a>
                        //     `
                            
                        // }else{
                        //     var html1 = 
                        //     `
                        //     <span class="label label-success radius">已发布</span>
                        //     `
                        //     var html2 = 
                        //     `
                        //     <a style="text-decoration:none" id="myClz" class="ml-5" href="javascript:;" title="删除">
                        //     <i class="Hui-iconfont">&#xe6e2;</i>
                        // </a>
                        //     `
                        // }
                        // $('.td-status').each(function(index,item){
                        //     if(index == i){
                        //         $(item).append(html1);
                        //     }
                        // })
                        // $('.td-manage').each(function(index,item){
                        //     if(index == i){
                        //         $(item).append(html2);
                        //     }
                        // })
                    }
                    $('.stop').each(function(index,item){
                        $(item).click(function(){
                            admin_stop(this,'10001')
                        })
                    })
                    $('.ml-5').each(function(index,item){
                        $(item).click(function(){
                            admin_del(this,'1')
                        })
                        
                    })
                    $('.start').each(function(index,item){
                        $(item).click(function(){
                            admin_start(this,'10001')
                        })
                        
                    })
                    
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