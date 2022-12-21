import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RegisterUser from './RegisterUser';

//övergripande suite
describe('RegisterUser component', ()=> {
  const setup = () => render(<RegisterUser />)
  //nästlad suite som fokuserar på användarsidan. Det går alltså att skapa hierarki och nästla i olika nivåer.   
  describe('Register User page', () => {
      test.skip('has a titleText saying Register User', ()=> {
        //Arrange
        setup();
        const titleText = screen.getByRole('heading', { name: 'Användar-registrering'});
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
      
      test.skip('Register button should be enabled when password and confirm password are the same', ()=> {
          //Arrange...
          setup();
          //Tre element precis som förut
          const passwordInput = screen.getByLabelText('Password');
          const confirmPassword = screen.getByLabelText('Confirm password');
          const registerBtn = screen.getByRole('button', { name: 'Register User'});
          
          //Act... Här blir det nytt - vi ska kunna interagera med textrutorna mha userEvent
          //Här skrivs passwordet in av testkoden!
          userEvent.type(passwordInput, 'Pa$$w0rd');
          userEvent.type(confirmPassword, 'Pa$$w0rd');

          //Assert...
          //När fälten är ifyllda ska knappen enablas.
          expect(registerBtn).toBeEnabled();
      });
    });
});