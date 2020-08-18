import React from 'react';
import { render,cleanup,  fireEvent,act  } from '@testing-library/react';
import MissionListContainer from './index';
import { useMissionItemsQuery } from '../../generated/graphql';
import { MissionItemsQuery } from '../../generated/graphql';
import { BrowserRouter as Router, useLocation} from 'react-router-dom';



afterEach(cleanup);


jest.mock("../../generated/graphql");


const missions: MissionItemsQuery = { missions:[
  {
    mission_id: "9D1B7E0", mission_name: "Thaicom", manufacturers: ["Orbital ATK"], description: "description 1", wikipedia: "https://en.wikipedia.org/wiki/Thaicom"  ,website: "http://www.thaicom.net/en/satellites/overview",twitter: "https://twitter.com/thaicomplc" 
  } 
    ,
    {
      mission_id: "F3364BF", mission_name: "Iridium NEXT", manufacturers: [ "Orbital ATK"], description: "description 2", wikipedia: "https://en.wikipedia.org/wiki/Iridium_satellite_constellation"  ,website: "https://www.iridiumnext.com/",twitter: null 
    } 

  ]}
  
  const mockeduseMissionListQuery = useMissionItemsQuery as jest.Mock;




  test('Testing Mission List page when there is no data locally stored', () => {

    mockeduseMissionListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: missions
  })
  
  
  Storage.prototype.getItem = jest.fn((Missions) => null);
  
    const renderObj = render(<Router > <MissionListContainer  ></MissionListContainer> </Router>);
  
      const items =  renderObj.getAllByRole("generic", { name: 'card' })
      const name1 =  renderObj.getByText(/Thaicom/i)
      const name2 =  renderObj.getByText(/Iridium NEXT/i)
      const des1 = renderObj.getByText(/description 1/i)
      const des2 = renderObj.getByText(/description 2/i)
     
      const loading =  renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/Please load this page online once/i)
      const heading =  renderObj.getByText(/Missions Launched by SpaceX/i)
    
  
  
      expect(items.length).toEqual(2)
      expect(name1).toBeInTheDocument()
      expect(name2).toBeInTheDocument()
     
     
      expect(loading).toBeNull();
      expect(error).toBeNull();
      expect(heading).toBeInTheDocument()
      
   
    
      // TESTING 'LEARN MORE' BUTTON


    const Item =  renderObj.getAllByRole('link')
    expect(Item[0]).toHaveAttribute('href', '/missions/9D1B7E0')
    expect(Item[1]).toHaveAttribute('href', '/missions/F3364BF')

  
      
    act(() => {
      fireEvent.click(Item[0]);
      
    })
    
  
    expect(location.pathname).toBe('/missions/9D1B7E0');

    
      
    act(() => {
      fireEvent.click(Item[1]);
      
    })
    expect(location.pathname).toBe('/missions/F3364BF');


  });
  








  test('Testing Mission List page when data is locally stored', () => {

    mockeduseMissionListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: missions
  })
  
const savedData =JSON.stringify(missions);

