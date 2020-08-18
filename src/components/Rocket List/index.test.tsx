import React from 'react';
import { render,cleanup,  fireEvent,act  } from '@testing-library/react';
import RocketListContainer from './index';
import { useRocketItemsQuery } from '../../generated/graphql';
import { RocketItemsQuery } from '../../generated/graphql';
import { BrowserRouter as Router, useLocation} from 'react-router-dom';



afterEach(cleanup);


jest.mock("../../generated/graphql");


const rockets: RocketItemsQuery = { rockets:[
  {
    rocket_id: "Falcon9", rocket_name: "Falcon 9", rocket_type: "rocket", description: "rocket 1 description", active:true  ,flickr_images: ["https://imgur.com/DaCfMsj.jpg" , "https://imgur.com/azYafd8.jpg"],engines: {number: 9, type: "merlin", version:"1"}, mass: { kg: 549054},company: "SpaceX", boosters:0, stages:2, first_flight:"2010-06-04",country:"United States",cost_per_launch:50000000, success_rate_pct:97
  } 
    ,
  {
      rocket_id: "Falcon1", rocket_name: "Falcon 1", rocket_type: "rocket", description: "rocket 2 description", active:true  ,flickr_images: ["https://imgur.com/DaCsadafMsj.jpg" , "https://imgur.com/azYafd8.jpg"],engines: {number: 2, type: "merlin", version:"5"}, mass: { kg: 569234},company: "SpaceX", boosters:0, stages:3, first_flight:"2001-03-02",country:"Pakistan",cost_per_launch:80000000, success_rate_pct:99
  } 

  ]}
  
  const mockeduseRocketListQuery = useRocketItemsQuery as jest.Mock;




  test('Testing Rockets List page when there is no data locally stored', () => {

    mockeduseRocketListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: rockets
  })
  
  const savedData =JSON.stringify(rockets);
  
  //Storage.prototype.setItem = jest.fn((Rockets, savedData)=> null);
  Storage.prototype.getItem = jest.fn((Rockets) => null);
  
    const renderObj = render(<Router > <RocketListContainer  ></RocketListContainer> </Router>);
  
      const items =  renderObj.getAllByRole("generic", { name: 'card' })
      const name1 =  renderObj.getByText(/Falcon 1/i)
      const name2 =  renderObj.getByText(/Falcon 9/i)
      const des1 = renderObj.getByText(/rocket 1 description/i)
      const des2 = renderObj.getByText(/rocket 2 description/i)
      const images =  renderObj.getAllByRole("img")
      const loading =  renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/Please load this page online once/i)
      const heading =  renderObj.getByText(/Rockets Launched by SpaceX/i)
    
  
  
      expect(items.length).toEqual(2)
      expect(images[0]).toHaveAttribute('src', 'https://imgur.com/DaCfMsj.jpg')
      expect(images[1]).toHaveAttribute('src', 'https://imgur.com/DaCsadafMsj.jpg')
      expect(name1).toBeInTheDocument()
      expect(name2).toBeInTheDocument()
      expect(des1).toBeInTheDocument()
      expect(des2).toBeInTheDocument()
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
    expect(Item[0]).toHaveAttribute('href', '/rockets/Falcon9')
    expect(Item[1]).toHaveAttribute('href', '/rockets/Falcon1')

  
      
    act(() => {
      fireEvent.click(Item[0]);
      
    })
    
  
    expect(location.pathname).toBe("/rockets/Falcon9");

    
      
    act(() => {
      fireEvent.click(Item[1]);
      
    })
    expect(location.pathname).toBe("/rockets/Falcon1");


  });
  












