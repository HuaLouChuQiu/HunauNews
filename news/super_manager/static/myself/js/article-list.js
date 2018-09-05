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
    new pagination({
		pagination:$('.pagination'),
		maxPage: 7, //最大页码数,支持奇数，左右对称
		startPage: 1,    //默认第一页
		currentPage: 2,          //当前页码
		 totalItemCount: 10,    //项目总数,大于0，显示页码总数
		 totalPageCount: 20,        //总页数
		callback:function(pageNum){
			console.info(pageNum);
		}
	});
    pages(0,1);
    //获取总页数
    function pages(page){
        $.ajax({
            type: 'GET',
            url: '../../../news/showPage',
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
            url: '../../../news/manageNews',
            data:{
                size:10,
                page:page
            },
            dataType: 'JSON',
            success: function(data){
                console.log(data);
                $('.userTbody').empty();
                $('.pagination').empty();
                // for(var i=0;i<data.length;i++){

                //     var date = new Date(data[i].create_time);
                //     // var date = new Date(data[i].create_time).Format("yyyy-MM-dd");
                //     var Y = date.getFullYear() + '-';
                //     var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                //     var D = date.getDate() + ' '; 
                //     var YMD=Y+M+D;
    
                //     let html = 
                //     `
                //     <li class="projectitem">
                //     <a href="product_show.html?news_id=${data[i].news_id}&class_id=${data[i].class_id}" target="_blank">
                //         <div class="project_img"><img src="${data[i].image}" width="500" height="320" /></div>
                //         <div class="project_info">
                //             <div>
                //                 <p class="title">${data[i].title}</p>
                //                 <p class="subtitle">${YMD}</p>
                //                 <p class="description hide">${data[i].text}</p>
                //             </div>
                //         </div>
                //     </a>
                //     <a href="product_show.html?news_id=${data[i].news_id}&class_id=${data[i].class_id}"  target="_blank" class="details">more<i class="fa fa-angle-right"></i></a>
                // </li>
                //     `
                //     $('.content_list').append(html);
                // }
                // new pagination({
                //     pagination:$('.pagination'),
                //     maxPage: 7, //最大页码数,支持奇数，左右对称
                //     startPage: 1,    //默认第一页
                //     currentPage: page,          //当前页码
                //     totalItemCount: data.length,    //项目总数,大于0，显示页码总数
                //     totalPageCount: allPages,        //总页数
                //     callback:function(pageNum){
                //         console.log(pageNum)
                //         pages(number,pageNum)
                //     }
                // });

            },
            error:function(error){
                console.log(error);
            }
            
        });
    }
    let html = 
    `
    <tr class="text-c">
    <td>
        <input type="checkbox" value="1" name="opt" id="opt">
    </td>
    <td>10001</td>
    <td class="text-l">
        <u style="cursor:pointer" class="text-primary" onClick="article_edit('查看','article-zhang.html','10001')" title="查看">资讯标题</u>
    </td>
    <td>头条新闻</td>
    <td>H-ui</td>
    <td>2014-6-11 11:11:42</td>
    <td>21212</td>
    <td class="td-status">
        <span class="label label-success radius">已发布</span>
    </td>
    <td class="f-14 td-manage">
        <!-- <a style="text-decoration:none" onClick="article_stop(this,'10001')" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>  -->
        <a style="text-decoration:none" id="myClz" class="ml-5" onClick="article_del(this,'10001')" href="javascript:;" title="删除">
            <i class="Hui-iconfont">&#xe6e2;</i>
        </a>
    </td>
</tr>
<tr class="text-c">
    <td>
        <input type="checkbox" value="2" name="opt" id="opt">
    </td>
    <td>10002</td>
    <td class="text-l">
        <u style="cursor:pointer" class="text-primary" onClick="article_edit('查看','article-zhang.html','10002')" title="查看">资讯标题</u>
    </td>
    <td>综合要闻</td>
    <td>H-ui</td>
    <td>2014-6-11 11:11:42</td>
    <td>21212</td>
    <td class="td-status">
        <span class="label label-success radius">草稿</span>
    </td>
    <td class="f-14 td-manage">
        <a style="text-decoration:none" onClick="article_shenhe(this,'10001')" href="javascript:;" title="审核">审核</a>
        <a style="text-decoration:none" id="myClz" class="ml-5" onClick="article_del(this,'10001')" href="javascript:;" title="删除">
            <i class="Hui-iconfont">&#xe6e2;</i>
        </a>
    </td>
</tr>
    `
    $('.odd').find('.dataTables_empty').css('display:none')
    $('#userTbody').append(html)
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