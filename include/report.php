<div class="btn-group">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><?= Dictionary::t('INCLUDES', 'REPORTS')?> <span class="caret"></span></button>
    <ul class="dropdown-menu">
        <li><a href="#" page="/ajax/report_svod_params.php"><?= Dictionary::t('INCLUDES', 'REPORT_SVOD')?></a></li>
        <li><a href="#" page="/ajax/report_svod_params_years.php"><?= Dictionary::t('INCLUDES', 'REPORT_SVOD_PARAMS_YEARS')?></a></li>
        <li><a href="#" page="/ajax/report_status.php"><?= Dictionary::t('INCLUDES', 'REPORT_STATUSES')?></a></li>
        <li><a href="#" page="/ajax/report_ping.php"><?= Dictionary::t('INCLUDES', 'REPORT_COM')?></a></li>
    </ul>
</div>
<div id="report-block"></div>
<script>
    var report = $('#report');
    report.delegate('.dropdown-menu a', "click", function () {
        $.ajax({
            url: $(this).attr('page'),
            success: function (response) {
                $('#report-block', report).html(response);
            },
            error: function (err) {
                $('#report-block', report).html('<b>'+_NOTCOMERRSERVER_+'</b>').addClass('alert-danger').fadeIn(500);
            }
        });
    });
    
    
    $(document).on("click","#report-res .toHide", function(){
        
        var reportTd = $(this).removeClass("toHide").addClass("toShow").parent();
        $(this).find("span").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down").text(_SHOW_);
        var rowSpan = reportTd.attr("rowspan");
        
        
        var reportTr = reportTd.parent();
        var nextAllTr = reportTr.nextAll("tr");
        var reportTbody = reportTr.parent();
        reportTd.attr("rowspan", 3);
        nextAllTr.each(function(i){
            
            if(i < (Number(rowSpan)-1)) {
                if($(this).hasClass("notHide")) {
                    $(this).find("td[rowspan]").attr("rowspan", "2")
                } else {
                    $(this).hide()
                }
                if($(this).hasClass("closeBorder"))
                    $(this).addClass('trBorder');
            } else {
                return;
            }
        })
    })
    
    $(document).on("click","#report-res .toShow", function(){
        
        var reportTd = $(this).removeClass("toShow").addClass("toHide").parent();
        
        var reportTr = reportTd.parent();
        var reportTbody = reportTr.parent();
        $(this).find("span").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up").text(_HIDE_);
        
        var nextAllTr = reportTr.nextAll("tr");
        
        var rowSpan = reportTd.attr("rowspan", reportTbody.find('.mainTr').last().nextAll('tr').length+1).attr("rowspan");
        nextAllTr.each(function(i){
        cloneHeadResize();    
            if(i < (Number(rowSpan)-1)){
                if($(this).hasClass("notHide")) {
                } else {
                    $(this).show()
                }
                var tmp = $(this).find("td[rowspan]");
                tmp.attr("rowspan", tmp.attr('mainRowspan'));
                if($(this).hasClass("closeBorder"))
                    $(this).removeClass('trBorder');
            } else {

                return;
            }
        })
    })
    
    $(document).on("click", "#cloneXHead .leftHead button", function(){
        $('#report-res table').not("#cloneHead, #cloneXHead").find("tr").eq($(this).parents('tr').index()+1).find("button").trigger("click")
    })
</script>
