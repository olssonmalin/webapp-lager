interface Invoice {
    order_id: number,
    total_price: number,
    api_key: string,
    creation_date: string,
    due_date: string,
}

export default Invoice;