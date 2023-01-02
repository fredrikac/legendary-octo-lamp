import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import RegisterUser from './RegisterUser';

//övergripande suite
describe('RegisterUser component', ()=> {
  const setup = () => render(<RegisterUser />)
  //nästlad suite som fokuserar på användarsidan. Det går alltså att skapa hierarki och nästla i olika nivåer.   
  describe('Register User page', () => {
      test('has a titleText saying Register User', ()=> {
        //Arrange
        setup();
        const titleText = screen.getByRole('heading', { name: 'Register New User'});
        //Act..


        //Assert
        expect(titleText).toBeInTheDocument();
      });


      test.skip('has username input', ()=> {
        setup();

        const userInput = screen.getByLabelText('User name');
        expect(userInput).toBeInTheDocument();
      });

      test.skip('has email input', ()=> {
        setup();
        const emailInput = screen.getByLabelText('Email');
        expect(emailInput).toBeInTheDocument();
      });

      test.skip('has password input', ()=> {
        setup();
        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput).toBeInTheDocument();
      });

      test.skip('has a confirm password input', ()=> {
        setup();
        const confirmPassword = screen.getByLabelText('Confirm password');
        expect(confirmPassword).toBeInTheDocument();
        expect(confirmPassword.type).toBe('password');
      });

      test.skip('should have a register button', ()=> {
        setup();
        const registerBtn = screen.getByRole('button', { name: /Register User/i,});
        expect(registerBtn).toBeInTheDocument();
      });

      test.skip('Register button should be disabled initially', ()=> {
        setup();
        const registerBtn = screen.getByRole('button', {name: /Register User/i});
        expect(registerBtn).toBeDisabled();
      });
    });

    //En till describe för att testa interaktioner med formuläret
    describe('Form interaction', ()=> {
      
      test('Register button should be enabled when password and confirm password are the same', async ()=> {
          //Arrange...
          setup();
          //Tre element precis som förut
          const passwordInput = screen.getByLabelText('Password');
          const confirmPassword = screen.getByLabelText('Confirm password');
          const registerBtn = screen.getByRole('button', { name: 'Register User'});
          
          //Act... Här blir det nytt - vi ska kunna interagera med textrutorna mha userEvent
          //Här skrivs passwordet in av testkoden!
          await userEvent.type(passwordInput, 'Pa$$w0rd');
          await userEvent.type(confirmPassword, 'Pa$$w0rd');

          //Assert...
          //När fälten är ifyllda ska knappen enablas.
          expect(registerBtn).toBeEnabled();
      });

      //I det här testet behöver vi paketet msw! Se anteckningar.
      test('saves the user when "Register user" is clicked', async () => {
        //Configure MSW server & create endpoint for hijacking post request...
        let requestBody;
        const server = setupServer(
          rest.post('http://localhost:3010/users', (req, res, context) => {
            req.json().then((data) => (requestBody = data));
            return res(context.status(201));
          })
        );
        //Starta upp och lyssna på servern, precis som när vi pysslade med node
        server.listen();

        //Arrange...
        setup();
        const userNameInput = screen.getByLabelText('User name');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const confirmPassword = screen.getByLabelText('Confirm password');
        const registerBtn = screen.getByRole('button', { name: 'Register User'});

        //Act
        await userEvent.type(userNameInput, 'AndreasGren');
        await userEvent.type(emailInput, 'andreas@gmail.com');
        await userEvent.type(passwordInput, 'Pa$$word');
        await userEvent.type(confirmPassword, 'Pa$$word');

        await userEvent.click(registerBtn);

        //Ibland körs testet för snabbt för att hinna se att det fått ett paket. då kan man skapa en fördröjning på detta vis: 
        await new Promise((resolve) => setTimeout(resolve, 1000));

        //Assert
        expect(requestBody).toEqual({
          userName: 'AndreasGren',
          email: 'andreas@gmail.com',
        })
      });
    });
});