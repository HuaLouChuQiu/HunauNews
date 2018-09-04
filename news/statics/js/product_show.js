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
                var html = 
                `
                <div class="postbody">
                <p><img src="statics/images/1482227097825.jpg" /></p>
                <hr/>
                <p>01.&nbsp; 泛游戏兴趣聚合平台“着迷”将正式宣布其已完成 C 轮融资，由优酷土豆集团领投、掌趣科技跟投，具体的融资数额并未公布。另外，着迷向36氪透露，计划在年底挂牌新三板，目前已经和一些券商等合作方在做前期工作。<br /><br />02.&nbsp; 优土和着迷在战略上的资本合作，体现在业务层面主要有两块。首先是优酷会在平台上开辟一块全新的游戏中心，由着迷进行运营，将在优酷土豆于本月中旬上线的新版中首次上线；其次，双方将成立一家合资公司，以独立品牌开拓游戏发行业务。</p>
                <p><br /></p>
                <p><img src="statics/images/1482227100210.jpg" /></p>
                <p><img src="statics/images/1482227104934.jpg" /></p>
            </div>
            <p style="margin-top:30px; margin-bottom:10px;">
                <p style="text-align: right; font-size:14px;">湖南农业大学</p>
                <p style="text-align: right; font-size:14px;">2018年8月</p>
            </p>
                `
                $('#projectbody').append(html);
            
        },
        error:function(error){
            console.log(error);
        }
        
      });
})