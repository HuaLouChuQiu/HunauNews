$(function(){


    function getUrlParam(name)
    {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
    } 
    
    var news_id = getUrlParam('news_id');
    console.log(news_id);

    $.ajax({
        type: 'GET',
        url: '../../../news/showNewsById',
        data:{
            news_id:news_id
        },
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            var date = new Date(data.create_time);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' '; 
            var YMD=Y+M+D;

            var html1 = 
            `
            <div class="header">
            <p class="title">${data.title}</p>
            <br/>
            <p class="subtitle"><span>${YMD}</span> &nbsp;浏览量&nbsp; <span>${data.frequency}</span></p>
            <div class="description">
            </div>
            
        </div>
            `
            $('#projectbody').append(html);

            if(data.image!=''){
                var html2 = 
                `
            <div class="postbody">
                <p><img src="${data.image}" style="width:100%" /></p>
                <hr/>
                <p>${data.text}</p>
                <p><br /></p>
            </div>
            <p id="author" style="margin-top:30px; margin-bottom:10px;">

            </p> 
                `
                $('#projectbody').append(html);
            }else{
                var html2 = 
                `
                <div class="postbody">
                    <p>${data.text}</p>
                    <p><br /></p>
                </div>
                <p id="author" style="margin-top:30px; margin-bottom:10px;">

                </p> 
                `
                $('#projectbody').append(html);
            }
            $.ajax({
                type: 'GET',
                url: '../../../news/findNameById',
                data:{
                    user_id:data.user_id
                },
                dataType: 'JSON',
                success: function(talk){
                    console.log(talk);
                        var html3 = 
                        `
                        <p style="text-align: right; font-size:14px;">${talk.username}</p>
                        <p style="text-align: right; font-size:14px;">${YMD}</p>
                        `
                        $('#author').append(html);
                },
                error:function(error){
                    console.log(error);
                }
                
              });    
            
        },
        error:function(error){
            console.log(error);
        }
        
      });
})