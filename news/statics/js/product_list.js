$(document).ready(function () {
    pages(0,1);
    //获取总页数
    function pages(number,page){
        $.ajax({
            type: 'GET',
            url: '../../../news/showPage',
            data:{
                class_id:number,
            },
            dataType: 'JSON',
            success: function(allPages){
                console.log(allPages);
                leibie(number,page,allPages);
            },
            error:function(error){

            }
        })
    }
    //获取各个类别的新闻
    function leibie(number,page,allPages){
        $.ajax({
            type: 'GET',
            url: '../../../news/showNewsByClass',
            data:{
                class_id:number,
                page:page
            },
            dataType: 'JSON',
            success: function(data){
                console.log(data);
                $('.content_list').empty();
                $('.pagination').empty();
                for(var i=0;i<data.length;i++){

                    var date = new Date(data[i].create_time);
                    // var date = new Date(data[i].create_time).Format("yyyy-MM-dd");
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    var D = date.getDate() + ' '; 
                    var YMD=Y+M+D;
    
                    let html = 
                    `
                    <li class="projectitem">
                    <a href="product_show.html?news_id=${data[i].news_id}" target="_blank">
                        <div class="project_img"><img src="${data[i].image}" width="500" height="320" /></div>
                        <div class="project_info">
                            <div>
                                <p class="title">${data[i].title}</p>
                                <p class="subtitle">${YMD}</p>
                                <p class="description hide">${data[i].text}</p>
                            </div>
                        </div>
                    </a>
                    <a href="product_show.html?news_id=${data[i].news_id}"  target="_blank" class="details">more<i class="fa fa-angle-right"></i></a>
                </li>
                    `
                    $('.content_list').append(html);
                }
                new pagination({
                    pagination:$('.pagination'),
                    maxPage: 7, //最大页码数,支持奇数，左右对称
                    startPage: 1,    //默认第一页
                    currentPage: page,          //当前页码
                    totalItemCount: data.length,    //项目总数,大于0，显示页码总数
                    totalPageCount: allPages,        //总页数
                    callback:function(pageNum){
                        leibie(number,pageNum)
                    }
                });

            },
            error:function(error){
                console.log(error);
            }
            
        });
    }

   
    $('#category li').each(function(index,item){
        $(item).click(function(){
            $('#category li').find('.active').removeClass('active');
            $(item).find('a').addClass('active');
            console.log(index);
            pages(index,1);
        })
    })

});