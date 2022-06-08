import { render } from '@testing-library/react-native';
import Stock from '../components/Stock';

jest.mock("../components/StockList", () => "StockList");

test('header should exist containing text Lagerförteckning', async () => {

    // await act( async () => render(<TestApp/>));
    const { getByText } = render(<Stock />);
    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});
