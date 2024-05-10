import { locale, updateLocale } from '../app.js';

var stringsJSON = {};

const i18n = {

    // Load resource JSON based on locale
    loadStringsJSON: async (newLocale) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(`Loading strings for locale: ${newLocale}`);
        try {
            const response = await fetch(`./content/${newLocale}/strings.json`, options);
            stringsJSON = await response.json();
            console.log('Strings loaded:', stringsJSON);
        } catch (err) {
            console.log('Error getting strings', err);
            if (newLocale != "en-US") {
                console.log(`Falling back to default locale 'en-US' due to error.`);
                updateLocale("en-US");
            }
        }
    },

    // Retrieve a localized string from loaded JSON
    getString: (view, key) => {
        if (stringsJSON[view] && stringsJSON[view][key]) {
            console.log(`Retrieved string [${view}:${key}]:`, stringsJSON[view][key]);
            return stringsJSON[view][key];
        } else {
            console.log(`String not found for [${view}:${key}], returning default 'Not available'.`);
            return 'Not available'; // Default fallback string if not found
        }
    },

    // Determine the proper currency format based on locale and return HTML string
    formatCurrency: (price, color) => {
        let converted = convertCurrency(price);
        let formatted = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyMap[locale] }).format(converted);
        console.log(`Formatted currency for locale ${locale}: ${formatted}`);
        return `<h4 style="color:${color};">${formatted}</h4>`;
    },

    // Return the locale-based link to HTML file within the 'static' folder
    getHTML: () => {
        let path = `${locale}/terms.html`;
        console.log(`Generated locale-based link: ${path}`);
        return path;
    },

    // Format date according to locale
    formatDate: (date) => {
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        let formattedDate = new Intl.DateTimeFormat([locale, 'en-US'], options).format(date);
        console.log(`Formatted date for locale ${locale}: ${formattedDate}`);
        return formattedDate;
    }
};

// Used to determine the correct currency symbol
var currencyMap = {
    'en-US': 'USD',
    'fr-FR': 'EUR',
};

// Function to perform rough conversion from galactic credits to real currencies
var convertCurrency = (price) => {
    let conversionRate = (locale === 'en-US' ? 1 : (locale === 'fr-FR' ? 0.92 : 1));
    let converted = price * conversionRate;
    console.log(`Converted ${price} to ${converted} using rate ${conversionRate} for locale ${locale}`);
    return converted;
}

export default i18n;
