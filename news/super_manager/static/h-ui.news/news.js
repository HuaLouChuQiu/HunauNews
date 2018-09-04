$(function(){
    $('#xuanze').change(function(){
        console.log($(this).find(':selected').val())
    });
    $('#search').blur(function(){
        var search = $(this).val();
        console.log(search)
    });
    $('#confirm').on('click',function(){
        // var search = $('#search').val();
        // if(search == ''){
        //     alert("还没输入你想查询的内容");
        // }else{
            $.ajax({
                type:"GET",
                url:'',
                dataType:"json",
                data:{
                    name1:$('#xuanze option:selected').val(),
                    name2:search
                },
                succsess:function(data){

                },
                error:function(){

                }
            })
        // }
        for(var i=0;i<data.length;i++){
            var html =
            `
            <tr class="text-c">
                        <td><input type="checkbox" value="" name=""></td>
                        <td>10001</td>
                        <td class="text-l"><u style="cursor:pointer" class="text-primary" onClick="article_edit('查看','article-zhang.html','10001')" title="查看">资讯标题</u></td>
                         <td>头条新闻</td>
                        <td>${data[i].time}</td>
                        <td>2014-6-11 11:11:42</td>
                        <td>21212</td>
                        <td class="td-status"><span class="label label-success radius">已发布</span></td>
                        <td class="f-14 td-manage"><a style="text-decoration:none" onClick="article_stop(this,'10001')" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a> 
                            <a style="text-decoration:none" class="ml-5" onClick="article_del(this,'10001')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a></td>
                    </tr>
            `
            $('.table tbody').append(html);
        }
        // ${data[i].text}
    });
})