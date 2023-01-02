import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserLogin from './UserLogin';

describe('UserLogin component', ()=> {
  const setup = () => render(<UserLogin />);

  test('should have Login heading', ()=> {
    render(<UserLogin />)
    const heading = screen.getByRole('heading', {name: /Login/i});
    expect(heading).toBeInTheDocument();
  });

  test('there should be an input for username/email', ()=> {
    render(<UserLogin />);
    const usernameInput = screen.getByLabelText('Username/Email');
    expect(usernameInput).toBeInTheDocument();
  });

  test('there should be a password input of type password', ()=> {
    render(<UserLogin />);
    const password = screen.getByLabelText('Password');
    expect(password).toBeInTheDocument();
    expect(password.type).toBe('password');
  });

  test('there should be a login button that is initially disabled', () => {
    render(<UserLogin />);
    const loginBtn = screen.getByRole('button', { name: /Login/i});
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
  });


  describe('Form interaction', ()=> {
    test('Login button should be enabled when username and password are correct', async ()=> {
      setup();
      const usernameInput = screen.getByLabelText('Username/Email');
      const passwordInput = screen.getByLabelText('Password');
      const loginBtn = screen.getByRole('button', { name: 'Login'});

      await userEvent.type(usernameInput, 'Testuser');
      await userEvent.type(passwordInput, 'Pa$$w0rd');

      expect(loginBtn).toBeEnabled();
    })

    //man kan göra ett likadant test för att se till att knappen är disablad när fälten inte är ifyllda 


  });
});