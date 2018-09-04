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
                var date = new Date(data[i].create_time);
                // var date = new Date(data[i].create_time).Format("yyyy-MM-dd");
                // var Y = date.getFullYear();
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate() + ' '; 
                var MD=M+D;

                let html = 
                `
                <div class="wow newstitem left">
                <a class="newscontent" target="_blank" href="product_show.html?news_id=${data[i].news_id}&class_id=${data[i].class_id}">
                    <div class="news_wrapper">
                        <div class="newsbody">
                            <p class="date"><span class="md">浏览量<span>${data[i].frequency}</span></span><span class="year">${MD}</span></p>
                            <p class="title">${data[i].title}</p>
                            <div class="separator"></div>
                            <p class="description">${data[i].text}</p>
                        </div>
                    </div>
                    <img class="newsimg"  src="${data[i].image}"/>
                </a>
                <a href="product_show.html?news_id=${data[i].news_id}&class_id=${data[i].class_id}" target="_blank" class="details">more<i class="fa fa-angle-right"></i></a>
            </div>
                `
               
                $('.wrapper').append(html)
    
     
            }
        },
        error:function(error){
            console.log(error);
        }
        
    });
})