$(function(){
    $.ajax({
        type: 'GET',
        url: '../../../news/rankNews',
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            for(var i=0;i<4;i++){
                var date = new Date(data[i].create_time);
                // var date = new Date(date[i].create_time).Format("yyyy-MM-dd");
                var Y = date.getFullYear();
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate() + ' '; 
                var MD=M+D;

                console.log(Y)
                console.log(MD)
                
                var html = 
                `
                <li id="newsitem_0" class="wow newstitem left">
                <a class="newscontent" target="_blank" href="#">
                    <div class="news_wrapper">
                        <div class="newsbody">
                            <p class="date"><span class="md">${Y}<span>-</span></span><span class="year">${MD}</span></p>
                            <p class="title">${data[i].title}</p>
                            <div class="separator"></div>
                            <p class="description">${data[i].text}</p>
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
      $.ajax({
        type: 'GET',
        url: '../../../news/showNewsByClass1',
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                var html = 
                `
                <li  class="serviceitem wow">
                <a href="#" target="_blank">
                    <p class="service_img"><img src="statics/images/148100202198.jpg" width="320" height="120" alt="战略规划管理咨询" /></p>
                    <div class="service_info">
                        <p class="title">战略规划管理咨询</p>
                        <p class="description">从定价策略到品牌定位，再到数字化营销。我们丰富的经验确保定制方案，市场营销是在创造/沟通交换产品中... </p>
                    </div>
                </a>
                <a href="#" target="_blank" class="details">more<i class="fa fa-angle-right"></i></a>
            </li>
                `
                $('#headlineNews').append(html);
            }
        },
        error:function(error){
            console.log(error);
        }
        
      });
})