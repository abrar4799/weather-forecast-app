import { render, screen } from '@testing-library/react';
import App from './App';
import Header from './Components/Header';

//test('renders learn react link', () => {
//  render(<App />);
//  const linkElement = screen.getByText(/learn react/i);
//  expect(linkElement).toBeInTheDocument();
//});

describe( 'components' , () => {
  test( 'render "The Only Weather Forecast You Need" on home page ', () => { 
    //Arrange
    render(<App />)
    
    //Assert
    const welcomeElement = screen.getByText('The Only Weather Forecast You Need' ,  { exact: false });
    expect(welcomeElement).toBeInTheDocument();

   });

   test( 'render "Country" on home page ', () => { 
    //Arrange
    render(<App />)
    
    //Assert
    const welcomeElement = screen.getByText('--Select Country--' ,  { exact: false });
    expect(welcomeElement).toBeInTheDocument();

   });
   test( 'render "State" on home page ', () => { 
    //Arrange
    render(<App />)
    
    //Assert
    const welcomeElement = screen.getByText('--Select State--' ,  { exact: false });
    expect(welcomeElement).toBeInTheDocument();

   });

   test( 'render "City" on home page ', () => { 
    //Arrange
    render(<App />)
    
    //Assert
    const welcomeElement = screen.getByText('--Select City--' ,  { exact: false });
    expect(welcomeElement).toBeInTheDocument();

   });

   test( 'render "Get Button" on home page ' , () =>{
    render(<App />)
    const headerElement = screen.getByText('Get' , {exact: false})
  });

  test( 'render "Header Component" on home page ' , () =>{
    render(<Header />)
    const headerElement = screen.getByText('Weather' , {exact: false})
   });

  test('render weather if request succeds' , async () => {
    render (<App />)

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: '0' }],
    });

    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  }) 

   
 
  




})
