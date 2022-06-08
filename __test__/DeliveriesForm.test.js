import { render } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

// jest.mock("../components/DeliveryForm", () => "DeliveryForm");

test('test new delivery form', async () => {

    const { getByText, getByTestId } = render(<DeliveryForm />);

    // debug("DeliveryForm component");

    const header = await getByText('Ny inleverans');
    const productsField = await getByTestId("products-field");
    const amountField = await getByTestId("amount-field");
    const commentField = await getByTestId("comment-field");
    const datePickerField = await getByTestId("date-picker-field");


    expect(header).toBeDefined();
    expect(productsField).toBeDefined();
    expect(amountField).toBeDefined();
    expect(commentField).toBeDefined();
    expect(datePickerField).toBeDefined();
});