Storage.prototype.setItem = jest.fn((Missions, savedData)=> null);
Storage.prototype.getItem = jest.fn((Missions) => savedData);

    const renderObj = render(<Router > <MissionListContainer  ></MissionListContainer> </Router>);
  
      const items =  renderObj.getAllByRole("generic", { name: 'card' })
      const name1 =  renderObj.getByText(/Thaicom/i)
      const name2 =  renderObj.getByText(/Iridium NEXT/i)
      const des1 = renderObj.getByText(/description 1/i)
      const des2 = renderObj.getByText(/description 2/i)
     
      const loading =  renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/Please load this page online once/i)
      const heading =  renderObj.getByText(/Missions Launched by SpaceX/i)
    
  
  
      expect(items.length).toEqual(2)
      expect(name1).toBeInTheDocument()
      expect(name2).toBeInTheDocument()
     
     
      expect(loading).toBeNull();
      expect(error).toBeNull();
      expect(heading).toBeInTheDocument()
      
   
    
      // TESTING 'LEARN MORE' BUTTON


    const Item =  renderObj.getAllByRole('link')
    expect(Item[0]).toHaveAttribute('href', '/missions/9D1B7E0')
    expect(Item[1]).toHaveAttribute('href', '/missions/F3364BF')

  
      
    act(() => {
      fireEvent.click(Item[0]);
      
    })
    
  
    expect(location.pathname).toBe('/missions/9D1B7E0');

    
      
    act(() => {
      fireEvent.click(Item[1]);
      
    })
    expect(location.pathname).toBe('/missions/F3364BF');


  });
  







  
  test('Testing Mission List page when the locally stored data is old and needs to be updated from the API', () => {

    mockeduseMissionListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: missions
  })

  const cachedData:MissionItemsQuery = { missions:[
    {
      mission_id: "9D1B7E350", mission_name: "Thaicom OLD", manufacturers: ["Orbital ATK1"], description: "description 1 OLD", wikipedia: "https://en.wikipedia.org/wiki/Thaicomold"  ,website: "http://www.thaicom.net/en/satellites/overviewold",twitter: null 
    } 
      ,
      {
        mission_id: "F33ddsf64BF", mission_name: "Iridium PREV", manufacturers: [ "Orbital ATK12"], description: "description 2 OLD", wikipedia: "https://en.wikipedia.org/wiki/Iridium_satellite_constellationold"  ,website: "https://www.iridiumnextold.com/",twitter: null 
      } 
  
    ]}
  
 

    const savedOldData =JSON.stringify(cachedData);
    const savedNewData =JSON.stringify(missions);
    
  
  Storage.prototype.getItem = jest.fn((Ships) => savedOldData);
  Storage.prototype.setItem = jest.fn((Ships, savedNewData)=> null);
  
  
    const renderObj = render(<Router > <MissionListContainer  ></MissionListContainer> </Router>);
  
      const items =  renderObj.getAllByRole("generic", { name: 'card' })
      const name1 =  renderObj.getByText(/Thaicom/i)
      const name2 =  renderObj.getByText(/Iridium NEXT/i)
      const des1 = renderObj.getByText(/description 1/i)
      const des2 = renderObj.getByText(/description 2/i)
     
      const loading =  renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/Please load this page online once/i)
      const heading =  renderObj.getByText(/Missions Launched by SpaceX/i)
    
  
  
      expect(items.length).toEqual(2)
      expect(name1).toBeInTheDocument()
      expect(name2).toBeInTheDocument()
     
     
      expect(loading).toBeNull();
      expect(error).toBeNull();
      expect(heading).toBeInTheDocument()
      
   
    
      // TESTING 'LEARN MORE' BUTTON


    const Item =  renderObj.getAllByRole('link')
    expect(Item[0]).toHaveAttribute('href', '/missions/9D1B7E0')
    expect(Item[1]).toHaveAttribute('href', '/missions/F3364BF')

  
      
    act(() => {
      fireEvent.click(Item[0]);
      
    })
    
  
    expect(location.pathname).toBe('/missions/9D1B7E0');

    
      
    act(() => {
      fireEvent.click(Item[1]);
      
    })
    expect(location.pathname).toBe('/missions/F3364BF');


  });
  






  test('Testing the page when there is no data locally stored and the page is waiting to receive the data from API', () => {

 

    mockeduseMissionListQuery.mockReturnValue({
    loading: true,
    error: undefined,
    data: undefined
  })
  
    
  const savedData = null
  
  
  Storage.prototype.setItem = jest.fn((Missions,savedData)=> null);
  Storage.prototype.getItem = jest.fn((Missions) => null);
  
  
  
    const renderObj = render( <Router><MissionListContainer  ></MissionListContainer> </Router>);
  
    const loading =  renderObj.getByTestId("loader");
    const error =  renderObj.queryByText(/Please load this page online once/i)
      const displayData =  renderObj.queryAllByRole("generic", { name: 'card' })
      
      
      expect(loading).toBeInTheDocument()
      expect(error).toBeNull()
      expect(displayData.length).toEqual(0)
  
  
      
    
  });
  





  
  test('Testing the page when there is no data locally stored and the page could not recieve data from the API', () => {

 

    mockeduseMissionListQuery.mockReturnValue({
      loading: false,
      error: true,
      data: undefined
  })
  
    
  const savedData = null
  
  
  Storage.prototype.setItem = jest.fn((Missions,savedData)=> null);
  Storage.prototype.getItem = jest.fn((Missions) => null);
  
  
  
    const renderObj = render( <Router><MissionListContainer  ></MissionListContainer> </Router>);

    const loading =  renderObj.queryByTestId("loader");
    const error =  renderObj.getByText(/Please load this page online once/i)
    const displayData =  renderObj.queryAllByRole("generic", { name: 'card' })
    
    
    expect(loading).toBeNull()
    expect(error).toBeInTheDocument()
    expect(displayData.length).toEqual(0)

  
      
    
  });


