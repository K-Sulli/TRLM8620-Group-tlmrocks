import Utils from '../../services/Utils.js';
import i18n from '../../services/i18n.js';
import { locale, productList } from "../../app.js";

let type;

let Browse = {
    render: async () => {
        let request = Utils.parseRequestURL();
        type = request.resource;

        await i18n.loadStringsJSON(locale); // Ensure the latest locale strings are loaded

        let productMap = productList.get(type);
        let titleKey = type; // Assuming 'type' is 'droids' or 'vehicles'
        let title = i18n.getString('titles', titleKey) || i18n.getString('titles', 'default');

        let view = `<section class="browsePage">
                        <h1>${title}</h1>
                        <div class="browseGrid">`;

        productMap.forEach((product, key) => {
            view += `<article id="${key}">
                        <img src="${product.imageURL}" class="gridImage" alt="${product.title}">
                        <div class="gridDes">
                            <h3>${product.title}</h3>
                            <div class="gridPrice">
                                ${i18n.formatCurrency(product.price, "b")}
                            </div>
                        </div>
                    </article>`;
        });

        view += `</div></section>`;
        return view;
    },
    after_render: async () => {
        let grid = document.querySelector(".browseGrid");
        let articles = grid.querySelectorAll("article");

        for (let curProduct of articles) {
            curProduct.addEventListener("click", function () {
                location.href = `./#/${type}/` + curProduct.id;
            }, false);
            curProduct.classList.add("zoom");
        }
    }
}

export default Browse;
