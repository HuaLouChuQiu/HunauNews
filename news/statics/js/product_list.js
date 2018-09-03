$(document).ready(function () {
    leibie(0)
    function leibie(number){
        $.ajax({
            type: 'GET',
            url: '../../../news/showNewsByClass',
            data:{
                number:number,
            },
            dataType: 'JSON',
            success: function(data){
                console.log(data);
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
            leibie(index);
        })
    })


	new pagination({
		pagination:$('.pagination'),
		maxPage: 7, //最大页码数,支持奇数，左右对称
		startPage: 1,    //默认第一页
		currentPage: 2,          //当前页码
		 totalItemCount: 10,    //项目总数,大于0，显示页码总数
		 totalPageCount: 20,        //总页数
		callback:function(pageNum){
			console.info(pageNum);
		}
	});
});