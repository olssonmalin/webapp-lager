import config from "../config/config.json";


const products = {

    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;

        // const result = fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        //     .then(function (response) {
        //         return response.json();
        //     }).then(function (data) {

        //     });

        // return result;
    },
};

export default products;