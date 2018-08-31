$(function(){
    $.ajax({
        type: 'GET',
        url: '../../../news/showPeople',
        dataType: 'JSON',
        success: function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                var html = 
                `
                <div class="wrap">
                <div class="teamitem">
                    <a href="team_detail.html">
                        <div class="teamimg"><img src="statics/images/char0.jpg" width="320" height="320" /></div>
                        <div class="wrap">
                            <div><span class="h"></span><span class="v"></span></div>
                        </div>
                    </a>
                    <div class="teaminfo">
                        <p class="title">
                            <a href="#">${data[i].people_name}</a>
                        </p>
                        <p class="subtitle">${data[i].people_class}</p>
                        <p class="description">${data[i].people_work}</p>
                    </div>
                    <a href="team_detail.html?id=${data[i].people_id}" target="_blank" class="details">more<i class="fa fa-angle-right"></i></a>
                </div>
                `
                $('#teamlist').append(html);
            }
        },
        error:function(error){
            console.log(error);
        }
        
      });
})