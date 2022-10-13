import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import Signup from './Signup';

const MockSignup = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
        </Provider>
    )
}

const changeData = (inputElement, value) => {
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, {target: {value}});
}

describe("sign up", () => {
    test('render sign up', () => {
      render(<MockSignup />);
      const textElement = screen.getByText(/sign up/i);
      expect(textElement).toBeInTheDocument();
    });

    test('render name input data', () => {
        render(<MockSignup />);
        const username = "test";
        const nameInput = screen.getByPlaceholderText(/name/i);
        changeData(nameInput, username);
        expect(nameInput).toHaveValue(username);
    });

    test('render email input data', () => {
        render(<MockSignup />);
        const email = "test@gamil.com";
        const emailInput = screen.getByPlaceholderText(/email address/i);
        changeData(emailInput, email);
        expect(emailInput).toHaveValue(email);
    });

})
