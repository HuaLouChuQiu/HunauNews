$(function(){
    // 热度排名 
    $.ajax({
        type: 'GET',
        url: '../../../news/rankNews',
        data:{
            number:10,
        },
        success: function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                
                let html = 
                `
                <div class="wow newstitem left">
                <a class="newscontent" target="_blank" href="news_detail.html">
                    <div class="news_wrapper">
                        <div class="newsbody">
                            <p class="date"><span class="md">浏览量<span>2000029</span></span><span class="year">10-19</span></p>
                            <p class="title">洞察企业转型之道 助力企业转型之举的主线</p>
                            <div class="separator"></div>
                            <p class="description">等了这么久，勤劳的技术哥哥马不停蹄的敲着代码，终于WEB的后台于今日初步完成，已经 ...</p>
                        </div>
                    </div>
                    <div class="newsimg" style="background-image:url(statics/images/1482133948355.jpg)"></div>
                </a>
                <a href="news_detail.html" target="_blank" class="details">more<i class="fa fa-angle-right"></i></a>
            </div>
                `
               
                $('#newslist:wrapper').append(html)
    
     
            }
        },
        error:function(error){
            console.log(error);
        }
        
    });
})