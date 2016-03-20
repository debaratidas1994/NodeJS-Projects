$('.removeBook').click(function (e) {
	var deleteId = $(this).data('id');
	return $.ajax({
	url: '/manage/books/delete/' + deleteId,
	type: 'DELETE',
	cache: false,
	success: function () 
	{
		window.location = '/manage/books'
	},
	error: function (xhr) {
		console.log(xhr);
	}
});
	
});

