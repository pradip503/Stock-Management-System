$(document).ready(function () {
	// order date picker
	$("#startDate").datepicker({
		dateFormat: "yy-mm-dd",
		maxDate: new Date
	});
	// order date picker
	$("#endDate").datepicker({
		dateFormat: "yy-mm-dd",
		maxDate: new Date
	});


	$("#getOrderReportForm").unbind('submit').bind('submit', function () {

		var startDate = $("#startDate").val();
		var endDate = $("#endDate").val();

		//just to validate
		var dateFrom = $('#startDate').datepicker('getDate');
		var dateTo = $('#endDate').datepicker('getDate');

		if (startDate == "" || endDate == "") {
			if (startDate == "") {
				$("#startDate").closest('.form-group').addClass('has-error');
				$("#startDate").after('<p class="text-danger">The Start Date is required</p>');
			} else {
				$(".form-group").removeClass('has-error');
				$(".text-danger").remove();
			}

			if (endDate == "") {
				$("#endDate").closest('.form-group').addClass('has-error');
				$("#endDate").after('<p class="text-danger">The End Date is required</p>');
			} else {
				$(".form-group").removeClass('has-error');
				$(".text-danger").remove();
			}
		} else if (dateFrom >= dateTo) {
			$("#endDate").closest('.form-group').addClass('has-error');
			$("#endDate").after('<p class="text-danger">Oops! End Date must be greater than start date!</p>');
		} else {
			$(".form-group").removeClass('has-error');
			$(".text-danger").remove();

			var form = $(this);

			$.ajax({
				url: form.attr('action'),
				type: form.attr('method'),
				data: form.serialize(),
				dataType: 'json',
				success: function (response) {
					$('#reportTable').html('');
					if (response.success) {
						let reportData = response.reportData;
						if (reportData.length > 0) {
							let totalAmount = 0;
							let totalPaidAmount = 0;
							let tableTemplate = `
							<div class="div-action pull pull-right" style="padding-bottom:20px;" id="noPrint">
								<button class="btn btn-default" onclick="javascript:downloadReport('${response.startDate} to ${response.endDate} Report File')"> <i class="glyphicon glyphicon-download-alt"></i> Download Report </button>
							</div>

							<h4>Report between: ${response.startDate} to ${response.endDate} </h4>
							<hr>
							<table border="1" cellspacing="0" cellpadding="0" style="width:100%;">
							<thead>
								<tr>
									<th><center>Order Date</center></th>
									<th><center>Client Name</center></th>
									<th><center>Contact</center></th>
									<th><center>Grand Total</center></th>
									<th><center>Total Paid Amount</center></th>
								</tr>
							</thead>
							<tbody>
							`;

							for (let reportDatum of reportData) {
								tableTemplate += `<tr>
											<td><center> ${reportDatum['order_date']} </center></td>
											<td><center>${reportDatum['client_name']}</center></td>
											<td><center>${reportDatum['client_contact']}</center></td>
											<td><center>${reportDatum['grand_total']}</center></td>
											<td><center>${reportDatum['paid']}</center></td>
										</tr>`;
								totalAmount += parseFloat(reportDatum['grand_total']);
								totalPaidAmount += parseFloat(reportDatum['paid']);
							}

							tableTemplate += `
											<tr>
												<td colspan="4"><center>Total Sales Amount</center></td>
												<td><center>${totalAmount.toFixed(4)}</center></td>
											</tr>
											<tr>
												<td colspan="4"><center>Total Amount Received</center></td>
												<td><center>${totalPaidAmount.toFixed(4)}</center></td>
											</tr>
											</tbody>
											</table>
											`;

							// append the table in view
							$('#reportTable').html(tableTemplate);

						} else {
							//Display a message saying there are no data between selected dates!
							$('#reportTable').html('');
							$('#reportTable').html(`<p><center>There are no data between the selected dates !</center></p>`);
						}
					} else {
						alert('Problem in generating report!');
					}
				},
				error: function (error) {
					alert('Unable to generate report!');
				}
			}); // /ajax

		} // /else

		return false;
	});

});


function downloadReport(pdfName) {
	var mywindow = window.open('_blank', 'Stock Management System', 'height=400,width=600');
	mywindow.document.write('<html><head><title>Order Report Slip</title>');
	mywindow.document.write(`<style type="text/css" media="print">
	#noPrint { display: none !important; }
 	</style></head><body>`);
	mywindow.document.write($('#reportTable').html());
	mywindow.document.write('</body></html>');

	mywindow.document.close(); // necessary for IE >= 10
	mywindow.focus(); // necessary for IE >= 10

	mywindow.print();
	mywindow.close();
}