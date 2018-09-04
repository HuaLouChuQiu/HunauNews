    // $('#searchname').blur(function(){
    //     var searchname = $(this).val();
    //     alert('searchname');
    // });
    
    $(function(){
        $("#btn-success").click(function(){
            // console.log('ok')
            // console.log($(this).text());
            // console.debug(searchname);  
    
           var searchname = $("#searchname").val();
           
            if(searchname == ''){
                alert("还没输入你想查询的内容");
            }else{
                $.ajax({
                    type: "POST",
                    url: "",
                    data: "searchname" + $("#searchname").val(),
                    dataType:"json",
                    success:function(data){

                    },
                    error:function(){

                    }
                })
            }
        });
    });
    

    
