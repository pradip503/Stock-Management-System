var manageProductTable;

$(document).ready(function() {
	// top nav bar 
	$('#navProduct').addClass('active');
	// manage product data table
	loadProducts();

	// add product modal btn clicked
	$("#addProductModalBtn").unbind('click').bind('click', function() {

		// fetchCategories & Brands for dropdown to add product
		fetchBrands();
		fetchCategories();

		// // product form reset
		$("#submitProductForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit product form
		$("#submitProductForm").unbind('submit').bind('submit', function() {

			// form validation
			var productName = $("#productName").val();
			var quantity = $("#quantity").val();
			var rate = $("#rate").val();
			var brandName = $("#brandName").val();
			var categoryName = $("#categoryName").val();
			var productStatus = $("#productStatus").val();
	

			if(productName == "") {
				$("#productName").after('<p class="text-danger">Product Name field is required</p>');
				$('#productName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#productName").find('.text-danger').remove();
				// success out for form 
				$("#productName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(quantity == "") {
				$("#quantity").after('<p class="text-danger">Quantity field is required</p>');
				$('#quantity').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#quantity").find('.text-danger').remove();
				// success out for form 
				$("#quantity").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(rate == "") {
				$("#rate").after('<p class="text-danger">Rate field is required</p>');
				$('#rate').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#rate").find('.text-danger').remove();
				// success out for form 
				$("#rate").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(brandName == "") {
				$("#brandName").after('<p class="text-danger">Brand Name field is required</p>');
				$('#brandName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#brandName").find('.text-danger').remove();
				// success out for form 
				$("#brandName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(categoryName == "") {
				$("#categoryName").after('<p class="text-danger">Category Name field is required</p>');
				$('#categoryName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#categoryName").find('.text-danger').remove();
				// success out for form 
				$("#categoryName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(productStatus == "") {
				$("#productStatus").after('<p class="text-danger">Product Status field is required</p>');
				$('#productStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#productStatus").find('.text-danger').remove();
				// success out for form 
				$("#productStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(productName && quantity && rate && brandName && categoryName && productStatus) {
				// submit loading button
				$("#createProductBtn").button('loading');

				var form = $(this);
				// var formData = new FormData(this);

				$.ajax({
					url: form.attr('action'),
					type: form.attr('method'),
					data: form.serialize(),
					dataType: 'json',
					success:function(response) {

						if(response.success == true) {
							// submit loading button
							$("#createProductBtn").button('reset');
							
							$("#submitProductForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-product-messages').html('<div class="alert alert-success">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

							// remove the mesages
		          $(".alert-success").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert

		          			// reload the manage student table
							// manageProductTable.ajax.reload(null, true);
							loadProducts();	

							// remove text-error 
							$(".text-danger").remove();
							// remove from-group error
							$(".form-group").removeClass('has-error').removeClass('has-success');

						} // /if response.success
						
					} // /success function
				}); // /ajax function
			}	 // /if validation is ok 					

			return false;
		}); // /submit product form

	}); // /add product modal btn clicked
	

	// remove product 	

}); // document.ready fucntion

function editProduct(productId = null) {

	// loads brands and categories for edit dropdown
	fetchEditBrands();
	fetchEditCategories();

	if(productId) {
		$("#productId").remove();		
		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');
		// modal spinner
		$('.div-loading').removeClass('div-hide');
		// modal div
		$('.div-result').addClass('div-hide');

		$.ajax({
			url: 'api/fetchSelectedProduct',
			type: 'post',
			data: {productId: productId},
			dataType: 'json',
			success:function(response) {		
			// alert(response.product_image);
				// modal spinner
				$('.div-loading').addClass('div-hide');
				// modal div
				$('.div-result').removeClass('div-hide'); 

				// product id 
				$(".editProductFooter").append('<input type="hidden" name="productId" id="productId" value="'+response.data.product_id+'" />');				
				$(".editProductPhotoFooter").append('<input type="hidden" name="productId" id="productId" value="'+response.data.product_id+'" />');				
				
				// product name
				$("#editProductName").val(response.data.product_name);
				// quantity
				$("#editQuantity").val(response.data.quantity);
				// rate
				$("#editRate").val(response.data.rate);
				// brand name
				$("#editBrandName").val(response.data.brand_id);
				// category name
				$("#editCategoryName").val(response.data.categories_id);
				// status
				$("#editProductStatus").val(response.data.active);

				// update the product data function
				$("#editProductForm").unbind('submit').bind('submit', function() {

					// form validation
					var productName = $("#editProductName").val();
					var quantity = $("#editQuantity").val();
					var rate = $("#editRate").val();
					var brandName = $("#editBrandName").val();
					var categoryName = $("#editCategoryName").val();
					var productStatus = $("#editProductStatus").val();
								

					if(productName == "") {
						$("#editProductName").after('<p class="text-danger">Product Name field is required</p>');
						$('#editProductName').closest('.form-group').addClass('has-error');
					}	else {
						// remov error text field
						$("#editProductName").find('.text-danger').remove();
						// success out for form 
						$("#editProductName").closest('.form-group').addClass('has-success');	  	
					}	// /else

					if(quantity == "") {
						$("#editQuantity").after('<p class="text-danger">Quantity field is required</p>');
						$('#editQuantity').closest('.form-group').addClass('has-error');
					}	else {
						// remov error text field
						$("#editQuantity").find('.text-danger').remove();
						// success out for form 
						$("#editQuantity").closest('.form-group').addClass('has-success');	  	
					}	// /else

					if(rate == "") {
						$("#editRate").after('<p class="text-danger">Rate field is required</p>');
						$('#editRate').closest('.form-group').addClass('has-error');
					}	else {
						// remov error text field
						$("#editRate").find('.text-danger').remove();
						// success out for form 
						$("#editRate").closest('.form-group').addClass('has-success');	  	
					}	// /else

					if(brandName == "") {
						$("#editBrandName").after('<p class="text-danger">Brand Name field is required</p>');
						$('#editBrandName').closest('.form-group').addClass('has-error');
					}	else {
						// remov error text field
						$("#editBrandName").find('.text-danger').remove();
						// success out for form 
						$("#editBrandName").closest('.form-group').addClass('has-success');	  	
					}	// /else

					if(categoryName == "") {
						$("#editCategoryName").after('<p class="text-danger">Category Name field is required</p>');
						$('#editCategoryName').closest('.form-group').addClass('has-error');
					}	else {
						// remov error text field
						$("#editCategoryName").find('.text-danger').remove();
						// success out for form 
						$("#editCategoryName").closest('.form-group').addClass('has-success');	  	
					}	// /else

					if(productStatus == "") {
						$("#editProductStatus").after('<p class="text-danger">Product Status field is required</p>');
						$('#editProductStatus').closest('.form-group').addClass('has-error');
					}	else {
						// remov error text field
						$("#editProductStatus").find('.text-danger').remove();
						// success out for form 
						$("#editProductStatus").closest('.form-group').addClass('has-success');	  	
					}	// /else					

					if(productName && quantity && rate && brandName && categoryName && productStatus) {
						// submit loading button
						$("#editProductBtn").button('loading');

						var form = $(this);
						var formData = new FormData(this);

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {
								console.log(response);
								if(response.success == true) {
									// submit loading button
									$("#editProductBtn").button('reset');																		

									$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																			
									// shows a successful message after operation
									$('#edit-product-messages').html('<div class="alert alert-success">'+
				            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
				            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
				          '</div>');

									// remove the mesages
				          $(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert

				                    // reload the manage student table
									// manageProductTable.ajax.reload(null, true);
									loadProducts();

									// remove text-error 
									$(".text-danger").remove();
									// remove from-group error
									$(".form-group").removeClass('has-error').removeClass('has-success');

								} // /if response.success
								
							} // /success function
						}); // /ajax function
					}	 // /if validation is ok 					

					return false;
				}); // update the product data function

				// update the product image				
				$("#updateProductImageForm").unbind('submit').bind('submit', function() {					
					// form validation
					var productImage = $("#editProductImage").val();					
					
					if(productImage == "") {
						$("#editProductImage").closest('.center-block').after('<p class="text-danger">Product Image field is required</p>');
						$('#editProductImage').closest('.form-group').addClass('has-error');
					}	else {
						// remov error text field
						$("#editProductImage").find('.text-danger').remove();
						// success out for form 
						$("#editProductImage").closest('.form-group').addClass('has-success');	  	
					}	// /else

					if(productImage) {
						// submit loading button
						$("#editProductImageBtn").button('loading');

						var form = $(this);
						var formData = new FormData(this);

						$.ajax({
							url : form.attr('action'),
							type: form.attr('method'),
							data: formData,
							dataType: 'json',
							cache: false,
							contentType: false,
							processData: false,
							success:function(response) {
								
								if(response.success == true) {
									// submit loading button
									$("#editProductImageBtn").button('reset');																		

									$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																			
									// shows a successful message after operation
									$('#edit-productPhoto-messages').html('<div class="alert alert-success">'+
				            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
				            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
				          '</div>');

									// remove the mesages
				          $(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert

				          // reload the manage student table
									manageProductTable.ajax.reload(null, true);

									$(".fileinput-remove-button").click();

									$.ajax({
										url: 'php_action/fetchProductImageUrl.php?i='+productId,
										type: 'post',
										success:function(response) {
										$("#getProductImage").attr('src', response);		
										}
									});																		

									// remove text-error 
									$(".text-danger").remove();
									// remove from-group error
									$(".form-group").removeClass('has-error').removeClass('has-success');

								} // /if response.success
								
							} // /success function
						}); // /ajax function
					}	 // /if validation is ok 					

					return false;
				}); // /update the product image

			} // /success function
		}); // /ajax to fetch product image

				
	} else {
		alert('error please refresh the page');
	}
} // /edit product function

// remove product 
function removeProduct(productId = null) {
	if(productId) {
		// remove product button clicked
		$("#removeProductBtn").unbind('click').bind('click', function() {
			// loading remove button
			$("#removeProductBtn").button('loading');
			$.ajax({
				url: 'api/removeProduct',
				type: 'post',
				data: {productId: productId},
				dataType: 'json',
				success:function(response) {
					// loading remove button
					$("#removeProductBtn").button('reset');
					if(response.success == true) {
						// remove product modal
						$("#removeProductModal").modal('hide');

						// update the product table
						// manageProductTable.ajax.reload(null, false);
						loadProducts();

						// remove success messages
						$(".remove-messages").html('<div class="alert alert-success">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

						// remove the mesages
	          $(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert
					} else {

						// remove success messages
						$(".removeProductMessages").html('<div class="alert alert-success">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

						// remove the mesages
	          $(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert

					} // /error
				} // /success function
			}); // /ajax fucntion to remove the product
			return false;
		}); // /remove product btn clicked
	} // /if productid
} // /remove product function


// function to load products initially as well during the table
function loadProducts(){

		$activeProducts = "";
	  
		$.ajax({
		  url:"/api/fetchProducts",
		  type: 'GET',
		  dataType: 'json',
		  success: function(data){
	  
			// empties the table before loading new data
			$('#manageProductTableBody').html('');
			
			data.forEach((product,i) => {
	  
			  if(product.active == 1) {
				// activate member
				$activeProducts = "<label class='label label-success'>Available</label>";
			  } else {
				// deactivate member
				$activeProducts = "<label class='label label-danger'>Not Available</label>";
			  }
	  
			  $button = `
						<div class="btn-group">
							<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Action <span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
							<li><a type="button" data-toggle="modal" id="editProductModalBtn" data-target="#editProductModal" onclick="editProduct('${product.product_id}')"> <i class="glyphicon glyphicon-edit"></i> Edit</a></li>
							<li><a type="button" data-toggle="modal" data-target="#removeProductModal" id="removeProductModalBtn" onclick="removeProduct('${product.product_id}')"> <i class="glyphicon glyphicon-trash"></i> Remove</a></li>       
							</ul>
						</div>`;
		
			  $('#manageProductTableBody').append(`
			  <tr>
			  	<td>${i+1}</td>
			  	<td>${product.product_name}</td>
			  	<td>${product.rate}</td>
			  	<td>${product.quantity}</td>
				<td>${product.brand_name}</td>
				<td>${product.categories_name}</td>
				<td>`+ $activeProducts +`</td>
				<td>` + $button +`</td>
			  </tr>
			`);
			});
			
		  },
		  error: function(error){
			console.log(error);
		  }
		});
}


function fetchBrands(){

	$brandOptions = "";

	$.ajax({
		url:"/api/fetchBrands",
		type: 'GET',
		dataType: 'json',
		success: function(data){

			$('#brandName').html('');

			data.forEach(brand => {
				$brandOptions = $brandOptions + `<option value='${brand.brand_id}'>${brand.brand_name}</option>`	
			});

			$('#brandName').append(`<option value="">~~SELECT~~</option>`+ $brandOptions);

		},
		error: function(error){
			$('#brandName').html(`Unable to fetch brands!`);
		}
	});
}

// Fetch categories function for add product modal
function fetchCategories(){

	$categoryOptions = "";

	$.ajax({
		url:"/api/fetchCategories",
		type: 'GET',
		dataType: 'json',
		success: function(data){
			$('#categoryName').html('');

			data.forEach(category => {
				$categoryOptions = $categoryOptions + `<option value='${category.categories_id}'>${category.categories_name}</option>`	
			});

			$('#categoryName').append(`<option value="">~~SELECT~~</option>`+ $categoryOptions);
		},
		error: function(error){
			$('#categoryName').html(`Unable to fetch categories!`);
		}
	});
}

// Fetch brand function for edit product modal
function fetchEditBrands(){

	$brandOptions = "";

	$.ajax({
		url:"/api/fetchBrands",
		type: 'GET',
		dataType: 'json',
		success: function(data){

			$('#editBrandName').html('');

			data.forEach(brand => {
				$brandOptions = $brandOptions + `<option value='${brand.brand_id}'>${brand.brand_name}</option>`	
			});

			$('#editBrandName').append(`<option value="">~~SELECT~~</option>`+ $brandOptions);

		},
		error: function(error){
			$('#editBrandName').html(`Unable to fetch brands!`);
		}
	});
}

// Fetch categories function for edit product modal

function fetchEditCategories(){

	$categoryOptions = "";

	$.ajax({
		url:"/api/fetchCategories",
		type: 'GET',
		dataType: 'json',
		success: function(data){
			$('#editCategoryName').html('');

			data.forEach(category => {
				$categoryOptions = $categoryOptions + `<option value='${category.categories_id}'>${category.categories_name}</option>`	
			});

			$('#editCategoryName').append(`<option value="">~~SELECT~~</option>`+ $categoryOptions);
		},
		error: function(error){
			$('#editCategoryName').html(`Unable to fetch categories!`);
		}
	});
}