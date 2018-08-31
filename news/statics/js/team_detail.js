$(function(){
    function getUrlParam(name)
    {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
    } 
    
    var id = getUrlParam('id');
    console.log(getUrlParam('id'))
    console.log(id);
    $.ajax({
        type: 'GET',
        url: '../../../news/showSomeone',
        dataType: 'JSON',
        data:{
            people_id : id
        },
        success: function(data){
            console.log(data[0]);
                var html = 
                `
                <div id="teamimage"><img src="${data[0].people_image}" width="408" /></div>
                <div id="teambody">
                    <div class="theader">
                        <p class="title">${data[0].people_name}</p>
                        <p class="subtitle">${data[0].people_class}</p>
                        <div class="postbody">
                            <p><span style="font-size: 16px;"></span></p>
                            <p><span style="font-size: 16px;">基本信息</span><br /><br />-&nbsp;${data[0].people_information}</p>
                            <p style="border-top:1px dotted  #dadada; margin-top:30px; margin-bottom:10px;"><br /></p>
                            <p><span style="font-size: 16px;">个人履历</span><br /><br />${data[0].people_experience}</p>
                            <p style="border-top:1px dotted  #dadada; margin-top:30px; margin-bottom:10px;"><br /></p>
                            <p><span style="font-size: 16px;">人物成就</span><br /><br />-&nbsp;${data[0].people_text}</p>
                            <p style="border-top:1px dotted  #dadada; margin-top:30px; margin-bottom:10px;"><br /></p>
                        </div>
                    </div>
                </div>
                `
                $('#teampost').append(html);
        },
        error:function(error){
            console.log(error);
        }
        
      });
})