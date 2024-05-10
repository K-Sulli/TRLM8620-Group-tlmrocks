import {featuredProducts} from "../../app.js";
import i18n from "../../services/i18n.js";

let Home = {
    render : async () => {
        // Fetch locale-sensitive strings via i18n method
        let welcomeTitle = i18n.getString("Home", "welcomeTitle"); // Fetching the externalized welcome title
        let welcomeSubtitle = i18n.getString("Home", "welcomeSubtitle"); // Fetching the externalized subtitle

        // View is solely for HTML markup, contains no static text
        let view = `
                    <section class="welcome">
                        <h1 class="center">${welcomeTitle}</h1>  <!-- Using the externalized title -->
                        <h3 class="center">${welcomeSubtitle}</h3> <!-- Using the externalized subtitle -->
                    </section>
                    <div class="browseGrid homeGrid">`;

        // Create a box to display each of the 4 featured products
        featuredProducts.forEach((product, key) => {
            // String to give image an alt tag for accessibility
            let imageAlt = i18n.getString("Home", "symbolAlt"); // Fetching alt text for images

            view += `
                    <article id="${product.productID}" class="${product.type}">
                        <img src="${product.imageURL}" class="gridImage" alt="${imageAlt}">
                        <div class="gridDes">
                            <h3>${product.title}</h3>
                            <div class="gridPrice">
                                ${i18n.formatCurrency(product.price, "b")}
                            </div>
                        </div>
                    </article>`;
        });
            
        view += "</div>";

        // Return generated markup
        return view;
    },
    after_render: async () => {
        let articles = document.querySelectorAll("article");

        // Click listener to redirect on product click
        for(let curProduct of articles) {
            curProduct.addEventListener("click", function() {
                location.href=`./#/${curProduct.classList[0]}s/` + curProduct.id;
            }, false);
            curProduct.classList.add("zoom");
        }
    }
}

export default Home;
