$(function(){
    $.ajax({
        type: 'GET',
        url: '../../news/showPeople',
        dataType: JSON,
        success: function(data){
            console.log(data);
            for(var i=0;i<data.lengthl;i++){
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
                            <a href="#">符少辉</a>
                        </p>
                        <p class="subtitle">党委副书记、校长</p>
                        <p class="description">主持行政工作，负责审计、外事等工作。分管审计处、国际交流与合作处。联系国际学院，中国民主同盟湖南农业大学委员会。
                        </p>
                    </div>
                    <a href="team_detail.html" target="_blank" class="details">more<i class="fa fa-angle-right"></i></a>
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