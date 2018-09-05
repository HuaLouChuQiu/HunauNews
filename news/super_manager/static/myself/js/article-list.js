$(function () {
    pages(1);
    //获取总页数
    function pages(page){
        $.ajax({
            type: 'GET',
            url: '../../../../news/showPage',
            data:{
                class_id:0,
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
                            <input type="checkbox" value="1" name="opt" id="opt">
                        </td>
                        <td>${data[i].news_id}</td>
                        <td class="text-l">
                            <u style="cursor:pointer" class="text-primary" onClick="article_edit('查看','article-zhang.html','${data[i].news_id}')" title="查看">${data[i].title}</u>
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
                            <a style="text-decoration:none" class="shenhe" href="javascript:;" title="审核">审核</a>
							<a style="text-decoration:none" id="myClz" class="ml-5" href="javascript:;" title="删除">
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
                            <a style="text-decoration:none" id="myClz" class="ml-5" href="javascript:;" title="删除">
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
                    //查看  等等
                    $('.text-primary').each(function(index,item){
                        $(item).click(function(){
                            article_edit('查看','article-zhang.html',data[index].news_id)
                        })
                    })
                    //审核
                    $('.shenhe').each(function(index,item){
                        $(item).click(function(){
                            article_shenhe(this,data[index].news_id,page);
                        })
                    })
                    //删除
                    $('.ml-5').each(function(index,item){
                        $(item).click(function(){
                            article_del(data[index].news_id,page)
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
        //删除，审核，通过的修改点击事件
        function xigai(url,id,thisPage,tishi,icon){
            var oText = $('#search').val()
            $.ajax({
                type: 'POST',
                url: url,
                data:{
                    news_id:id
                },
                dataType: 'json',
                success: function (data) {
                    // $(obj).parents("tr").remove();
                    layer.msg(tishi, { icon: icon, time: 1000 });
                    // var oText = $('#search').val()
                    console.log(oText);
                    // if(oText == ''){
                        pages(thisPage);
                    // }else{
                    //     searchPages(oText,thisPage); 
                    // }
                },
                error: function (data) {
                    console.log(data.msg);
                },
            });
        }
    /*资讯-删除*/
    function article_del(id,thisPage) {
        layer.confirm('确认要删除吗？', function (index) {
            xigai('../../../../news/delNews',id,thisPage,'已删除!',1)
        });
    }
    /*资讯-审核*/
    function article_shenhe(obj,id,thisPage) {
        layer.confirm('审核文章？', {
            btn: ['通过', '不通过并删除', '取消'],
            shade: false,
            closeBtn: 0
        },
            function () {
                xigai('../../../../news/passNews',id,thisPage,'已发布!',6)
            },
            function () { 
                xigai('../../../../news/delNews',id,thisPage,'未通过并已删除!',5)     
            });
    }

    //搜索
    $('#confirm').click(function(){
        var oText = $('#search').val()
        console.log(oText)
        searchPages(oText,1);
        function searchPages(oText,page){
            $.ajax({
                type: 'GET',
                url: '../../../../news/showPage1',
                data:{
                    index:oText
                },
                dataType: 'JSON',
                success: function(allPages){
                    console.log(allPages);
                    if(page>allPages){
                        searchManage(allPages,allPages);
                    }else{
                        searchManage(page,allPages);
                    }
                },
                error:function(error){
                    console.log(error)
                }
            })
        }
        //获取各个类别的新闻
        function searchManage(oText,page,allPages){
            $.ajax({
                type: 'GET',
                url: '../../../../news/manageNews',
                data:{
                    index:oText,
                    size:10,
                    page:page
                },
                dataType: 'JSON',
                success: function(data){
                    $('#userTbody').empty();
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
                                <input type="checkbox" value="1" name="opt" id="opt">
                            </td>
                            <td>${data[i].news_id}</td>
                            <td class="text-l">
                                <u style="cursor:pointer" class="text-primary" onClick="article_edit('查看','article-zhang.html','${data[i].news_id}')" title="查看">${data[i].title}</u>
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
                                <a style="text-decoration:none" class="shenhe" href="javascript:;" title="审核">审核</a>
                                <a style="text-decoration:none" id="myClz" class="ml-5" href="javascript:;" title="删除">
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
                                <a style="text-decoration:none" id="myClz" class="ml-5" href="javascript:;" title="删除">
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
                        //查看  等等
                        $('.text-primary').each(function(index,item){
                            $(item).click(function(){
                                article_edit('查看','article-zhang.html',data[index].news_id)
                            })
                        })
                        //审核
                        $('.shenhe').each(function(index,item){
                            $(item).click(function(){
                                article_shenhe(this,data[index].news_id,page);
                            })
                        })
                        //删除
                        $('.ml-5').each(function(index,item){
                            $(item).click(function(){
                                article_del(data[index].news_id,page)
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
                            searchPages(oText,pageNum);
                        }
                    });
    
                },
                error:function(error){
                    console.log(error);
                }
                
            });
        }

    })
})