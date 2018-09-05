$(function () {
    // $('.table-sort').dataTable({
    //     "aaSorting": [[1, "desc"]],//默认第几个排序
    //     "bStateSave": true,//状态保存
    //     "pading": false,
    //     "aoColumnDefs": [
    //         //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
    //         { "orderable": false, "aTargets": [0, 8] }// 不参与排序的列
    //     ]
    // });
    // new pagination({
	// 	pagination:$('.pagination'),
	// 	maxPage: 7, //最大页码数,支持奇数，左右对称
	// 	startPage: 1,    //默认第一页
	// 	currentPage: 2,          //当前页码
	// 	 totalItemCount: 10,    //项目总数,大于0，显示页码总数
	// 	 totalPageCount: 20,        //总页数
	// 	callback:function(pageNum){
	// 		console.info(pageNum);
	// 	}
	// });
    pages(1);
    //获取总页数
    function pages(page){
        $.ajax({
            type: 'GET',
            url: '../../../../news/showPage',
            data:{
                class_id:0,
            },
            dataType: 'JSON',
            success: function(allPages){
                console.log(allPages);
                manage(page,allPages);
            },
            error:function(error){

            }
        })
    }

    //获取各个类别的新闻
    function manage(page,allPages){
        $.ajax({
            type: 'GET',
            url: '../../../../news/manageNews',
            data:{
                size:10,
                page:page
            },
            dataType: 'JSON',
            success: function(data){
                $('#userTbody').empty();
                $('.pagination').empty();
                console.log(data);
                if(data=""){
                    $('.odd').find('.dataTables_empty').css('display:bloke')
                }else{
                    console.log('有数据')
                    $('.odd').find('.dataTables_empty').css('display:none')
                    for(var i=0;i<data.length;i++){
                        var oDate = new Date(data[i].create_time);
                        var oY = oDate.getFullYear() + '-';
                        var oM = (oDate.getMonth()+1 < 10 ? '0'+(oDate.getMonth()+1) : oDate.getMonth()+1) + '-';
                        var oD = oDate.getDate() + ' '; 
                        var oYMD=oY+oM+oD;
                        console.log(data[i]);
                        let html =
                        `
                        <tr class="text-c">
                        <td>
                            <input type="checkbox" value="1" name="opt" id="opt">
                        </td>
                        <td>${data[i].news_id}</td>
                        <td class="text-l">
                            <u style="cursor:pointer" class="text-primary" onClick="article_edit('查看','article-zhang.html','${data[i.news_id]}')" title="查看">${data[i].title}</u>
                        </td>
                        <td>${data[i].class_content}</td>
                        <td>${data[i].username}</td>
                        <td>${oYMD}</td>
                        <td>${data[i].frequency}</td>
                        <td class="td-status">
                            
                        </td>
                        <td class="f-14 td-manage">
                            
                        </td>
                    </tr>
                        `
                        $('#userTbody').append(html);
                        
                        if(data[i].state == 0){
                            var html1 = 
                            `
                            <span class="label label-success radius">草稿</span>
                            `
                            var html2 = 
                            `
                            <a style="text-decoration:none" onClick="article_shenhe(this,'10001')" href="javascript:;" title="审核">审核</a>
							<a style="text-decoration:none" id="myClz" class="ml-5" onClick="article_del(this,'10001')" href="javascript:;" title="删除">
								<i class="Hui-iconfont">&#xe6e2;</i>
							</a>
                            `
                            
                        }else{
                            var html1 = 
                            `
                            <span class="label label-success radius">已发布</span>
                            `
                            var html2 = 
                            `
                            <a style="text-decoration:none" id="myClz" class="ml-5" onClick="article_del(this,'${data[i.news_id]}')" href="javascript:;" title="删除">
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
                    
                }
                
                new pagination({
                    pagination:$('.pagination'),
                    maxPage: 7, //最大页码数,支持奇数，左右对称
                    startPage: 1,    //默认第一页
                    currentPage: page,          //当前页码
                    totalItemCount: data.length,    //项目总数,大于0，显示页码总数
                    totalPageCount: allPages,        //总页数
                    callback:function(pageNum){
                        console.log(pageNum)
                        pages(pageNum);
                    }
                });

            },
            error:function(error){
                console.log(error);
            }
            
        });
    }
   
    /*资讯-编辑*/
		function article_edit(title, url, id, w, h) {
			var index = layer.open({
				type: 2,
				title: title,
				content: url
			});
			layer.full(index);
        }
        $('.text-primary').each(function(index,item){
            $(item).click(function(){
                article_edit('查看','article-zhang.html','10002')
            })
        })
    /*资讯-删除*/
    function article_del(obj, id) {
        layer.confirm('确认要删除吗？', function (index) {
            $.ajax({
                type: 'POST',
                url: '',
                dataType: 'json',
                success: function (data) {
                    $(obj).parents("tr").remove();
                    layer.msg('已删除!', { icon: 1, time: 1000 });
                },
                error: function (data) {
                    console.log(data.msg);
                },
            });
        });
    }

    /*资讯-审核*/
    function article_shenhe(obj, id) {
        layer.confirm('审核文章？', {
            btn: ['通过', '不通过', '取消'],
            shade: false,
            closeBtn: 0
        },
            function () {
                // $(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="article_start(this,id)" href="javascript:;" title="申请上线">申请上线</a>');
                $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
                $(obj).remove();
                layer.msg('已发布', { icon: 6, time: 1000 });
            },
            function () {
                // $(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="article_shenqing(this,id)" href="javascript:;" title="申请上线">申请上线</a>');
                $(obj).parents("tr").find(".td-status").html('<span class="label label-danger radius">未通过</span>');
                $(obj).remove();
                layer.msg('未通过', { icon: 5, time: 1000 });
            });
    }
})