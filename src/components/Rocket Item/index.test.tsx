import React from 'react';
import { render,cleanup, fireEvent, act } from '@testing-library/react';
import RocketItemContainer from './index';
import { useRocketItemsQuery } from '../../generated/graphql';
import { RocketItemsQuery } from '../../generated/graphql';
import { useParams } from 'react-router';


afterEach(cleanup);


jest.mock("../../generated/graphql");
jest.mock("react-router");

const rockets: RocketItemsQuery = { rockets:[
  {
    rocket_id: "Falcon9", rocket_name: "Falcon 9", rocket_type: "rocket", description: "rocket 1 description", active:true  ,flickr_images: ["https://imgur.com/DaCfMsj.jpg" , "https://imgur.com/azYafd8.jpg"],engines: {number: 9, type: "merlin", version:"1"}, mass: { kg: 549054},company: "SpaceX", boosters:0, stages:2, first_flight:"2010-06-04",country:"United States",cost_per_launch:50000000, success_rate_pct:97
  } 
    ,
  {
      rocket_id: "Falcon1", rocket_name: "Falcon 1", rocket_type: "rocket", description: "rocket 2 description", active:true  ,flickr_images: ["https://imgur.com/DaCfMsj.jpg" , "https://imgur.com/azYafd8.jpg"],engines: {number: 2, type: "merlin", version:"5"}, mass: { kg: 569234},company: "SpaceX", boosters:0, stages:3, first_flight:"2001-03-02",country:"Pakistan",cost_per_launch:80000000, success_rate_pct:99
  } 

  ]}
    
  const mockeduseRocketItemQuery = useRocketItemsQuery as jest.Mock;
  const mockedUseParams = useParams as jest.Mock;



  test('Testing Rocket Items page when the data was locally stored from the API', () => {


    const savedData =JSON.stringify(rockets);
    
    

    mockeduseRocketItemQuery.mockReturnValue({
    loading: false,
    error: false,
    data: rockets
  })
  

  mockedUseParams.mockReturnValue({
    id: "Falcon9"
  })
  
  
  

    
   //const renderObj1 = render(<Router> <RocketListContainer  ></RocketListContainer> </Router>);

   Storage.prototype.setItem = jest.fn((Rockets,savedData) => null);
    Storage.prototype.getItem = jest.fn((Rockets) => savedData);
  
  
    const renderObj = render(<RocketItemContainer  ></RocketItemContainer> );


    
  
      const tableRows =  renderObj.getAllByRole("row")
      const tableRow1 =  renderObj.getByRole("row", { name: /Specifications Details/i })
      const tableRow2 =  renderObj.getByRole("row", { name: /rocket type rocket/i })
      const tableRow3 =  renderObj.getByRole("row", { name: /active yes/i })
      const tableRow4 =  renderObj.getByRole("row", { name: /engines number: 9 , type: Merlin , version: 1/i })
      const tableRow5 =  renderObj.getByRole("row", { name: /mass 549054 kg/i })
      const tableRow6 =  renderObj.getByRole("row", { name: /company spacex/i })
      const tableRow7 =  renderObj.getByRole("row", { name: /boosters 0/i })
      const tableRow8 =  renderObj.getByRole("row", { name: /stages 2/i })
      const tableRow9 =  renderObj.getByRole("row", { name: /first flight 2010-06-04/i })
      const tableRow10 =  renderObj.getByRole("row", { name: /country united states/i })
      const tableRow11 =  renderObj.getByRole("row", { name: /cost per launch 50000000/i })
      const tableRow12 =  renderObj.getByRole("row", { name: /success rate pct 97/i })
      const description = renderObj.getByText(/rocket 1 description/i);
      const heading = renderObj.getByText(/Falcon 9/i);
      const images = renderObj.getAllByTestId("imgs");
      const loading = renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/error/i)


      expect(loading).toBeNull();
      expect(error).toBeNull();

      expect(tableRows.length).toEqual(13);
      expect(tableRow1).toBeInTheDocument;
    
      expect(tableRow2).toBeInTheDocument;
      expect(tableRow3).toBeInTheDocument;
      expect(tableRow4).toBeInTheDocument;
      expect(tableRow5).toBeInTheDocument;
      expect(tableRow6).toBeInTheDocument;
      expect(tableRow7).toBeInTheDocument;
      expect(tableRow8).toBeInTheDocument;
      expect(tableRow9).toBeInTheDocument;
      expect(tableRow10).toBeInTheDocument;
      expect(tableRow11).toBeInTheDocument;
      expect(tableRow12).toBeInTheDocument;
      expect(description).toBeInTheDocument;
      expect(heading).toBeInTheDocument;
      expect(images[0]).toHaveAttribute('src', 'https://imgur.com/DaCfMsj.jpg')
      expect(images[1]).toHaveAttribute('src', 'https://imgur.com/azYafd8.jpg')


    
      act(() => {
        fireEvent(images[0], new Event('error'));
      })
        expect(images[0]).toHaveAttribute('src', 'no_image_available.jpg')


    
  });





  test('Testing Rocket Items page when the data was not locally stored from the API', () => {


    const savedData =JSON.stringify(rockets);
    
    

    mockeduseRocketItemQuery.mockReturnValue({
    loading: false,
    error: false,
    data: rockets
  })
  

  mockedUseParams.mockReturnValue({
    id: "Falcon9"
  })
  
  
  

    
   //const renderObj1 = render(<Router> <RocketListContainer  ></RocketListContainer> </Router>);

   Storage.prototype.setItem = jest.fn((Rockets,savedData) => null);
  Storage.prototype.getItem = jest.fn((Rockets) => null);
  
  
    const renderObj = render(<RocketItemContainer  ></RocketItemContainer> );


    
  
      const tableRows =  renderObj.getAllByRole("row")
      const tableRow1 =  renderObj.getByRole("row", { name: /Specifications Details/i })
      const tableRow2 =  renderObj.getByRole("row", { name: /rocket type rocket/i })
      const tableRow3 =  renderObj.getByRole("row", { name: /active yes/i })
      const tableRow4 =  renderObj.getByRole("row", { name: /engines number: 9 , type: Merlin , version: 1/i })
      const tableRow5 =  renderObj.getByRole("row", { name: /mass 549054 kg/i })
      const tableRow6 =  renderObj.getByRole("row", { name: /company spacex/i })
      const tableRow7 =  renderObj.getByRole("row", { name: /boosters 0/i })
      const tableRow8 =  renderObj.getByRole("row", { name: /stages 2/i })
      const tableRow9 =  renderObj.getByRole("row", { name: /first flight 2010-06-04/i })
      const tableRow10 =  renderObj.getByRole("row", { name: /country united states/i })
      const tableRow11 =  renderObj.getByRole("row", { name: /cost per launch 50000000/i })
      const tableRow12 =  renderObj.getByRole("row", { name: /success rate pct 97/i })
      const description = renderObj.getByText(/rocket 1 description/i);
      const heading = renderObj.getByText(/Falcon 9/i);
      const images = renderObj.getAllByTestId("imgs");
      const loading = renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/error/i)


      expect(loading).toBeNull();
      expect(error).toBeNull();

      expect(tableRows.length).toEqual(13);
      expect(tableRow1).toBeInTheDocument;
    
      expect(tableRow2).toBeInTheDocument;
      expect(tableRow3).toBeInTheDocument;
      expect(tableRow4).toBeInTheDocument;
      expect(tableRow5).toBeInTheDocument;
      expect(tableRow6).toBeInTheDocument;
      expect(tableRow7).toBeInTheDocument;
      expect(tableRow8).toBeInTheDocument;
      expect(tableRow9).toBeInTheDocument;
      expect(tableRow10).toBeInTheDocument;
      expect(tableRow11).toBeInTheDocument;
      expect(tableRow12).toBeInTheDocument;
      expect(description).toBeInTheDocument;
      expect(heading).toBeInTheDocument;
      expect(images[0]).toHaveAttribute('src', 'https://imgur.com/DaCfMsj.jpg')
      expect(images[1]).toHaveAttribute('src', 'https://imgur.com/azYafd8.jpg')


      act(() => {
        fireEvent(images[0], new Event('error'));
      })
        expect(images[0]).toHaveAttribute('src', 'no_image_available.jpg')

    
  });



  
 


  test('Testing Rocket Items page when the data was not locally stored from the API and the page is waiting for the data to load from the API', () => {

 

    mockeduseRocketItemQuery.mockReturnValue({
        loading: true,
        error: undefined,
        data: undefined
      })
      
    
      mockedUseParams.mockReturnValue({
        id: "Falcon9"
      })
      
 
   Storage.prototype.getItem = jest.fn((Rockets) => null);
  
  
  
    const renderObj = render( <RocketItemContainer  ></RocketItemContainer>);
  
      const loading =  renderObj.getByTestId("loader")
      const error =  renderObj.queryByText(/error/i)
      const displayData =  renderObj.queryByTestId("Rocket")
      
      
      
      expect(loading).toBeInTheDocument()
      expect(error).toBeNull()
      expect(displayData).toBeNull()
  
  
      
    
  });
  
  
test('Testing Rocket Items page when the data was not locally stored from the API and the page fails to retrieve data from API', () => {

 

    mockeduseRocketItemQuery.mockReturnValue({
        loading: false,
        error: true,
        data: undefined
      })
      
    
      mockedUseParams.mockReturnValue({
        id: "Falcon9"
      })
      
      Storage.prototype.getItem = jest.fn((Rockets) => null);
  
  
    const renderObj = render( <RocketItemContainer  ></RocketItemContainer>);
  
      const loading =  renderObj.queryByTestId("loader")
      const error =  renderObj.getByText(/error/i)
      const displayData =   renderObj.queryByTestId("Rocket")
      
      
      expect(loading).toBeNull()
      expect(error).toBeInTheDocument()
      expect(displayData).toBeNull()
      
  
      
    
  });

