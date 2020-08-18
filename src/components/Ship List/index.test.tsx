import React from 'react';
import { render,cleanup,  fireEvent,act  } from '@testing-library/react';
import ShipListContainer from './index';
import { useShipItemsQuery } from '../../generated/graphql';
import { ShipItemsQuery } from '../../generated/graphql';
import { BrowserRouter as Router, useLocation} from 'react-router-dom';



afterEach(cleanup);


jest.mock("../../generated/graphql");


const ships: ShipItemsQuery = { ships:[
  {
    ship_id: "AMERICANCHAMPION", ship_name: "American Champion", ship_model: null, ship_type: "Tug", active:false  ,roles: ["Support Ship",  "Barge Tug"],year_built: 1976, successful_landings:null, attempted_landings:null, image:"https://i.imgur.com/woCxpkj.jpg"
  } 
    ,
    {
      ship_id: "AMERICANISLANDER", ship_name: "American Islander", ship_model: null, ship_type: "cargo", active:false  ,roles: ["Dragon Recovery"],year_built: null, successful_landings:null, attempted_landings:null, image:"https://i.imgur.com/jmj8Sh2.jpg"
    } 

  ]}
  
  const mockeduseShipListQuery = useShipItemsQuery as jest.Mock;




  test('Testing Shup List page when there is no data locally stored', () => {

    mockeduseShipListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: ships
  })
  
  
  Storage.prototype.getItem = jest.fn((Ships) => null);
  
    const renderObj = render(<Router > <ShipListContainer  ></ShipListContainer> </Router>);
  
      const items =  renderObj.getAllByRole("generic", { name: 'card' })
      const name1 =  renderObj.getByText(/American Champion/i)
      const name2 =  renderObj.getByText(/American Islander/i)
      const year1 = renderObj.getByText(/1976/i)
    
      const images =  renderObj.getAllByRole("img")
      const loading = renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/Please load this page online once/i)
      const heading =  renderObj.getByText(/Ships Launched by SpaceX/i)
    
  
  
      expect(items.length).toEqual(2)
      expect(images[0]).toHaveAttribute('src', 'https://i.imgur.com/woCxpkj.jpg')
      expect(images[1]).toHaveAttribute('src', 'https://i.imgur.com/jmj8Sh2.jpg')
      expect(name1).toBeInTheDocument()
      expect(name2).toBeInTheDocument()
      expect(year1).toBeInTheDocument()
     
      expect(loading).toBeNull();
      expect(error).toBeNull();
      expect(heading).toBeInTheDocument()
      

      act(() => {
        fireEvent(images[0], new Event('error'));
      })
        expect(images[0]).toHaveAttribute('src', 'no_image_available.jpg')

        
      act(() => {
        fireEvent(images[1], new Event('error'));
      })
        expect(images[1]).toHaveAttribute('src', 'no_image_available.jpg')
   
    
      // TESTING 'LEARN MORE' BUTTON


    const Item =  renderObj.getAllByRole('link')
    expect(Item[0]).toHaveAttribute('href', '/ships/AMERICANCHAMPION')
    expect(Item[1]).toHaveAttribute('href', '/ships/AMERICANISLANDER')

  
      
    act(() => {
      fireEvent.click(Item[0]);
      
    })
    
  
    expect(location.pathname).toBe("/ships/AMERICANCHAMPION");

    
      
    act(() => {
      fireEvent.click(Item[1]);
      
    })
    expect(location.pathname).toBe("/ships/AMERICANISLANDER");


  });
  










  test('Testing Shup List page when the data is locally stored', () => {

    mockeduseShipListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: ships
  })
  
  const savedData =JSON.stringify(ships);

Storage.prototype.setItem = jest.fn((Ships, savedData)=> null);
Storage.prototype.getItem = jest.fn((Ships) => savedData);

    const renderObj = render(<Router > <ShipListContainer  ></ShipListContainer> </Router>);
  
      const items =  renderObj.getAllByRole("generic", { name: 'card' })
      const name1 =  renderObj.getByText(/American Champion/i)
      const name2 =  renderObj.getByText(/American Islander/i)
      const year1 = renderObj.getByText(/1976/i)
    
      const images =  renderObj.getAllByRole("img")
      const loading = renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/Please load this page online once/i)
      const heading =  renderObj.getByText(/Ships Launched by SpaceX/i)
    
  
  
      expect(items.length).toEqual(2)
      expect(images[0]).toHaveAttribute('src', 'https://i.imgur.com/woCxpkj.jpg')
      expect(images[1]).toHaveAttribute('src', 'https://i.imgur.com/jmj8Sh2.jpg')
      expect(name1).toBeInTheDocument()
      expect(name2).toBeInTheDocument()
      expect(year1).toBeInTheDocument()
     
      expect(loading).toBeNull();
      expect(error).toBeNull();
      expect(heading).toBeInTheDocument()
      

      act(() => {
        fireEvent(images[0], new Event('error'));
      })
        expect(images[0]).toHaveAttribute('src', 'no_image_available.jpg')

        
      act(() => {
        fireEvent(images[1], new Event('error'));
      })
        expect(images[1]).toHaveAttribute('src', 'no_image_available.jpg')


      // TESTING 'LEARN MORE' BUTTON


    const Item =  renderObj.getAllByRole('link')
    expect(Item[0]).toHaveAttribute('href', '/ships/AMERICANCHAMPION')
    expect(Item[1]).toHaveAttribute('href', '/ships/AMERICANISLANDER')

  
      
    act(() => {
      fireEvent.click(Item[0]);
      
    })
    
  
    expect(location.pathname).toBe("/ships/AMERICANCHAMPION");

    
      
    act(() => {
      fireEvent.click(Item[1]);
      
    })
    expect(location.pathname).toBe("/ships/AMERICANISLANDER");


  });
  







  test('Testing Shup List page when the locally stored data is old and needs to be updated from the API', () => {

    mockeduseShipListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: ships
  })
  
  
