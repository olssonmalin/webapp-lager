import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';
jest.useFakeTimers();


// jest.mock("../components/DeliveriesList", () => "DeliveriesList");

const setProducts = () => false;
const setDeliveries = () => false;
const navigation = () => false;
const route = () => false;

const deliveries = [
    {   
        product_id: 1,
        amount: 3,
        delivery_date: '11-03-2006',
        comment: "test"
    }
];
test('Test delivery list', async () => {

    // await act( async () => render(<TestApp/>));

    const { getByText } = render(<DeliveriesList 
        route={route} 
        navigation={navigation} 
        setProducts={setProducts} 
        setDeliveries={setDeliveries} 
        deliveries={deliveries}
        />);

    // debug("DeliveriesList component");

    const header = await getByText('Inleveranser');
    const amount = await getByText('Antal: 3');
    const comment = await getByText('Kommentar: test');

    expect(header).toBeDefined();
    expect(amount).toBeDefined();
    expect(comment).toBeDefined();
});