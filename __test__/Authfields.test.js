import { render } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';
jest.useFakeTimers();

const auth = {};
const setAuth = (newAuth) => {
    auth = newAuth;
};
const mockSubmit = jest.fn();
const navigation = () => false;

test('header should exist containing text Lagerförteckning', async () => {

    // await act( async () => render(<TestApp/>));
    const title = "Logga in";   
    const { getByText, getAllByText } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        title={title}
        submit={mockSubmit}
        navigation={navigation}
        />);
    const logInElements = await getAllByText(title);
    const emailField = await getByText("E-post");
    const passwordField = await getByText("Lösenord");

    expect(logInElements.length).toBe(2);
    expect(emailField).toBeDefined();
    expect(passwordField).toBeDefined();
});