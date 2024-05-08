import { orderHistory } from "../../app.js";
import i18n from "../../services/i18n.js";

//takes a number and adds commas to it every 3 digits
//VERY BAD i18n
/*
let formatCurrencyWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}*/


//My Attempt
let formatCurrency = (x) => {
    return new i18n.formatCurrency('fr-FR', { style: 'currency', currency: 'EUR'}).format(x);
}

/*let formatCurrency= (x) => {
    console.log(
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
          number)
        ),
}*/


let OrderHistory = {

    render: async () => {

        //strings to hold all the text (to be used within the HTML template literal)
        let historyTitle = i18n.getString("OrderHistory", "historyTitle");
        let dateHeading = i18n.getString("OrderHistory", "dateHeading");
        let numberHeading = i18n.getString("OrderHistory", "numberHeading");
        let totalHeading = i18n.getString("OrderHistory", "totalHeading");
        let statusHeading = i18n.getString("OrderHistory", "statusHeading");

        //view is solely for HTML markup, contains no static text
        let view = `
        <section class="orderHistory">
            <h1>${historyTitle}</h1>
            <div class="headings">
                <h3>${dateHeading}</h3>
                <h3>${numberHeading}</h3>
                <h3>${totalHeading}</h3>
                <h3>${statusHeading}</h3>
            </div>`;

        // Need to update this to match the changes made to getOrderDate in Order.js
        /* orderHistory.forEach((order, key) => {
            view += `
                <article class="orderItem">
                    <h3>${order.getOrderDate()}</h3>
                    <h3>${order.orderNumber}</h3>
                    <div class="gridPrice">
                        $
                        ${formatCurrencyWithCommas(order.total)}
                    </div>
                    <h3>${order.getOrderStatus()}</h3>
                </article>` */

        // Updated version. Thank you Aaron Long.
        orderHistory.forEach((order, key) => {
            view += `
                <article class="orderItem">
                    <h3>${order.getOrderDate()}</h3>
                    <h3>${order.orderNumber}</h3>
                    <div class="gridPrice">
                        ${i18n.formatCurrency(order.total, "b")}
                    </div>
                    <h3>${order.getOrderStatus()}</h3>
                </article>`
        });
        view += `
        </section>`;

        return view;
    }
    , after_render: async () => {

    }
}

export default OrderHistory;