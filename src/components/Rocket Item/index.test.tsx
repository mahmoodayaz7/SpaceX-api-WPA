import React from 'react';
import { render,cleanup } from '@testing-library/react';
import RocketItemContainer from './index';
import { useRocketItemQuery } from '../../generated/graphql';
import { RocketItemQuery } from '../../generated/graphql';
import { useParams } from 'react-router';




afterEach(cleanup);


jest.mock("../../generated/graphql");
jest.mock("react-router");

const rocket: RocketItemQuery = { rocket:
    {
    rocket_name: "Falcon 9", rocket_type: "rocket", description: "rocket 1 description", active:true  ,flickr_images: ["https://imgur.com/DaCfMsj.jpg" , "https://imgur.com/azYafd8.jpg"],engines: {number: 9, type: "merlin", version:"1"}, mass: { kg: 549054},company: "SpaceX", boosters:0, stages:2, first_flight:"2010-06-04",country:"United States",cost_per_launch:50000000, success_rate_pct:97,} 
  } 
  
    
  const mockeduseRocketItemQuery = useRocketItemQuery as jest.Mock;
  const mockedUseParams = useParams as jest.Mock;



  test('Testing Rockets API response with data', () => {

 

    mockeduseRocketItemQuery.mockReturnValue({
    loading: false,
    error: false,
    data: rocket
  })
  

  mockedUseParams.mockReturnValue({
    id: "Falcon9"
  })
  
  
  
  
    const renderObj = render( <RocketItemContainer  ></RocketItemContainer>);
  
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


      expect(tableRows.length).toEqual(12);
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
      expect(images.length).toEqual(2);
    
  });



  test('Testing the page when its waiting to receive the data from API', () => {

 

    mockeduseRocketItemQuery.mockReturnValue({
        loading: true,
        error: undefined,
        data: undefined
      })
      
    
      mockedUseParams.mockReturnValue({
        id: "Falcon9"
      })
      
  
  
  
    const renderObj = render( <RocketItemContainer  ></RocketItemContainer>);
  
      const loading =  renderObj.getByText(/loading/i)
      const error =  renderObj.queryByText(/error/i)
      const displayData =  renderObj.queryByTestId("Rocket")
      
      
      expect(loading).toBeInTheDocument()
      expect(error).toBeNull()
      expect(displayData).toBeNull()
  
  
      
    
  });
  
  
test('Testing the page when there is an error', () => {

 

    mockeduseRocketItemQuery.mockReturnValue({
        loading: false,
        error: true,
        data: undefined
      })
      
    
      mockedUseParams.mockReturnValue({
        id: "Falcon9"
      })
      
  
  
  
    const renderObj = render( <RocketItemContainer  ></RocketItemContainer>);
  
      const loading =  renderObj.queryByText(/loading/i)
      const error =  renderObj.getByText(/error/i)
      const displayData =   renderObj.queryByTestId("Rocket")
      
      
      expect(loading).toBeNull()
      expect(error).toBeInTheDocument()
      expect(displayData).toBeNull()
  
  
      
    
  });