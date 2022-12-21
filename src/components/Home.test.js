import { fireEvent, render, screen, logRoles } from '@testing-library/react';
import Home from './Home';

describe('Home component', ()=>{

  //När man vet att nåt funkar så kan man skriva xit för att skippa det. Då sparar man processorkraft.
  xit('button log in should be in the document', () => {
    //Arrange
    const { container } = render(<Home />);
    //för att använda logRoles så behöver man spara container-elementet från render i ett objekt, och sedan köra logRoles på det. Spara, och sedan kommer det loggas ut i terminalen.
    logRoles(container)

    //Act - söker efter en button med namnet Logga in
    const btn = screen.getByRole('button', {name: 'Logga in'});

    //Assert
    expect(btn).toBeInTheDocument();

  })

  test('button should initially be green', ()=> {
    //Arrange
    render(<Home />);

    //Act
    const btn = screen.getByRole('button', {name: 'Logga in'});

    //Assert - här använder vi toHaveStyle och kollar på inline styling. Nästa gång går vi igenom klasser
    expect(btn).toHaveStyle({backgroundColor: 'green'});
  })

  test('when clicked button should change text to Log out', () => {
    //Arrange
    render(<Home />);
    const btn = screen.getByRole('button', {name: 'Logga in'});
    //Act - här vill vi simulera ett klick-event
    fireEvent.click(btn);

    //Assert
    expect(btn).toHaveTextContent('Logga ut');
  });

  test('when clicked, button should turn red', () => {
    //Arrange
    render(<Home/>);
    const btn = screen.getByRole('button', {name: 'Logga in'});
    //Act
    fireEvent.click(btn);
    //Assert förväntan
    expect(btn).toHaveStyle({backgroundColor: 'red'});
  })
});