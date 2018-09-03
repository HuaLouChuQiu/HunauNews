$(function(){
    $.ajax({
        type: 'GET',
        url: '../../../news/rankNews',
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            for(var i=0;i<4;i++){
                var html = 
                `
                <li id="newsitem_0" class="wow newstitem left">
                <a class="newscontent" target="_blank" href="#">
                    <div class="news_wrapper">
                        <div class="newsbody">
                            <p class="date"><span class="md">2015<span>-</span></span><span class="year">10-19</span></p>
                            <p class="title">洞察企业转型之道 助力企业转型之举的主线</p>
                            <div class="separator"></div>
                            <p class="description">等了这么久，勤劳的技术哥哥马不停蹄的敲着代码，终于WEB的后台于今日初步完成，已经 ...</p>
                        </div>
                    </div>
                    <div class="newsimg" style="background-image:url(statics/images/1482133948355.jpg)"></div>
                </a>
                <a href="#" target="_blank" class="details">more<i class="fa fa-angle-right"></i></a>
            </li>
                `
                $('#rankNews').append(html);
                // console.log(data[i].people_name)
            }
        },
        error:function(error){
            console.log(error);
        }
        
      });
})