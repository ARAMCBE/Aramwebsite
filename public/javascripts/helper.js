$('.navigation').off('click').on('click', function() {
	$('.navigation').removeClass('active');
	$(this).addClass('hello');
});