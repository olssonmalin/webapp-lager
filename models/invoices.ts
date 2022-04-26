import config from "../config/config.json";
import storage from "./storage";
import Invoice from "../interfaces/invoice";

const invoice = {

    getInvoices: async function getInvoices() {
        const token = await storage.readToken();
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token.token
            },
        })
        const result = await response.json();

        return result.data;

    },

    addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
        invoice.api_key = config.api_key;
        invoice.creation_date = invoice.creation_date ?? new Date().toLocaleDateString('se-SV');
        let due_date = new Date(invoice.creation_date);
        due_date.setMonth(due_date.getMonth() + 1);
        invoice.due_date = due_date.toLocaleDateString('se-SV');
        const token = await storage.readToken();
        console.log(invoice);

        fetch(`${config.base_url}/invoices`, {
            body: JSON.stringify(invoice),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token,
            },
            method: 'POST'
        })
            .then(function (response) {

            });
    }

};

export default invoice;