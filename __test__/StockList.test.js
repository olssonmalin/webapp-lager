import { render } from '@testing-library/react-native';
import StockList from '../components/StockList';
import { DataTable } from 'react-native-paper';

jest.useFakeTimers();

// jest.mock("../components/StockList", () => "StockList");

const products = [
    { name: "Shampoo", stock: 2 },
    { name: "Balsam", stock: 3 },
    { name: "Tvål", stock: 15 },
];

const setProducts = () => false;

test('List should contain three items', async () => {

    const { getByText, debug } = render(<StockList products={products} setProducts={setProducts} />);

    // debug("Stocklist component");

    const shampoo = await getByText('Shampoo', { exact: false });
    const balsam = await getByText('Balsam', { exact: false });
    const soap = await getByText('Tvål', { exact: false });

    expect(shampoo).toBeDefined();
    expect(balsam).toBeDefined();
    expect(soap).toBeDefined();
});
