import React from 'react';
import { render,cleanup,act,fireEvent } from '@testing-library/react';
import ShipItemContainer from './index';
import { useShipItemsQuery } from '../../generated/graphql';
import { ShipItemsQuery } from '../../generated/graphql';
import { useParams } from 'react-router';


afterEach(cleanup);


jest.mock("../../generated/graphql");
jest.mock("react-router");

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

  const mockedUseParams = useParams as jest.Mock;



  test('Testing Ship Items page when the data was locally stored from the API', () => {


    const savedData =JSON.stringify(ships);
    
    

    mockeduseShipListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: ships
  })
  

  mockedUseParams.mockReturnValue({
    id: "AMERICANCHAMPION"
  })
  

   Storage.prototype.setItem = jest.fn((Ships,savedData) => null);
    Storage.prototype.getItem = jest.fn((Ships) => savedData);
  
  
    const renderObj = render(<ShipItemContainer  ></ShipItemContainer> );


    
  
      const tableRows =  renderObj.getAllByRole("row")
      const tableRow1 =  renderObj.getByRole("row", { name: /Specifications Details/i })
      const tableRow2 =  renderObj.getByRole("row", { name: /ship model NA/i })
      const tableRow3 =  renderObj.getByRole("row", { name: /ship type tug/i })
      const tableRow4 =  renderObj.getByRole("row", { name: /roles support ship barge tug/i })
      const tableRow5 =  renderObj.getByRole("row", { name: /active no/i })
      const tableRow6 =  renderObj.getByRole("row", { name: /year built 1976/i })
      const tableRow7 =  renderObj.getByRole("row", { name: /successful landings NA/i })
      const tableRow8 =  renderObj.getByRole("row", { name: /attempted landings NA/i })
     
      const heading = renderObj.getByText(/American Champion/i);
      const images = renderObj.getByTestId("imgs");
      const loading = renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/error/i)


      expect(loading).toBeNull();
      expect(error).toBeNull();

      expect(tableRows.length).toEqual(8);
      expect(tableRow1).toBeInTheDocument;
    
      expect(tableRow2).toBeInTheDocument;
      expect(tableRow3).toBeInTheDocument;
      expect(tableRow4).toBeInTheDocument;
      expect(tableRow5).toBeInTheDocument;
      expect(tableRow6).toBeInTheDocument;
      expect(tableRow7).toBeInTheDocument;
      expect(tableRow8).toBeInTheDocument;
      
      expect(heading).toBeInTheDocument;
      expect(images).toHaveAttribute('src', 'https://i.imgur.com/woCxpkj.jpg')

         
      act(() => {
        fireEvent(images, new Event('error'));
      })
        expect(images).toHaveAttribute('src', 'no_image_available.jpg')

     
      
  });





  test('Testing Ship Items page when the data was not locally stored from the API', () => {


    const savedData =JSON.stringify(ships);
    
    

    mockeduseShipListQuery.mockReturnValue({
    loading: false,
    error: false,
    data: ships
  })
  

  mockedUseParams.mockReturnValue({
    id: "AMERICANCHAMPION"
  })
  

  Storage.prototype.setItem = jest.fn((Ships,savedData) => null);
  Storage.prototype.getItem = jest.fn((Ships) => null);
  
  
  
    const renderObj = render(<ShipItemContainer  ></ShipItemContainer> );


    
  
      const tableRows =  renderObj.getAllByRole("row")
      const tableRow1 =  renderObj.getByRole("row", { name: /Specifications Details/i })
      const tableRow2 =  renderObj.getByRole("row", { name: /ship model NA/i })
      const tableRow3 =  renderObj.getByRole("row", { name: /ship type tug/i })
      const tableRow4 =  renderObj.getByRole("row", { name: /roles support ship barge tug/i })
      const tableRow5 =  renderObj.getByRole("row", { name: /active no/i })
      const tableRow6 =  renderObj.getByRole("row", { name: /year built 1976/i })
      const tableRow7 =  renderObj.getByRole("row", { name: /successful landings NA/i })
      const tableRow8 =  renderObj.getByRole("row", { name: /attempted landings NA/i })
     
      const heading = renderObj.getByText(/American Champion/i);
      const images = renderObj.getByTestId("imgs");
      const loading = renderObj.queryByTestId("loader");
      const error =  renderObj.queryByText(/error/i)


      expect(loading).toBeNull();
      expect(error).toBeNull();

      expect(tableRows.length).toEqual(8);
      expect(tableRow1).toBeInTheDocument;
    
      expect(tableRow2).toBeInTheDocument;
      expect(tableRow3).toBeInTheDocument;
      expect(tableRow4).toBeInTheDocument;
      expect(tableRow5).toBeInTheDocument;
      expect(tableRow6).toBeInTheDocument;
      expect(tableRow7).toBeInTheDocument;
      expect(tableRow8).toBeInTheDocument;
      
      expect(heading).toBeInTheDocument;
      expect(images).toHaveAttribute('src', 'https://i.imgur.com/woCxpkj.jpg')

      act(() => {
        fireEvent(images, new Event('error'));
      })
        expect(images).toHaveAttribute('src', 'no_image_available.jpg')
     
      
  });







  test('Testing Ship Items page when the data was not locally stored from the API and the page is waiting for the data to load from the API', () => {

 

    mockeduseShipListQuery.mockReturnValue({
        loading: true,
        error: undefined,
        data: undefined
      })
      
    
      mockedUseParams.mockReturnValue({
        id: "AMERICANCHAMPION"
      })
      
 
   Storage.prototype.getItem = jest.fn((Rockets) => null);
  
  
  
    const renderObj = render( <ShipItemContainer  ></ShipItemContainer>);
  
      const loading =  renderObj.getByTestId("loader");
      const error =  renderObj.queryByText(/error/i)
      const displayData =  renderObj.queryByTestId("Ship")
      
      
      expect(loading).toBeInTheDocument()
      expect(error).toBeNull()
      expect(displayData).toBeNull()
  
  
      
    
  });




  
  test('Testing Ship Items page when the data was not locally stored from the API and the page fails to retrieve data from API', () => {

 

    mockeduseShipListQuery.mockReturnValue({
        loading: false,
        error: true,
        data: undefined
      })
      
    
      mockedUseParams.mockReturnValue({
        id: "AMERICANCHAMPION"
      })
      
      Storage.prototype.getItem = jest.fn((Ships) => null);
  
  
    const renderObj = render( <ShipItemContainer  ></ShipItemContainer>);
  
      const loading =  renderObj.queryByTestId("loader");
      const error =  renderObj.getByText(/error/i)
      const displayData =   renderObj.queryByTestId("Ship")
      
      
      expect(loading).toBeNull()
      expect(error).toBeInTheDocument()
      expect(displayData).toBeNull()
  
  
      
    
  });



  
