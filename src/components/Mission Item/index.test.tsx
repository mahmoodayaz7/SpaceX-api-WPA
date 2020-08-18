import React from 'react';
import { render,cleanup } from '@testing-library/react';
import MissionItemContainer from './index';
import { useMissionItemsQuery } from '../../generated/graphql';
import { MissionItemsQuery } from '../../generated/graphql';
import { useParams } from 'react-router';


afterEach(cleanup);


jest.mock("../../generated/graphql");
jest.mock("react-router");


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

  const mockedUseParams = useParams as jest.Mock;



  test('Testing Mission Items page when the data was locally stored from the API', () => {


    const savedData =JSON.stringify(missions);
    
    

    mockeduseMissionListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: missions
  })
  

  mockedUseParams.mockReturnValue({
    id: "9D1B7E0"
  })
  

   Storage.prototype.setItem = jest.fn((Missions,savedData) => null);
    Storage.prototype.getItem = jest.fn((Missions) => savedData);
  
  
    const renderObj = render(<MissionItemContainer  ></MissionItemContainer> );


    
  
      const tableRows =  renderObj.getAllByRole("row")
      const tableRow1 =  renderObj.getByRole("row", { name: /Specifications Details/i })
      const tableRow2 =  renderObj.getByRole("row", { name: /manufacturers Orbital ATK/i })
      const tableRow3 =  renderObj.getByRole("row", { name: "wikipedia link" })
      const tableRow4 =  renderObj.getByRole("row", { name: "website link" })
      const tableRow5 =  renderObj.getByRole("row", { name: "twitter link" })
      const links =  renderObj.getAllByRole("link")
     
     
      const heading = renderObj.getByRole("heading", { name: /Thaicom/i });
      const des = renderObj.getByText(/description 1/i);
      const loading = renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/error/i)


      expect(loading).toBeNull();
      expect(error).toBeNull();

      expect(links[0]).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Thaicom')
      expect(links[1]).toHaveAttribute('href', 'http://www.thaicom.net/en/satellites/overview')
      expect(links[2]).toHaveAttribute('href', 'https://twitter.com/thaicomplc')

      expect(tableRows.length).toEqual(5);
      expect(tableRow1).toBeInTheDocument;
    
      expect(tableRow2).toBeInTheDocument;
      expect(tableRow3).toBeInTheDocument;
      expect(tableRow4).toBeInTheDocument;
      expect(tableRow5).toBeInTheDocument;
      
      expect(heading).toBeInTheDocument;
      expect(des).toBeInTheDocument;
  
      
     
      
  });







  test('Testing Mission Items page when the data was not locally stored from the API', () => {


    const savedData =JSON.stringify(missions);
    
    

    mockeduseMissionListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: missions
  })
  

  mockedUseParams.mockReturnValue({
    id: "9D1B7E0"
  })
  

  Storage.prototype.setItem = jest.fn((Ships,savedData) => null);
  Storage.prototype.getItem = jest.fn((Ships) => null);
  
    const renderObj = render(<MissionItemContainer  ></MissionItemContainer> );


    
  
      const tableRows =  renderObj.getAllByRole("row")
      const tableRow1 =  renderObj.getByRole("row", { name: /Specifications Details/i })
      const tableRow2 =  renderObj.getByRole("row", { name: /manufacturers Orbital ATK/i })
      const tableRow3 =  renderObj.getByRole("row", { name: "wikipedia link" })
      const tableRow4 =  renderObj.getByRole("row", { name: "website link" })
      const tableRow5 =  renderObj.getByRole("row", { name: "twitter link" })
      const links =  renderObj.getAllByRole("link")
     
     
      const heading = renderObj.getByRole("heading", { name: /Thaicom/i });
      const des = renderObj.getByText(/description 1/i);
      const loading = renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/error/i)


      expect(loading).toBeNull();
      expect(error).toBeNull();

      expect(links[0]).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Thaicom')
      expect(links[1]).toHaveAttribute('href', 'http://www.thaicom.net/en/satellites/overview')
      expect(links[2]).toHaveAttribute('href', 'https://twitter.com/thaicomplc')

      expect(tableRows.length).toEqual(5);
      expect(tableRow1).toBeInTheDocument;
    
      expect(tableRow2).toBeInTheDocument;
      expect(tableRow3).toBeInTheDocument;
      expect(tableRow4).toBeInTheDocument;
      expect(tableRow5).toBeInTheDocument;
      
      expect(heading).toBeInTheDocument;
      expect(des).toBeInTheDocument;
  
      
     
      
  });







  test('Testing Mission Items page when the data was not locally stored from the API and the page is waiting for the data to load from the API', () => {

 

    mockeduseMissionListQuery.mockReturnValue({
        loading: true,
        error: undefined,
        data: undefined
      })
      
    
      mockedUseParams.mockReturnValue({
        id: "9D1B7E0"
      })
      
 
   Storage.prototype.getItem = jest.fn((Missions) => null);
  
  
  
    const renderObj = render( <MissionItemContainer  ></MissionItemContainer>);
  
      const loading =  renderObj.getByTestId("loader");
      const error =  renderObj.queryByText(/error/i)
      const displayData =  renderObj.queryByTestId("mission")
      
      
      expect(loading).toBeInTheDocument()
      expect(error).toBeNull()
      expect(displayData).toBeNull()
  
  
      
    
  });







  test('Testing Mission Items page when the data was not locally stored from the API and the page fails to retrieve data from API', () => {

 

    mockeduseMissionListQuery.mockReturnValue({
        loading: false,
        error: true,
        data: undefined
      })
      
    
      mockedUseParams.mockReturnValue({
        id: "9D1B7E0"
      })
      
      Storage.prototype.getItem = jest.fn((Missions) => null);
  
  
    const renderObj = render( <MissionItemContainer  ></MissionItemContainer>);
  
      const loading =  renderObj.queryByTestId("loader");
      const error =  renderObj.getByText(/error/i)
      const displayData =   renderObj.queryByTestId("mission")
      
      
      expect(loading).toBeNull()
      expect(error).toBeInTheDocument()
      expect(displayData).toBeNull()
  
  
      
    
  });





