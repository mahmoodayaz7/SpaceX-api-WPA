import React from 'react';
import { render,cleanup,  fireEvent,act  } from '@testing-library/react';
import HomeContainer from './index';
import { useInfoItemsQuery } from '../../generated/graphql';
import { InfoItemsQuery } from '../../generated/graphql';
import { BrowserRouter as Router, useLocation} from 'react-router-dom';



afterEach(cleanup);


jest.mock("../../generated/graphql");


const info: InfoItemsQuery = { info:
  {
    name: "SpaceX", founder: "Elon Musk", founded: 2002, employees: 7000, vehicles:3  ,launch_sites:3 ,test_sites: 1, ceo: "Elon Musk", cto:"Elon Musk",coo:"Gwynne Shotwell",valuation:27500000000, headquarters:{address: "Rocket Road", city:"Hawthorne", state:"California"}, summary: "summary"
  } 

  }
  
  const mockeduseInfoQuery = useInfoItemsQuery as jest.Mock;




  test('Testing Home page when there is no data locally stored', () => {

    mockeduseInfoQuery.mockReturnValue({
    loading: false,
    error: false,
    data: info
  })
  
  const savedData =JSON.stringify(info);
  
  //Storage.prototype.setItem = jest.fn((Rockets, savedData)=> null);
  Storage.prototype.getItem = jest.fn((Home) => null);
  
    const renderObj = render(<Router > <HomeContainer  ></HomeContainer> </Router>);

    const slider =  renderObj.getByTestId("slider");
    const images =  renderObj.getAllByRole("img");
      
      const history =  renderObj.getByText(/History/i);
      const hierarchy =  renderObj.getByText(/Hierarchy/i);
      const assets =  renderObj.getByText(/Assets/i);

      const historyText =  renderObj.getByText("SpaceX was founded by Elon Musk in 2002. The current valuation of the company is around $ 27500000000");
      const hierarchyText1 =  renderObj.getByText(/CEO: Elon Musk/i);
      const hierarchyText2 =  renderObj.getByText(/CTO: Elon Musk/i);
      const hierarchyText3 =  renderObj.getByText(/COO: Gwynne Shotwell/i);
      const hierarchyText4 =  renderObj.getByText(/Total Emplpoyees: 7000/i);
      const assetsText =  renderObj.getByText("SpaceX currently owns 3 vehicle(s), 3 launch site(s) and 1 test site(s)");
      const headquarter =  renderObj.getByText(/Headquarter:/i);
      const address =  renderObj.getByText(/Address: Rocket Road/i);
      const city =  renderObj.getByText(/City: Hawthorne/i);
      const state =  renderObj.getByText(/State: California/i);
      const summary = renderObj.getByText(/summary/i);
      
      
      const loading =  renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/error/i)
    
  

  
      expect(images[0]).toHaveAttribute('src', 'slider1.jpg')
      expect(images[1]).toHaveAttribute('src', 'slider2.jpg')
      expect(images[2]).toHaveAttribute('src', 'slider3.jpg')
      expect(slider).toBeInTheDocument()
      expect(history).toBeInTheDocument()
      expect(hierarchy).toBeInTheDocument()
      expect(assets).toBeInTheDocument()
      expect(historyText).toBeInTheDocument()
      expect(assetsText).toBeInTheDocument()
      expect(hierarchyText1).toBeInTheDocument()
      expect(hierarchyText2).toBeInTheDocument()
      expect(hierarchyText3).toBeInTheDocument()
      expect(hierarchyText4).toBeInTheDocument()
      expect(headquarter).toBeInTheDocument()
      expect(address).toBeInTheDocument()
      expect(city).toBeInTheDocument()
      expect(state).toBeInTheDocument()
      expect(summary).toBeInTheDocument()
      

      expect(loading).toBeNull();
      expect(error).toBeNull();
      
      


  });
  


  
  test('Testing Home page when data is locally stored', () => {

    mockeduseInfoQuery.mockReturnValue({
    loading: false,
    error: false,
    data: info
  })
  
 
const savedData =JSON.stringify(info);

Storage.prototype.setItem = jest.fn((Home, savedData)=> null);
Storage.prototype.getItem = jest.fn((Home) => savedData);
  
    const renderObj = render(<Router > <HomeContainer  ></HomeContainer> </Router>);

    const slider =  renderObj.getByTestId("slider");
    const images =  renderObj.getAllByRole("img");
      
      const history =  renderObj.getByText(/History/i);
      const hierarchy =  renderObj.getByText(/Hierarchy/i);
      const assets =  renderObj.getByText(/Assets/i);

      const historyText =  renderObj.getByText("SpaceX was founded by Elon Musk in 2002. The current valuation of the company is around $ 27500000000");
      const hierarchyText1 =  renderObj.getByText(/CEO: Elon Musk/i);
      const hierarchyText2 =  renderObj.getByText(/CTO: Elon Musk/i);
      const hierarchyText3 =  renderObj.getByText(/COO: Gwynne Shotwell/i);
      const hierarchyText4 =  renderObj.getByText(/Total Emplpoyees: 7000/i);
      const assetsText =  renderObj.getByText("SpaceX currently owns 3 vehicle(s), 3 launch site(s) and 1 test site(s)");
      const headquarter =  renderObj.getByText(/Headquarter:/i);
      const address =  renderObj.getByText(/Address: Rocket Road/i);
      const city =  renderObj.getByText(/City: Hawthorne/i);
      const state =  renderObj.getByText(/State: California/i);
      const summary = renderObj.getByText(/summary/i);
      
      
      const loading =  renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/error/i)
    
  

  
      expect(images[0]).toHaveAttribute('src', 'slider1.jpg')
      expect(images[1]).toHaveAttribute('src', 'slider2.jpg')
      expect(images[2]).toHaveAttribute('src', 'slider3.jpg')
      expect(slider).toBeInTheDocument()
      expect(history).toBeInTheDocument()
      expect(hierarchy).toBeInTheDocument()
      expect(assets).toBeInTheDocument()
      expect(historyText).toBeInTheDocument()
      expect(assetsText).toBeInTheDocument()
      expect(hierarchyText1).toBeInTheDocument()
      expect(hierarchyText2).toBeInTheDocument()
      expect(hierarchyText3).toBeInTheDocument()
      expect(hierarchyText4).toBeInTheDocument()
      expect(headquarter).toBeInTheDocument()
      expect(address).toBeInTheDocument()
      expect(city).toBeInTheDocument()
      expect(state).toBeInTheDocument()
      expect(summary).toBeInTheDocument()
      

      expect(loading).toBeNull();
      expect(error).toBeNull();
      
      


  });








  
  test('Testing Home page when the locally stored data is old and needs to be updated from the API', () => {

    mockeduseInfoQuery.mockReturnValue({
    loading: false,
    error: false,
    data: info
  })
  


  const cachedData: InfoItemsQuery = { info:
    {
      name: "SpaceX1", founder: "Elon Musk1", founded: 2002, employees: 3000, vehicles:1  ,launch_sites:1 ,test_sites: 1, ceo: "Elon Musk", cto:"Elon Musk",coo:"Gwynne Shotwell",valuation:2750000213, headquarters:{address: "Rocket Road", city:"NY", state:"California"}, summary: "summary old"
    } 
  
    }


 
const savedOldData =JSON.stringify(cachedData);
const savedNewData =JSON.stringify(info);


Storage.prototype.getItem = jest.fn((Home) => savedOldData);
Storage.prototype.setItem = jest.fn((Home, savedNewData)=> null);
  
    const renderObj = render(<Router > <HomeContainer  ></HomeContainer> </Router>);

    const slider =  renderObj.getByTestId("slider");
    const images =  renderObj.getAllByRole("img");
      
      const history =  renderObj.getByText(/History/i);
      const hierarchy =  renderObj.getByText(/Hierarchy/i);
      const assets =  renderObj.getByText(/Assets/i);

      const historyText =  renderObj.getByText("SpaceX was founded by Elon Musk in 2002. The current valuation of the company is around $ 27500000000");
      const hierarchyText1 =  renderObj.getByText(/CEO: Elon Musk/i);
      const hierarchyText2 =  renderObj.getByText(/CTO: Elon Musk/i);
      const hierarchyText3 =  renderObj.getByText(/COO: Gwynne Shotwell/i);
      const hierarchyText4 =  renderObj.getByText(/Total Emplpoyees: 7000/i);
      const assetsText =  renderObj.getByText("SpaceX currently owns 3 vehicle(s), 3 launch site(s) and 1 test site(s)");
      const headquarter =  renderObj.getByText(/Headquarter:/i);
      const address =  renderObj.getByText(/Address: Rocket Road/i);
      const city =  renderObj.getByText(/City: Hawthorne/i);
      const state =  renderObj.getByText(/State: California/i);
      const summary = renderObj.getByText(/summary/i);
      
      
      const loading =  renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/error/i)
    
  

  
      expect(images[0]).toHaveAttribute('src', 'slider1.jpg')
      expect(images[1]).toHaveAttribute('src', 'slider2.jpg')
      expect(images[2]).toHaveAttribute('src', 'slider3.jpg')
      expect(slider).toBeInTheDocument()
      expect(history).toBeInTheDocument()
      expect(hierarchy).toBeInTheDocument()
      expect(assets).toBeInTheDocument()
      expect(historyText).toBeInTheDocument()
      expect(assetsText).toBeInTheDocument()
      expect(hierarchyText1).toBeInTheDocument()
      expect(hierarchyText2).toBeInTheDocument()
      expect(hierarchyText3).toBeInTheDocument()
      expect(hierarchyText4).toBeInTheDocument()
      expect(headquarter).toBeInTheDocument()
      expect(address).toBeInTheDocument()
      expect(city).toBeInTheDocument()
      expect(state).toBeInTheDocument()
      expect(summary).toBeInTheDocument()
      

      expect(loading).toBeNull();
      expect(error).toBeNull();
      
      


  });








  test('Testing the page when there is no data locally stored and the page is waiting to receive the data from API', () => {

 

    mockeduseInfoQuery.mockReturnValue({
    loading: true,
    error: undefined,
    data: undefined
  })
  
    
  const savedData = null
  
  Storage.prototype.setItem = jest.fn((Home,savedData)=> null);
  Storage.prototype.getItem = jest.fn((Home) => null);
  
  
  
  const renderObj = render(<Router > <HomeContainer  ></HomeContainer> </Router>);
  
      const loading =  renderObj.getByTestId("loader");
      const error =  renderObj.queryByText(/error/i)
      const displayData =  renderObj.queryByTestId("homeContent")
      
      
      expect(loading).toBeInTheDocument()
      expect(error).toBeNull()
      expect(displayData).toBeNull()
  
  
      
    
  });


  test('Testing the page when there is no data locally stored and the page could not recieve data from the API', () => {

 

    mockeduseInfoQuery.mockReturnValue({
      loading: false,
      error: true,
      data: undefined
  })
  
    
  const savedData = null
  
  Storage.prototype.setItem = jest.fn((Home,savedData)=> null);
  Storage.prototype.getItem = jest.fn((Home) => null);
  
  
  
  const renderObj = render(<Router > <HomeContainer  ></HomeContainer> </Router>);
  
      const loading =  renderObj.queryByTestId("loader");
      const error =  renderObj.getByText(/error/i)
      const displayData =  renderObj.queryByTestId("homeContent")
      
      
      expect(loading).toBeNull()
      expect(error).toBeInTheDocument()
      expect(displayData).toBeNull()
  
  
      
    
  });





