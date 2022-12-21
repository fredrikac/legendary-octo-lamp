import { render, screen } from '@testing-library/react';
import App from './App';

//För att testa routing behöver man bygga upp en egen routing-tabell som innehåller sökvägen jag är på och någon typ av id
//man kan använda sig av each för att skapa en dynamisk tabell. Tabellen ska vara inom backticks och kolumner avdelas med |. Testet körs sedan för varje rad i tabellen
//component test id sätts mha data-testid på elementet
describe('Routing', () => {
  const setup = () => render(<App />);
  test.each`
  path  | componentTestId
  ${'/'} | ${'vehicle-list-component'}
  ${'/users'} | ${'user-list-component'}
  ${'/add-user'} | ${'add-user-component'}
  `
  ('display $componentTestId when path is $path', ({ path, componentTestId }) => {
    //Arrange - där vi testar att pusha in i webbläsarens historik
    window.history.pushState({}, '', path)
    setup();
    //query returnerar null om inget finns
    
    const elem = screen.queryByTestId(componentTestId);
   
    //Assert
    expect(elem).toBeInTheDocument();
  });

  //här negerar vi testet och kollar så att inte userlist visas på / och vice versa
  test.each`
  path  | componentTestId
  ${'/'} | ${'user-list-component'}
  ${'/users'} | ${'vehicle-list-component'}
  ${'/add-user'} | ${'vehicle-list-component'}
  ${'/add-user'} | ${'user-list-component'}
  `
  ('does not display $componentTestId when path is $path', ({ path, componentTestId }) => {
    //Arrange - där vi testar att pusha in i webbläsarens historik
    window.history.pushState({}, '', path)
    setup();
    //query returnerar null om inget finns
    
    const elem = screen.queryByTestId(componentTestId);
   
    //Assert
    expect(elem).not.toBeInTheDocument();
  });





});

