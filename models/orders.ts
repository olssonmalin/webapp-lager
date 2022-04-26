import config from "../config/config.json";
import Order from "../interfaces/order";


const orders = {

    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern
        for (let item in order.order_items) {
            item = order.order_items[item];
            var product = {
                id: item.product_id,
                name: item.name,
                stock: item.stock - item.amount,
                api_key: config.api_key
            };

            fetch(`${config.base_url}/products`, {
                body: JSON.stringify(product),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            })
                .then(function (response) {

                });
        }

        await this.changeStatus(order, 200)
        // var orderPick = {
        //     id: order.id,
        //     name: order.name,
        //     status_id: 200,
        //     api_key: config.api_key
        // };

        // console.log(orderPick);

        // fetch(`${config.base_url}/orders`, {
        //     body: JSON.stringify(orderPick),
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     method: 'PUT'
        // })
        //     .then(function (response) {

        //     });

        // TODO: Ändra status för ordern till packad
    },

    changeStatus: async function changeStatus(order: Partial<Order>, status = 100) {
        var orderInfo = {
            id: order.id,
            name: order.name,
            status_id: status,
            api_key: config.api_key
        };

        console.log(orderInfo);

        fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(orderInfo),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
            .then(function (response) {

            });

    }
};

export default orders;