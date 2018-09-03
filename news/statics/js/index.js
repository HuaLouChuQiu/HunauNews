$(function(){
    // 热度排行
    $.ajax({
        type: 'GET',
        url: '../../../news/rankNews',
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            for(var i=0;i<4;i++){
                var date = new Date(data[i].create_time);
                // var date = new Date(data[i].create_time).Format("yyyy-MM-dd");
                var Y = date.getFullYear();
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate() + ' '; 
                var MD=M+D;

                console.log(Y)
                console.log(MD)
                
                let html = 
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
// 农大头条
    $.ajax({
        type: 'GET',
        url: '../../../news/showNewsByClass1',
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                let html = 
                `
                <a href="#" target="_blank">
                <p class="service_img">
                    <img src="statics/images/news (81).png" width="320" height="120" alt="" />
                </p>
                <div class="service_info">
                    <p class="title">${data[i].title}</p>
                    <p class="description">${data[i].text}</p>
                </div>
            </a>
            <a href="#" target="_blank" class="details">more<i class="fa fa-angle-right"></i></a>
                `
                $('#serviceitem_0').append(html);
            }
        },
        error:function(error){
            console.log(error);
        }
        
    });
    // 新闻资讯
    $.ajax({
        type: 'GET',
        url: '../../../news/showNewsByClass2',
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                // let date = new Date(data[i].create_time).Format("yyyy-MM-dd");
                var oDate = new Date(data[i].create_time);
                var oY = oDate.getFullYear() + '-';
                var oM = (oDate.getMonth()+1 < 10 ? '0'+(oDate.getMonth()+1) : oDate.getMonth()+1) + '-';
                var oD = oDate.getDate() + ' '; 
                var oMD=oY+oM+oD;
                let html = 
                `
                <div class="project_img"><img src="statics/images/news (57).png" alt="" width="650" height="385" /></div>
                <div class="project_info">
                    <div>
                        <p class="title">${data[i].title}</p>
                        <p class="subtitle">${oMD}</p>
                        <p class=" description0 hide">${data[i].text}</p>
                    </div>
                </div>
                `
                $('.projectitem_wrapper').each(function(index,item){
                    // console.log(index)
                    if(i == index){
                        $(item).append(html)
                    }
                })
            }
        },
        error:function(error){
            console.log(error);
        }
        
    });
})