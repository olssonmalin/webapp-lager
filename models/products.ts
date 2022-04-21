import config from "../config/config.json";


const products = {

    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;

    },

    updateProduct: async function updateProduct(productInfo) {
        productInfo.api_key = config.api_key;

        fetch(`${config.base_url}/products`, {
            body: JSON.stringify(productInfo),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
            .then(function (response) {

            });
    },
};

export default products;