test('Testing Rockets List page when the data is locally stored', () => {

 

  mockeduseRocketListQuery.mockReturnValue({
  loading: false,
  error: false,
  data: rockets
})

const savedData =JSON.stringify(rockets);

Storage.prototype.setItem = jest.fn((Rockets, savedData)=> null);
Storage.prototype.getItem = jest.fn((Rockets) => savedData);

  const renderObj = render(<Router> <RocketListContainer  ></RocketListContainer> </Router>);

    const items =  renderObj.getAllByRole("generic", { name: 'card' })
    const name1 =  renderObj.getByText(/Falcon 1/i)
    const name2 =  renderObj.getByText(/Falcon 9/i)
    const des1 = renderObj.getByText(/rocket 1 description/i)
    const des2 = renderObj.getByText(/rocket 2 description/i)
    const images =  renderObj.getAllByRole("img")
    const loading = renderObj.queryByTestId("loader");
    const error =  renderObj.queryByText(/Please load this page online once/i)
    const heading =  renderObj.getByText(/Rockets Launched by SpaceX/i)
    const button = renderObj.getAllByText(/learn more/i)


    expect(items.length).toEqual(2)
    expect(images[0]).toHaveAttribute('src', 'https://imgur.com/DaCfMsj.jpg')
    expect(images[1]).toHaveAttribute('src', 'https://imgur.com/DaCsadafMsj.jpg')
    expect(name1).toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(des1).toBeInTheDocument()
    expect(des2).toBeInTheDocument()
    expect(loading).toBeNull();
    expect(error).toBeNull();
    expect(heading).toBeInTheDocument()
    expect(button.length).toEqual(2)
    

    
    act(() => {
      fireEvent(images[0], new Event('error'));
    })
      expect(images[0]).toHaveAttribute('src', 'no_image_available.jpg')

      
    act(() => {
      fireEvent(images[1], new Event('error'));
    })
      expect(images[1]).toHaveAttribute('src', 'no_image_available.jpg')
    
    const Item =  renderObj.getAllByRole('link')
    expect(Item[0]).toHaveAttribute('href', '/rockets/Falcon9')
    expect(Item[1]).toHaveAttribute('href', '/rockets/Falcon1')

  
      
    act(() => {
      fireEvent.click(Item[0]);
      
    })
    
  
    expect(location.pathname).toBe("/rockets/Falcon9");

    
      
    act(() => {
      fireEvent.click(Item[1]);
      
    })
    expect(location.pathname).toBe("/rockets/Falcon1");
  
});




