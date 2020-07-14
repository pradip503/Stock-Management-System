
$(document).ready(function () {
  // top bar active
  $('#navBrand').addClass('active');

  // loads data initially
  loadBrands();
  

  // submit brand form function
  $("#submitBrandForm").unbind('submit').bind('submit', function () {
    // remove the error text
    $(".text-danger").remove();
    // remove the form error
    $('.form-group').removeClass('has-error').removeClass('has-success');

    var brandName = $("#brandName").val();
    var brandStatus = $("#brandStatus").val();

    if (brandName == "") {
      $("#brandName").after('<p class="text-danger">Brand Name field is required</p>');
      $('#brandName').closest('.form-group').addClass('has-error');
    } else {
      // remov error text field
      $("#brandName").find('.text-danger').remove();
      // success out for form 
      $("#brandName").closest('.form-group').addClass('has-success');
    }

    if (brandStatus == "") {
      $("#brandStatus").after('<p class="text-danger">Brand Name field is required</p>');

      $('#brandStatus').closest('.form-group').addClass('has-error');
    } else {
      // remov error text field
      $("#brandStatus").find('.text-danger').remove();
      // success out for form 
      $("#brandStatus").closest('.form-group').addClass('has-success');
    }

    if (brandName && brandStatus) {
      var form = $(this);
      // button loading
      $("#createBrandBtn").button('loading');

      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        data: form.serialize(),
        dataType: 'json',
        success: function (response) {

          console.log(response);
          // button loading
          $("#createBrandBtn").button('reset');

          if (response.success == true) {
            // reload the manage member table 
            // manageBrandTable.ajax.reload(null, false);
            loadBrands();

            // reset the form text
            $("#submitBrandForm")[0].reset();
            // remove the error text
            $(".text-danger").remove();
            // remove the form error
            $('.form-group').removeClass('has-error').removeClass('has-success');

            $('#add-brand-messages').html('<div class="alert alert-success">' +
              '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
              '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ' + response.messages +
              '</div>');

            $(".alert-success").delay(500).show(10, function () {
              $(this).delay(3000).hide(10, function () {
                $(this).remove();
              });
            }); // /.alert
          } // if

        } // /success
      }); // /ajax	
    } // if

    return false;
  }); // /submit brand form function

});

function editBrands(brandId = null) {
  if (brandId) {
    // remove hidden brand id text
    $('#brandId').remove();

    // remove the error 
    $('.text-danger').remove();
    // remove the form-error
    $('.form-group').removeClass('has-error').removeClass('has-success');

    // modal loading
    $('.modal-loading').removeClass('div-hide');
    // modal result
    $('.edit-brand-result').addClass('div-hide');
    // modal footer
    $('.editBrandFooter').addClass('div-hide');

    $.ajax({
      url: '/api/fetchSelectedBrand',
      type: 'post',
      data: {
        brandId: brandId
      },
      dataType: 'json',
      success: function (response) {
        // modal loading
        $('.modal-loading').addClass('div-hide');
        // modal result
        $('.edit-brand-result').removeClass('div-hide');
        // modal footer
        $('.editBrandFooter').removeClass('div-hide');

        // setting the brand name value 
        $('#editBrandName').val(response.data.brand_name);
        // setting the brand status value
        $('#editBrandStatus').val(response.data.brand_active);
        // brand id 
        $(".editBrandFooter").after('<input type="hidden" name="brandId" id="brandId" value="' + response.data.brand_id + '" />');

        // update brand form 
        $('#editBrandForm').unbind('submit').bind('submit', function () {

          // remove the error text
          $(".text-danger").remove();
          // remove the form error
          $('.form-group').removeClass('has-error').removeClass('has-success');

          var brandName = $('#editBrandName').val();
          var brandStatus = $('#editBrandStatus').val();

          if (brandName == "") {
            $("#editBrandName").after('<p class="text-danger">Brand Name field is required</p>');
            $('#editBrandName').closest('.form-group').addClass('has-error');
          } else {
            // remov error text field
            $("#editBrandName").find('.text-danger').remove();
            // success out for form 
            $("#editBrandName").closest('.form-group').addClass('has-success');
          }

          if (brandStatus == "") {
            $("#editBrandStatus").after('<p class="text-danger">Brand Name field is required</p>');

            $('#editBrandStatus').closest('.form-group').addClass('has-error');
          } else {
            // remove error text field
            $("#editBrandStatus").find('.text-danger').remove();
            // success out for form 
            $("#editBrandStatus").closest('.form-group').addClass('has-success');
          }

          if (brandName && brandStatus) {
            var form = $(this);

            // submit btn
            $('#editBrandBtn').button('loading');

            $.ajax({
              url: form.attr('action'),
              type: form.attr('method'),
              data: form.serialize(),
              dataType: 'json',
              success: function (response) {

                if (response.success == true) {
                  // submit btn
                  $('#editBrandBtn').button('reset');

                  // reload the manage member table 
                  // manageBrandTable.ajax.reload(null, false);
                  loadBrands()

                  // remove the error text
                  $(".text-danger").remove();
                  // remove the form error
                  $('.form-group').removeClass('has-error').removeClass('has-success');

                  $('#edit-brand-messages').html('<div class="alert alert-success">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ' + response.messages +
                    '</div>');

                  $(".alert-success").delay(500).show(10, function () {
                    $(this).delay(3000).hide(10, function () {
                      $(this).remove();
                    });
                  }); // /.alert
                } // /if

              } // /success
            }); // /ajax												
          } // /if

          return false;
        }); // /update brand form

      } // /success
    }); // ajax function

  } else {
    alert('error!! Refresh the page again');
  }
} // /edit brands function

