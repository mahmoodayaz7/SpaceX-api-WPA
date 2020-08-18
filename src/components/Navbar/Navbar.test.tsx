import React from 'react';
import { render,cleanup,  fireEvent,act  } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter as Router, useLocation} from 'react-router-dom';

afterEach(cleanup);






test('Navbar rendering test', () => {

  
  
    const renderObj = render(<Router > <Navbar  ></Navbar> </Router>);

    const root =  renderObj.getByTestId("navbar"); 
    const images =  renderObj.getAllByRole("img");
    const rockets =  renderObj.getByText(/Rockets/i);
    const ships =  renderObj.getByText(/Ships/i);
    const missions =  renderObj.getByText(/Missions/i);
    

  

  
     expect(images[0]).toHaveAttribute('src', 'icon.jpeg')
     
     expect(images[1]).toHaveAttribute('src', 'toggle.png')

     expect(root).toBeInTheDocument()
     expect(rockets).toBeInTheDocument()
     expect(ships).toBeInTheDocument()
     expect(missions).toBeInTheDocument()
      

       
    act(() => {
        fireEvent.click(rockets);
        
      })
      
    
      expect(location.pathname).toBe("/rockets");
  
     
      act(() => {
        fireEvent.click(ships);
        
      })
      
    
      expect(location.pathname).toBe("/ships");
  
      
      act(() => {
        fireEvent.click(missions);
        
      })
      
    
      expect(location.pathname).toBe("/missions");
  
     
      act(() => {
        fireEvent.click(images[0]);
        
      })
      
    
      expect(location.pathname).toBe("/");
  
      


  });
  