const cachedData: ShipItemsQuery = { ships:[
  {
    ship_id: "ENGLISHCHAMP", ship_name: "English Champion OLD", ship_model: "abc", ship_type: "Tug123", active:false  ,roles: ["Dragon Recovery",  "Barge Tug"],year_built: 1986, successful_landings:null, attempted_landings:2, image:"https://i.imgur.com/wsadoCxpkj.jpg"
  } 
    ,
    {
      ship_id: "PAKISTANCHAMP", ship_name: "Pakistani Islander", ship_model: null, ship_type: "cargo321", active:true  ,roles: ["Barge Tug"],year_built: 1990, successful_landings:5, attempted_landings:null, image:"https://i.imgur.com/jmj82131Sh2.jpg"
    } 

  ]}


  const savedOldData =JSON.stringify(cachedData);
  const savedNewData =JSON.stringify(ships);
  

Storage.prototype.getItem = jest.fn((Ships) => savedOldData);
Storage.prototype.setItem = jest.fn((Ships, savedNewData)=> null);

    const renderObj = render(<Router > <ShipListContainer  ></ShipListContainer> </Router>);
  
      const items =  renderObj.getAllByRole("generic", { name: 'card' })
      const name1 =  renderObj.getByText(/American Champion/i)
      const name2 =  renderObj.getByText(/American Islander/i)
      const year1 = renderObj.getByText(/1976/i)
    
      const images =  renderObj.getAllByRole("img")
      const loading = renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/Please load this page online once/i)
      const heading =  renderObj.getByText(/Ships Launched by SpaceX/i)
    
  
  
      expect(items.length).toEqual(2)
      expect(images[0]).toHaveAttribute('src', 'https://i.imgur.com/woCxpkj.jpg')
      expect(images[1]).toHaveAttribute('src', 'https://i.imgur.com/jmj8Sh2.jpg')
      expect(name1).toBeInTheDocument()
      expect(name2).toBeInTheDocument()
      expect(year1).toBeInTheDocument()
     
      expect(loading).toBeNull();
      expect(error).toBeNull();
      expect(heading).toBeInTheDocument()

      act(() => {
        fireEvent(images[0], new Event('error'));
      })
        expect(images[0]).toHaveAttribute('src', 'no_image_available.jpg')

        
      act(() => {
        fireEvent(images[1], new Event('error'));
      })
        expect(images[1]).toHaveAttribute('src', 'no_image_available.jpg')
      


      // TESTING 'LEARN MORE' BUTTON


    const Item =  renderObj.getAllByRole('link')
    expect(Item[0]).toHaveAttribute('href', '/ships/AMERICANCHAMPION')
    expect(Item[1]).toHaveAttribute('href', '/ships/AMERICANISLANDER')

  
      
    act(() => {
      fireEvent.click(Item[0]);
      
    })
    
  
    expect(location.pathname).toBe("/ships/AMERICANCHAMPION");

    
      
    act(() => {
      fireEvent.click(Item[1]);
      
    })
    expect(location.pathname).toBe("/ships/AMERICANISLANDER");


  });






  test('Testing the page when there is no data locally stored and the page is waiting to receive the data from API', () => {

 

    mockeduseShipListQuery.mockReturnValue({
    loading: true,
    error: undefined,
    data: undefined
  })
  
    
  const savedData = null
  
  
  Storage.prototype.setItem = jest.fn((Ships,savedData)=> null);
  Storage.prototype.getItem = jest.fn((Ships) => null);
  
  
  
    const renderObj = render( <Router><ShipListContainer  ></ShipListContainer> </Router>);
  
    const loading = renderObj.getByTestId("loader");
      const error =  renderObj.queryByText(/Please load this page online once/i)
      const displayData =  renderObj.queryAllByRole("generic", { name: 'card' })
      
      
      expect(loading).toBeInTheDocument()
      expect(error).toBeNull()
      expect(displayData.length).toEqual(0)
  
  
      
    
  });
  






  test('Testing the page when there is no data locally stored and the page could not recieve data from the API', () => {

 

    mockeduseShipListQuery.mockReturnValue({
      loading: false,
      error: true,
      data: undefined
  })
  
    
  const savedData = null
  
  
  Storage.prototype.setItem = jest.fn((Ships,savedData)=> null);
  Storage.prototype.getItem = jest.fn((Ships) => null);
  
  
  
    const renderObj = render( <Router><ShipListContainer  ></ShipListContainer> </Router>);

    const loading = renderObj.queryByTestId("loader");
    const error =  renderObj.getByText(/Please load this page online once/i)
    const displayData =  renderObj.queryAllByRole("generic", { name: 'card' })
    
    
    expect(loading).toBeNull()
    expect(error).toBeInTheDocument()
    expect(displayData.length).toEqual(0)

  
      
    
  });
  




  


