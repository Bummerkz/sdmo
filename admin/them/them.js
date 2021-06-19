$(function () {
    var modal = $('#Modal');
    $('.modal-help').click(function () {
        $('.modal-title', modal).text(_HELP_);
        
        $.ajax({
            url: "ajax/get_help.php",
            dataType: "html",
            success: function (response) {
                $('.modal-body', modal).html(response);
            },
            error: function (err) {
                $('.modal-body', modal).html('<b>'+_NOTCOMERRSERVER_+'</b>').addClass('alert-danger').fadeIn(500);
            }
        });        
    });
});