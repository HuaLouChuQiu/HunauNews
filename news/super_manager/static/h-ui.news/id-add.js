$(function(){
    $("#Submission").click(function(){
        console.log($("#adminName").val())
        var sex = $('input:radio[name="sex"]:checked').val();
        console.log(sex)
        console.log($("#phone").val())
        console.log($("#email").val())
        // $('#container').change(function(){
        //     console.log($(this).find(":selected").val())
        // });
        console.log($("textarea").val());
        $.ajax({
            type: "POST",
		    url: "  ",
            data: "adminName=" + $("#adminName").val() + "&sex=" + $('input:radio[name="sex"]:checked').val()
            + "&phone=" + $("#phone").val() + "&email=" + $("#email").val(),
		    dataType:"json",
		    success: function( ){
		    
            },
            error:function(){
                
            }
        })
    });
})