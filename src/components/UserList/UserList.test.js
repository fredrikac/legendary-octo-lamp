import { render, screen } from '@testing-library/react';
import UserList from './UserList';

describe('UserList component', () => {
  const setup = ()=> render(<UserList />)

  test('Should have page title', ()=> {
    setup();
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
  });

  describe('Users API request', ()=> {
    test('Renders a list of users if request is successful', async ()=> {
      setup();

      window.fetch = jest.fn();
      window.fetch.mockResolvedValueOnce({
        json: async() => [{
            "firstName": "Fredrika",
            "lastName": "Carlsén",
            "userEmail": "fredrika.carlsen@gmail.com"
            }, {
            "firstName": "Niklas",
            "lastName": "Gren",
            "userEmail": "nisse@gmail.com"
          }, {
            "firstName": "Linnea",
            "lastName": "Bäcklund",
            "userEmail": "nea@gmail.com"
        }]
      });
      
      const users = await screen.findAllByRole('listitem');
      expect(users).not.toHaveLength(0);
    })
  })
})