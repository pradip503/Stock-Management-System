$(function () {

    //ajax to fetch total orders
    $.ajax({
        url: 'api/getTotalOrders',
        type: 'get',
        dataType: 'json',
        success:function(response) {
            if(response.success){
                $('#totalOrders span').text(response.orderCount ? response.orderCount.totalOrders : 0);
            } else {
                alert('Unable to fetch total orders!');
            }
        },
        error: function(error) {
            alert('Unable to fetch total orders!');
        }
    });    
    

    //ajax to fetch total products
    $.ajax({
        url: 'api/getTotalProducts',
        type: 'get',
        dataType: 'json',
        success:function(response) {
            if(response.success){
                $('#totalProducts span').text(response.productCount ? response.productCount.totalProducts : 0);
            } else {
                alert('Unable to fetch total products!');
            }
        },
        error: function(error) {
            alert('Unable to fetch total products!');
        }
    });  


    //ajax to fetch low stocks
    $.ajax({
        url: 'api/getLowStock',
        type: 'get',
        dataType: 'json',
        success:function(response) {
            if(response.success){
                $('#lowStocks span').text(response.lowStockCount);
            } else {
                alert('Unable to fetch low stocks!');
            }
        },
        error: function(error) {
            alert('Unable to fetch low stocks!');
        }
    });  

    // fetch today's total units sold
    $.ajax({
        url: 'api/getTotalUnitsSold',
        type: 'get',
        dataType: 'json',
        success:function(response) {
            if(response.success){
                $('#totalUnitsSold h1').text(response.totalUnitsSold);
            } else {
                alert('Unable to fetch total units sold!');
            }
        },
        error: function(error) {
            alert('Unable to fetch total units sold!');
        }
    }); 
    
    // fetch today's revenue
    $.ajax({
        url: 'api/getTotalRevenue',
        type: 'get',
        dataType: 'json',
        success:function(response) {

            if(response.success){
                $('#totalRevenue h1').text(response.totalRevenue);
            } else {
                alert('Unable to fetch total revenue!');
            }
        },
        error: function(error) {
            alert('Unable to fetch total revenue!');
        }
    }); 


    // fetch today's money received by cash or any other way
    $.ajax({
        url: 'api/getTotalCashReceived',
        type: 'get',
        dataType: 'json',
        success:function(response) {
            if(response.success){
                $('#totalReceived h1').text(response.totalReceivedAmount);
            } else {
                alert('Unable to fetch total amount received!');
            }
        },
        error: function(error) {
            alert('Unable to fetch total amount received!');
        }
    }); 

});