function removeBrands(brandId = null) {
  if (brandId) {
    $('#removeBrandId').remove();
    $.ajax({
      url: '/api/fetchSelectedBrand',
      type: 'post',
      data: {
        brandId: brandId
      },
      dataType: 'json',
      success: function (response) {
        $('.removeBrandFooter').after('<input type="hidden" name="removeBrandId" id="removeBrandId" value="' + response.brand_id + '" /> ');

        // click on remove button to remove the brand
        $("#removeBrandBtn").unbind('click').bind('click', function () {
          // button loading
          $("#removeBrandBtn").button('loading');

          $.ajax({
            url: '/api/removeBrand',
            type: 'post',
            data: {
              brandId: brandId
            },
            dataType: 'json',
            success: function (response) {
              console.log(response);
              // button loading
              $("#removeBrandBtn").button('reset');
              if (response.success == true) {

                // hide the remove modal 
                $('#removeMemberModal').modal('hide');

                // reload the brand table 
                // manageBrandTable.ajax.reload(null, false);
                loadBrands();

                $('.remove-messages').html('<div class="alert alert-success">' +
                  '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                  '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ' + response.messages +
                  '</div>');

                $(".alert-success").delay(500).show(10, function () {
                  $(this).delay(3000).hide(10, function () {
                    $(this).remove();
                  });
                }); // /.alert
              } else {

              } // /else
            } // /response messages
          }); // /ajax function to remove the brand

        }); // /click on remove button to remove the brand

      } // /success
    }); // /ajax

    $('.removeBrandFooter').after();
  } else {
    alert('error!! Refresh the page again');
  }
} // /remove brands function



function loadBrands(){

  $activeBrands = "";

  $.ajax({
    url:"/api/fetchBrands",
    type: 'GET',
    dataType: 'json',
    success: function(data){

      // empties the table before loading new data
      $('#manageBrandTableBody').html('');
      
      data.forEach((brand,i) => {

        if(brand.brand_active == 1) {
          // activate member
          $activeBrands = "<label class='label label-success'>Available</label>";
        } else {
          // deactivate member
          $activeBrands = "<label class='label label-danger'>Not Available</label>";
        }

        $button = `<div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Action <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                      <li><a type="button" data-toggle="modal" data-target="#editBrandModel" onclick="editBrands('${brand.brand_id}')"> <i class="glyphicon glyphicon-edit"></i> Edit</a></li>
                      <li><a type="button" data-toggle="modal" data-target="#removeMemberModal" onclick="removeBrands('${brand.brand_id}')"> <i class="glyphicon glyphicon-trash"></i> Remove</a></li>       
                    </ul>
                  </div>`;
  
        $('#manageBrandTableBody').append(`
        <tr>
        <td>${i+1}</td>
          <td>${brand.brand_name}</td>
          <td>`+ $activeBrands +`</td>
          <td>` + $button +`</td>
        </tr>
      `);
      });
      
    },
    error: function(error){
      console.log(error);
    }
  })

}