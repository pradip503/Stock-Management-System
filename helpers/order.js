module.exports = {

    formatProductOptions: function (currentProductId, products) {
        var finalOptions = '';
        products.forEach(product => {

            if (product.product_id == currentProductId) {
                finalOptions += `<option selected value="${product.product_id}" id="changeProduct${product.product_id}"> ${product.product_name} </option>`
            } else {
                finalOptions += `<option value="${product.product_id}" id="changeProduct${product.product_id}"> ${product.product_name} </option>`;
            }

        });

        return finalOptions;
    },

    increment: function (value) {
        return value + 1;
    },

    formatPaymentStatus: function (payment_status) {

        let paymentOptions= [{'full_payment':1}, {'advance_payment':2}, {'no_payment':3}];
        let finalOptions = ``;

        paymentOptions.forEach(paymentOption => {
            if(payment_status == paymentOption.full_payment) {
                finalOptions += `<option value='${paymentOption.full_payment}' selected> Full Payment </option>`;
            } else {
                finalOptions += `<option value='${paymentOption.full_payment}'> Full Payment </option>`;
            }

            if(payment_status == paymentOption.advance_payment) {
                finalOptions += `<option value='${paymentOption.advance_payment}' selected> Advance Payment </option>`;
            } else {
                finalOptions += `<option value='${paymentOption.advance_payment}'> Advance Payment </option>`;
            }

            if(payment_status == paymentOption.no_payment) {
                finalOptions += `<option value='${paymentOption.no_payment}' selected> No Payment </option>`;
            } else {
                finalOptions += `<option value='${paymentOption.no_payment}'> No Payment </option>`;
            }
        });

        return finalOptions;
    }

}