test('Testing Rockets List page when the locally stored data is old and needs to be updated from the API', () => {

 

  mockeduseRocketListQuery.mockReturnValue({
  loading: false,
  error: false,
  data: rockets
})


const cachedData: RocketItemsQuery = { rockets:[
  {
    rocket_id: "Falcon0", rocket_name: "Falcon 0", rocket_type: "rocket", description: "rocket 3 description", active:true  ,flickr_images: ["https://imgur.com/DaCfMsj.jpg" , "https://imgur.com/azYafd8.jpg"],engines: {number: 1, type: "merlin", version:"19"}, mass: { kg: 54219054},company: "SpaceX", boosters:0, stages:5, first_flight:"2010-01-04",country:"New Zealand",cost_per_launch:500140000, success_rate_pct:90
  } 
    ,
  {
      rocket_id: "Falcon15", rocket_name: "Falcon 15", rocket_type: "rocket", description: "rocket 4 description", active:true  ,flickr_images: ["https://imgur.com/DaCfMsj.jpg" , "https://imgur.com/azYafd8.jpg"],engines: {number: 6, type: "merlin", version:"15"}, mass: { kg: 5691234},company: "SpaceX", boosters:0, stages:1, first_flight:"2011-03-02",country:"India",cost_per_launch:85000000, success_rate_pct:91
  } 

  ]}



const savedOldData =JSON.stringify(cachedData);
const savedNewData =JSON.stringify(rockets);


Storage.prototype.getItem = jest.fn((Rockets) => savedOldData);
Storage.prototype.setItem = jest.fn((Rockets, savedNewData)=> null);

  const renderObj = render(<Router> <RocketListContainer  ></RocketListContainer> </Router>);

    const items =  renderObj.getAllByRole("generic", { name: 'card' })
    const name1 =  renderObj.getByText(/Falcon 1/i)
    const name2 =  renderObj.getByText(/Falcon 9/i)
    const des1 = renderObj.getByText(/rocket 1 description/i)
    const des2 = renderObj.getByText(/rocket 2 description/i)
    const images =  renderObj.getAllByRole("img")
    const loading =  renderObj.queryByTestId("loader");
    const error =  renderObj.queryByText(/Please load this page online once/i)
    const heading =  renderObj.getByText(/Rockets Launched by SpaceX/i)
    const button = renderObj.getAllByText(/learn more/i)


    expect(items.length).toEqual(2)
    expect(images[0]).toHaveAttribute('src', 'https://imgur.com/DaCfMsj.jpg')
    expect(images[1]).toHaveAttribute('src', 'https://imgur.com/DaCsadafMsj.jpg')
    expect(name1).toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(des1).toBeInTheDocument()
    expect(des2).toBeInTheDocument()
    expect(loading).toBeNull();
    expect(error).toBeNull();
    expect(heading).toBeInTheDocument()
    expect(button.length).toEqual(2)


    act(() => {
      fireEvent(images[0], new Event('error'));
    })
      expect(images[0]).toHaveAttribute('src', 'no_image_available.jpg')

      
    act(() => {
      fireEvent(images[1], new Event('error'));
    })
      expect(images[1]).toHaveAttribute('src', 'no_image_available.jpg')
    
    
    const Item =  renderObj.getAllByRole('link')
    expect(Item[0]).toHaveAttribute('href', '/rockets/Falcon9')
    expect(Item[1]).toHaveAttribute('href', '/rockets/Falcon1')

  
      
    act(() => {
      fireEvent.click(Item[0]);
      
    })
    
  
    expect(location.pathname).toBe("/rockets/Falcon9");

    
      
    act(() => {
      fireEvent.click(Item[1]);
      
    })
    expect(location.pathname).toBe("/rockets/Falcon1");
  
});







test('Testing the page when there is no data locally stored and the page is waiting to receive the data from API', () => {

 

  mockeduseRocketListQuery.mockReturnValue({
  loading: true,
  error: undefined,
  data: undefined
})

  
const savedData = null

Storage.prototype.setItem = jest.fn((Rockets,savedData)=> null);
Storage.prototype.getItem = jest.fn((Rockets) => null);



  const renderObj = render( <Router><RocketListContainer  ></RocketListContainer> </Router>);

    const loading = renderObj.getByTestId("loader");
    const error =  renderObj.queryByText(/Please load this page online once/i)
    const displayData =  renderObj.queryAllByRole("generic", { name: 'card' })
    
    
    expect(loading).toBeInTheDocument()
    expect(error).toBeNull()
    expect(displayData.length).toEqual(0)


    
  
});











test('Testing the page when there is no data locally stored and the page could not recieve data from the API', () => {

 

  mockeduseRocketListQuery.mockReturnValue({
  loading: false,
  error: true,
  data: undefined
})

const savedData = null

Storage.prototype.setItem = jest.fn((Rockets,savedData)=> null);
Storage.prototype.getItem = jest.fn((Rockets) => null);



  const renderObj = render(<Router> <RocketListContainer  ></RocketListContainer></Router>);

    const loading = renderObj.queryByTestId("loader");
    const error =  renderObj.getByText(/Please load this page online once/i)
    const displayData =  renderObj.queryAllByRole("generic", { name: 'card' })
    
    
    expect(loading).toBeNull()
    expect(error).toBeInTheDocument()
    expect(displayData.length).toEqual(0)


    
  
});












/*

const savedData =JSON.stringify(rockets);

Storage.prototype.setItem = jest.fn((Rockets, savedData)=> null);
Storage.prototype.getItem = jest.fn((Rockets) => savedData);

*/