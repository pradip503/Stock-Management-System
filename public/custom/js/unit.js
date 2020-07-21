
$(document).ready(function () {
    // top bar active
    $('#navUnit').addClass('active');
  
    // loads data initially
    loadUnits();
    
  
    // submit unit form function
    $("#submitUnitForm").unbind('submit').bind('submit', function () {
      // remove the error text
      $(".text-danger").remove();
      // remove the form error
      $('.form-group').removeClass('has-error').removeClass('has-success');
  
      var unitName = $("#unitName").val();
      var unitShortName = $("#unitShortName").val();
  
      if (unitName == "") {
        $("#unitName").after('<p class="text-danger">Unit Name field is required</p>');
        $('#unitName').closest('.form-group').addClass('has-error');
      } else {
        // remov error text field
        $("#unitName").find('.text-danger').remove();
        // success out for form 
        $("#unitName").closest('.form-group').addClass('has-success');
      }
  
      if (unitShortName == "") {
        $("#unitShortName").after('<p class="text-danger">Unit Short Name field is required</p>');
  
        $('#unitShortName').closest('.form-group').addClass('has-error');
      } else {
        // remov error text field
        $("#unitShortName").find('.text-danger').remove();
        // success out for form 
        $("#unitShortName").closest('.form-group').addClass('has-success');
      }
  
      if (unitName && unitShortName) {
        var form = $(this);
        // button loading
        $("#createunitBtn").button('loading');
  
        $.ajax({
          url: form.attr('action'),
          type: form.attr('method'),
          data: form.serialize(),
          dataType: 'json',
          success: function (response) {
  
            console.log(response);
            // button loading
            $("#createUnitBtn").button('reset');
  
            if (response.success == true) {
              // reload the manage member table 
              // manageunitTable.ajax.reload(null, false);
              loadUnits();
  
              // reset the form text
              $("#submitUnitForm")[0].reset();
              // remove the error text
              $(".text-danger").remove();
              // remove the form error
              $('.form-group').removeClass('has-error').removeClass('has-success');
  
              $('#add-unit-messages').html('<div class="alert alert-success">' +
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
    }); // /submit unit form function
  
  });
  
  function editUnits(unitId = null) {
    if (unitId) {
      // remove hidden unit id text
      $('#unitId').remove();
  
      // remove the error 
      $('.text-danger').remove();
      // remove the form-error
      $('.form-group').removeClass('has-error').removeClass('has-success');
  
      // modal loading
      $('.modal-loading').removeClass('div-hide');
      // modal result
      $('.edit-unit-result').addClass('div-hide');
      // modal footer
      $('.editUnitFooter').addClass('div-hide');
  
      $.ajax({
        url: '/api/fetchSelectedUnit',
        type: 'post',
        data: {
          unitId: unitId
        },
        dataType: 'json',
        success: function (response) {
          // modal loading
          $('.modal-loading').addClass('div-hide');
          // modal result
          $('.edit-unit-result').removeClass('div-hide');
          // modal footer
          $('.editUnitFooter').removeClass('div-hide');
  
          // setting the unit name value 
          $('#editUnitName').val(response.data.unit_name);
          // setting the unit status value
          $('#editUnitShortName').val(response.data.unit_short_name);
          // unit id 
          $(".editUnitFooter").after('<input type="hidden" name="unitId" id="unitId" value="' + response.data.unit_id + '" />');
  
          // update unit form 
          $('#editUnitForm').unbind('submit').bind('submit', function () {
  
            // remove the error text
            $(".text-danger").remove();
            // remove the form error
            $('.form-group').removeClass('has-error').removeClass('has-success');
  
            var unitName = $('#editUnitName').val();
            var unitShortName = $('#editUnitShortName').val();
  
            if (unitName == "") {
              $("#editUnitName").after('<p class="text-danger">Unit Name field is required</p>');
              $('#editUnitName').closest('.form-group').addClass('has-error');
            } else {
              // remov error text field
              $("#editUnitName").find('.text-danger').remove();
              // success out for form 
              $("#editUnitName").closest('.form-group').addClass('has-success');
            }
  
            if (unitShortName == "") {
              $("#editUnitShortName").after('<p class="text-danger">Unit Short Name field is required</p>');
  
              $('#editUnitShortName').closest('.form-group').addClass('has-error');
            } else {
              // remove error text field
              $("#editUnitShortName").find('.text-danger').remove();
              // success out for form 
              $("#editUnitShortName").closest('.form-group').addClass('has-success');
            }
  
            if (unitName && unitShortName) {
              var form = $(this);

              console.log('triggered')
  
              // submit btn
              $('#editUnitBtn').button('loading');
  
              $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: form.serialize(),
                dataType: 'json',
                success: function (response) {
  
                  if (response.success == true) {
                    // submit btn
                    $('#editUnitBtn').button('reset');
  
                    // reload the manage member table 
                    // manageunitTable.ajax.reload(null, false);
                    loadUnits()
  
                    // remove the error text
                    $(".text-danger").remove();
                    // remove the form error
                    $('.form-group').removeClass('has-error').removeClass('has-success');
  
                    $('#edit-unit-messages').html('<div class="alert alert-success">' +
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
          }); // /update unit form
  
        } // /success
      }); // ajax function
  
    } else {
      alert('error!! Refresh the page again');
    }
  } // /edit units function
  
  function removeUnits(unitId = null) {
    if (unitId) {
      $('#removeUnitId').remove();
      $.ajax({
        url: '/api/fetchSelectedunit',
        type: 'post',
        data: {
          unitId: unitId
        },
        dataType: 'json',
        success: function (response) {
          $('.removeUnitFooter').after('<input type="hidden" name="removeUnitId" id="removeUnitId" value="' + response.unit_id + '" /> ');
  
          // click on remove button to remove the unit
          $("#removeUnitBtn").unbind('click').bind('click', function () {
            // button loading
            $("#removeUnitBtn").button('loading');
  
            $.ajax({
              url: '/api/removeUnit',
              type: 'post',
              data: {
                unitId: unitId
              },
              dataType: 'json',
              success: function (response) {
                console.log(response);
                // button loading
                $("#removeUnitBtn").button('reset');
                if (response.success == true) {
  
                  // hide the remove modal 
                  $('#removeMemberModal').modal('hide');
  
                  // reload the unit table 
                  // manageunitTable.ajax.reload(null, false);
                  loadUnits();
  
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
            }); // /ajax function to remove the unit
  
          }); // /click on remove button to remove the unit
  
        } // /success
      }); // /ajax
  
      $('.removeUnitFooter').after();
    } else {
      alert('error!! Refresh the page again');
    }
  } // /remove units function
  
  
  
  function loadUnits(){
  
    $activeunits = "";
  
    $.ajax({
      url:"/api/fetchUnits",
      type: 'GET',
      dataType: 'json',
      success: function(data){
  
        // empties the table before loading new data
        $('#manageUnitTableBody').html('');
        
        data.forEach((unit,i) => {
  
          $button = `<div class="btn-group">
                      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Action <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a type="button" data-toggle="modal" data-target="#editUnitModel" onclick="editUnits('${unit.unit_id}')"> <i class="glyphicon glyphicon-edit"></i> Edit</a></li>
                        <li><a type="button" data-toggle="modal" data-target="#removeMemberModal" onclick="removeUnits('${unit.unit_id}')"> <i class="glyphicon glyphicon-trash"></i> Remove</a></li>       
                      </ul>
                    </div>`;
    
          $('#manageUnitTableBody').append(`
          <tr>
          <td>${i+1}</td>
            <td>${unit.unit_name}</td>
            <td>${unit.unit_short_name}</td>
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