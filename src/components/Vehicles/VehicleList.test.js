import { render, screen } from '@testing-library/react';

import VehicleList from './VehicleList.jsx';

describe('VehicleList component', () => {
  const setup = ()=> render(<VehicleList />)

  describe('Should have a page layout', () => {

    test.skip('with a page title', () => {
      setup();
      //detta fungerar för det finns bara 1 h1a.
      const title = screen.getByRole('heading');
      expect(title).toBeInTheDocument();
    });

    test.skip('with a title of "Vehicles in storage"', () => {
        setup();
        //här vill vi kika på att det finns en heading och att den har rätt text
        const title = screen.getByRole('heading');
        expect(title).toHaveTextContent(/Vehicles in storage/i);
    });
  });


  describe('VehicleList API request', () => {
    test('Renders a list of vehicles if request is successful', async ()=> {
      //Arrange
      setup();
      //Här vill vi använda en mock-funktion för att ta över kontrollen över fetch-anropet.
      //Detta åsidosätter hur useeffect använder fetch. 
      window.fetch = jest.fn();
      //här imiterar vi json-responsen med lite data vi snott från db.json-filen. 
      window.fetch.mockResolvedValueOnce({
        json: async() => [{
          "vehicleId": 1859,
          "registrationNumber": "AL73738",
          "vinNumber": "TMBAG9NE6E0061014",
          "manufacturer": "SKODA",
          "model": "OCTAVIA",
          "vehicleName": "SKODA OCTAVIA 1.6 TDI 105 HK Hatchback",
        }]
      });

      //Eftersom fetch är asynkront behöver vi använda find samt async-await
      const vehicles = await screen.findAllByRole('listitem');
      //Act
      
      //Assert - förväntar mig att listan är längre än 0
      expect(vehicles).not.toHaveLength(0);
    });
  })
});