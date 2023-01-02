import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

//från lektion 4:
describe("Routing", () => {
  const setup = () => render(<App />)
  //Den vill att man helst använder en variabel istället för att direkt checka userEvent. ESlint vill inte att man döper den till user, så jag döpte den till view.
  const view = userEvent.setup();

  test('navigating and rendering correct component', async () => {
    //Arrange
    setup();

    //Test if we're on start page...
    expect(screen.getByText('Vehicles in storage')).toBeInTheDocument();

    //Test if we click on Users in navbar...
    await view.click(screen.getByText('Users'));
    expect(screen.getByText('Users')).toBeInTheDocument();

    //Test if we can navigate to Add User in navbar...
    await view.click(screen.getByText('Add User'));
    expect(screen.getByText('Register New User')).toBeInTheDocument();

    //Test if we can navigate to Vehicles in navbar...
    await view.click(screen.getByText('Vehicles'));
    expect(screen.getByText('Vehicles in storage')).toBeInTheDocument();
  });
});


//För att testa routing behöver man bygga upp en egen routing-tabell som innehåller sökvägen jag är på och någon typ av id
//man kan använda sig av each för att skapa en dynamisk tabell. Tabellen ska vara inom backticks och kolumner avdelas med |. Testet körs sedan för varje rad i tabellen
//component test id sätts mha data-testid på elementet
//Detta är inte superlättläst, men det fungerar oavsett vilken version av react-router-dom.

//Första versionen
// describe('Routing', () => {
//   const setup = () => render(<App />);
//   test.each`
//   path  | componentTestId
//   ${'/'} | ${'vehicle-list-component'}
//   ${'/users'} | ${'user-list-component'}
//   ${'/add-user'} | ${'add-user-component'}
//   `
//   ('display $componentTestId when path is $path', ({ path, componentTestId }) => {
//     //Arrange - där vi testar att pusha in i webbläsarens historik
//     window.history.pushState({}, '', path)
//     setup();
//     //query returnerar null om inget finns
    
//     const elem = screen.queryByTestId(componentTestId);
   
//     //Assert
//     expect(elem).toBeInTheDocument();
//   });

//   //här negerar vi testet och kollar så att inte userlist visas på / och vice versa
//   test.each`
//   path  | componentTestId
//   ${'/'} | ${'user-list-component'}
//   ${'/users'} | ${'vehicle-list-component'}
//   ${'/add-user'} | ${'vehicle-list-component'}
//   ${'/add-user'} | ${'user-list-component'}
//   `
//   ('does not display $componentTestId when path is $path', ({ path, componentTestId }) => {
//     //Arrange - där vi testar att pusha in i webbläsarens historik
//     window.history.pushState({}, '', path)
//     setup();
//     //query returnerar null om inget finns
    
//     const elem = screen.queryByTestId(componentTestId);
   
//     //Assert
//     expect(elem).not.toBeInTheDocument();
//   });
// });

