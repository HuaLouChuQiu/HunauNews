$(function(){
    $.ajax({
        type: 'GET',
        url: '../../../news/rankNews',
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            for(var i=0;i<4;i++){
                var date = new Date(date[i].create_time);
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
                            <p class="title">${data[i].tital}</p>
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
})