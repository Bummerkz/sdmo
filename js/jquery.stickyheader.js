window.onscroll = function() {stickyHead()};
$(document).on('click', function(){
    stickyHead();
});

/*
document.addEventListener('scroll', function (event) {
    if (typeof event.target.classList !== 'undefined') {
        
        if (event.target.classList.contains('sticky-scroll')) { // or any other filtering condition        
             if($("table").is("#cloneHead")){
                 var box = event.target.getBoundingClientRect();
                 var stickyOffset =  $('table:visible').not("#cloneHead, #cloneXHead").offset().left;
                 console.log( );
                 $("#cloneHead").css({ left:(box.left + pageXOffset - event.target.scrollLeft)});
             }
        }     
    }
    
}, true);
*/
function stickyHead() {

    try {
        if($('table:visible').not("#cloneHead, #cloneXHead").length>1)
            return false;
        var stickyHead =  $('table:visible').not("#cloneHead, #cloneXHead").find('tr').first();
        var stickyOffset =  $('table:visible').not("#cloneHead, #cloneXHead").find('tr').eq(1);
        colWidthResize(stickyHead,stickyOffset);
      if (window.pageYOffset >= (stickyOffset.offset().top -11)) {
        cloneHead(stickyHead, stickyOffset)
      } else {
        $("#cloneHead").remove();
      }
      if (window.pageXOffset >= 50) {
        cloneXHead(stickyOffset)
      } else {
        $("#cloneXHead").remove();
      }
      
    } catch (err) {
        return;
    }
}

function stickyHeadModal(el) {

    try {
        var stickyHead =  el.find('table:visible').not("#cloneHead, #cloneXHead").find('tr').first();
        var stickyOffset =  el.find('table:visible').not("#cloneHead, #cloneXHead").find('tr').eq(1);

        colWidthResize(stickyHead,stickyOffset);
      if (el.position().top >= (stickyOffset.offset().top -11)) {
        cloneHead(stickyHead, stickyOffset, el)
      } else {
        $("#cloneHead").remove();
      }
      if (el.position().left >= 50) {
        cloneXHead(stickyOffset)
      } else {
        $("#cloneXHead").remove();
      }
      
    } catch (err) {
        return;
    }
}

function colWidthResize(stickyHead,stickyOffset){
    
    var stickyHeadTd = stickyHead.find('td,th');
    sumWidth = 0;
    stickyHeadTd.each(function(i){
        $("#cloneHead").find("td,th").eq(i).width($(this).width());
        sumWidth += Number($(this).width());
    });
    $("#cloneXHead").width(sumWidth)
}

function cloneHead(stickyHead, stickyOffset, container){
    container = container || false;
    if(!$("table").is("#cloneHead")){
        var clone = stickyHead.clone();
        var html = "<table class='sticky' id='cloneHead'><thead>"+clone.html()+"</thead></table>"
        if(container === false) {
            $('table:visible').not("#cloneHead").before(html);
            
            $("#cloneHead").width($('table:visible').not("#cloneHead, #cloneXHead").outerWidth()).addClass($('table:visible').not("#cloneHead, #cloneXHead").attr('class'))
        } else {
            table = container.find('table:visible');
            table.not("#cloneHead").before(html);
            $("#cloneHead").width(table.not("#cloneHead, #cloneXHead").outerWidth()).addClass(table.not("#cloneHead, #cloneXHead").attr('class'))
        }
    } else {
        if(window.pageYOffset >= (stickyOffset.offset().top + 12 + stickyHead.parents('table').height()))
            $("#cloneHead").remove();
        if(container === false) {
            $("#cloneHead").css({"top":$(window).scrollTop()-parseInt($('table:visible').css('margin-Top'))});
        } else {
            table = container.find('table:visible').not("#cloneHead, #cloneXHead");
            modal_content = container.find('.modal-content');
            console.log(container.css('margin-Top'));
            $("#cloneHead").css({"top":container.scrollTop()+30+(modal_content.offset().top - table.offset().top)});
        }
    }

}

function cloneHeadResize(){
     $("#cloneHead").width($('table:visible').not("#cloneHead, #cloneXHead").outerWidth());
}

function cloneXHeadResize(stickyOffset){
    
    var cols = stickyOffset.find('th:not(.cold)');
    
    cols.each(function(i){
        
        
    });
    
}

function cloneXHead(stickyOffset){
    if(!$("table").is("#cloneXHead")){
        var clone = $('table:visible').not("#cloneHead,#cloneXHead").clone();
        var html = "<table class='sticky' id='cloneXHead'>"+clone.html()+"</table>"
        $('table:visible').not("#cloneHead, #cloneXHead").before( html);
        $("#cloneXHead").addClass($('table:visible').not("#cloneHead, #cloneXHead").attr('class')).find("td:not(.leftHead),th").remove();
        colWidthResize(stickyOffset);
    } else {
        $("#cloneXHead").css({"left":$(window).scrollLeft()+$('table:visible').not("#cloneHead, #cloneXHead").offset().left - 30, 
            "top": stickyOffset.offset().top, "z-index":"5"});
        colWidthResize(stickyOffset);
    }
        
}

