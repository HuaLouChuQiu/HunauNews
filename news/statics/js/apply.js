$(function(){
    $('#apply').click(function(){
        
        let html = 
        `
        <a href="javascript:void(0);" target="_self">
        <span style="color:#2495e4" data-title="已申请">已申请</span>
        <i class="fa fa-angle-right"></i>
    </a>
        `
        $(this).empty()
        $(this).append(html);
    })
})