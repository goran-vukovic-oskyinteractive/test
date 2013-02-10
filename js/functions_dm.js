/* Javascript function for Distribution Management page */
function viewportChange() {
    var viewportHeight = $(window).height();
    var viewportWidth = $(window).width();
    var emailContentHeight = viewportHeight - 108
    $("#email-content").css("height", emailContentHeight); /* email content */
    var infovisLeft = $("#mailbox").css("width").replace("px", "");
    var infovisWidth = viewportWidth - infovisLeft;
    //use full remaining width of the window
    $("#email-content").css("width", infovisWidth);
    //use 66% of the window for the space tree
    $("#graph").css("height", /*emailContentHeight * 2 / 3 */ 500); //fixed size for now
}
$(document).ready(function () {
    /* Tabs */
	$(".tabs").tabs();
	/* Clone */
	$("#select-field li .btn-minus").css("display","none");
	$(".btn-plus").click(function() {
		removeScroll();
	  	$("#select-field li:last").clone(true).insertAfter("#select-field li:last");
		$("#select-field li:last input[type='text']").val('');	  	
		$(".btn-minus").css("display","block");		
		addScroll();
		return false;
	});
	$(".btn-minus").click(function(event) {
	  	var i = $(".field").size();
		if(i > 1) {			
			event.preventDefault();
			$(this).closest('.field').remove();	
			return false;
			}
		else {
			/****** WORK IN PROGESS *****/
			//$(".btn-minus").css("display","none");
			//$("#select-field li:first .btn-minus").css("display","none");
			alert("Last item cannot be removed");
			}
		
	});
});