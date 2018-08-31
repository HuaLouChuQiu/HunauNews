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
            console.log(data);
                var html = 
                `
                <div id="teamimage"><img src="statics/images/char0.jpg" width="408" /></div>
                <div id="teambody">
                    <div class="theader">
                        <p class="title">符少辉</p>
                        <p class="subtitle">党委副书记、校长</p>
                        <div class="postbody">
                            <p><span style="font-size: 16px;"></span></p>
                            <p><span style="font-size: 16px;">基本信息</span><br /><br />-&nbsp;第九届中国设计业青年百人榜获奖者并颁发证书<br />-&nbsp; Adobe TOP领航者之一&nbsp; 并颁发证书<br />-&nbsp; 作品收录意大利全国工业设计协会丛书中</p>
                            <p style="border-top:1px dotted  #dadada; margin-top:30px; margin-bottom:10px;"><br /></p>
                            <p><span style="font-size: 16px;">个人履历</span><br /><br />-&nbsp; 新西兰GOUW设计师平台收录<br />-&nbsp; 中国网页设计联盟2010-11中国十佳网页<br />-&nbsp; 世界权威电子设计杂志 NEWWEBPICK 推荐设计师及网站推荐<br />-&nbsp; 案例被收录NEWWEBPICK电子杂志 （第29期）<br />-&nbsp; 欧美css设计奖项 cssdesignawards获奖作品<br />-&nbsp; 美国Tympanus在互联网选出35个杰出视觉使用网站之一（其中，中国站仅此一个）<br />-&nbsp; 2012年全球最具权威的Awwwards选出365个全球最佳CSS网站，通过国际评审团的层层筛选，官网被选其中，并获此次评审的最高奖项。</p>
                            <p style="border-top:1px dotted  #dadada; margin-top:30px; margin-bottom:10px;"><br /></p>
                            <p><span style="font-size: 16px;">获奖成绩</span><br /><br />-&nbsp; 站酷主办 曲美家具电脑桌面壁纸设计活动 设计评委<br />-&nbsp; 2014-2015中国网页设计联盟 设计评委</p>
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