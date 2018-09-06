$(function(){
    $('#apply').click(function(){
        $(this).empty()
        let html = 
        `
        <a href="javascript:void(0);" target="_self">
        <span style="backgroud:#2495e4;color:#fff" data-title="已申请">已申请</span>
        <i class="fa fa-angle-right"></i>
    </a>
        `
        $(this).appand(html);
    })
})