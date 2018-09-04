$(function(){


    function getUrlParam(name)
    {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
    } 
    
    var news_id = getUrlParam('news_id');
    var class_id = getUrlParam('class_id');
    console.log(news_id);
    console.log(class_id);
    if(class_id == 1){
        $('#leiBie').text('综合要闻')
    }else if(class_id == 1){
        $('#leiBie').text('媒体湘农')
    }else if(class_id == 2){
        $('#leiBie').text('视频新闻')
    }else if(class_id == 3){
        $('#leiBie').text('学院动态')
    }else if(class_id == 4){
        $('#leiBie').text('理论教育')
    }else if(class_id == 5){
        $('#leiBie').text('专题报道')
    } 

    //推荐
    $.ajax({
        type: 'GET',
        url: '../../../news/showNewsByClass',
        data:{
            class_id:class_id,
            page:1
        },
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                let html4 = 
                `
                <div class="projectitem">
                <a href="product_show.html?news_id=${data[i].news_id}&class_id=${data[i].class_id}">
                    <span class="propost_img"><img src="${data[i].image}"/></span>
                    <div class="project_info">
                        <div>
                            <p class="title">${data[i].title}</p>
                            <p class="subtitle">浏览量&nbsp; <span>${data[i].frequency}</p>
                        </div>
                    </div>
                </a>
            </div>
                `
                $('#projectib').append(html4);
            }
        },
        error:function(error){
            console.log(error);
        }
        
      });
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
            // 标题
            let html1 = 
            `
            <div class="header">
            <p class="title" stlye="text-indent: 2em;">${data.title}</p>
            <br/>
            <p class="subtitle"><span>${YMD}</span> &nbsp;浏览量&nbsp; <span>${data.frequency}</span></p>
            <div class="description">
            </div>
            
        </div>
            `
            $('#projectih').append(html1);
            // 正文
            if(data.image!=''){
                let html2 = 
                `
            <div class="postbody">
                <p><img src="${data.image}" style="width:100%" /></p>
                <hr/>
                <p stlye="text-indent: 2em;">${data.text}</p>
                <p><br /></p>
            </div>
            <p id="author" style="margin-top:30px; margin-bottom:10px;">

            </p> 
                `
                $('#projectbody').append(html2);
            }else{
               let html2 = 
                `
                <div class="postbody">
                    <p style="text-indent: 2em;>${data.text}</p>
                    <p><br /></p>
                </div>
                <p id="author" style="margin-top:30px; margin-bottom:10px;">

                </p> 
                `
                $('#projectbody').append(html2);
            }
            $.ajax({
                type: 'GET',
                url: '../../../news/findNameById',
                data:{
                    user_id:data.user_id
                },
                dataType: 'text',
                success: function(talk){
                    console.log(talk);
                    // 作者
                        let html3 = 
                        `
                        <p style="text-align: right; font-size:14px;">${talk}</p>
                        <p style="text-align: right; font-size:14px;">${YMD}</p>
                        `
                        $('#author').append(html3);
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
    //   展示评论
    $.ajax({
        type: 'GET',
        url: '../../../news/showCommentByNewsId',
        data:{
            news_id:news_id
        },
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            if(data.length == ''){
                let html5 = 
                `
                <div class="comment-show-con clearplfix">
                <div class="comment-show-con-list pull-left clearplfix">
                    <p class="meiyou">暂无评论</p>
                </div>
            </div>
                `
                $('.comment-show').append(html5);
            }else{
                for(var i=0;i<data.length;i++){
                    var oDate = new Date(data[i].create_time);
                    var oY = oDate.getFullYear() + '-';
                    var oM = (oDate.getMonth()+1 < 10 ? '0'+(oDate.getMonth()+1) : oDate.getMonth()+1) + '-';
                    var oD = oDate.getDate() + ' '; 
                    var oYMD=oY+oM+oD;

                    let html5 = 
                    `
                    <div class="comment-show-con clearplfix">
                    <div class="comment-show-con-img pull-left"><img src="statics/images/header-img-comment_03.png" alt=""></div>
                    <div class="comment-show-con-list pull-left clearplfix">
                        <div class="pl-text clearplfix">
                            
                            <span class="my-pl-con">&nbsp;${data[i].comment_content}</span>
                        </div>
                        <div class="date-dz">
                            <span class="date-dz-left pull-left comment-time">${oYMD}</span>
                        </div>
                        <div class="hf-list-con"></div>
                    </div>
                </div> 
                    `
                    $('.comment-show').append(html5);
                    $.ajax({
                        type: 'GET',
                        url: '../../../news/findNameById',
                        data:{
                            user_id:data[i].user_id
                        },
                        dataType: 'text',
                        success: function(talk){
                            console.log(talk);
                            let html6=
                            `
                            <a href="javascript:void(0);" class="comment-size-name">${talk} : </a>
                            `
                            $('.pl-text').append(html6);
                        },
                        error:function(error){
                            console.log(error);
                        }
                        
                      });   
                }
                
            }
        },
        error:function(error){
            console.log(error);
        }
        
      });
})