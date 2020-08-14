import React from 'react';
import { render,cleanup } from '@testing-library/react';
import LaunchListContainer from './index';
import { useLaunchListQuery } from '../../generated/graphql';
import { LaunchListQuery } from '../../generated/graphql';




afterEach(cleanup);


jest.mock("../../generated/graphql");

const launches: LaunchListQuery = { launches:[
  {
  flight_number: 1, mission_name: "FalconSat", launch_year: 2006, details: "details 1",  links:{ flickr_images:["https://farm9.staticflickr.com/8569/16169086873_4d8829832e_o.png","https://farm8.staticflickr.com/7619/16763151866_35a0a4d8e1_o.jpg"]}
} ,

{
  flight_number: 2, mission_name: "DemoSat", launch_year: 2005, details: "details 2",  links:{ flickr_images:[]}
}

  ]}
  
  const mockeduseLaunchListQuery = useLaunchListQuery as jest.Mock;

test('Testing Rockets API response with data', () => {

 

  mockeduseLaunchListQuery.mockReturnValue({
  loading: false,
  error: false,
  data: launches
})




  const renderObj = render( <LaunchListContainer  ></LaunchListContainer> );

    const items =  renderObj.getAllByRole("generic", { name: 'card' })
    const name1 =  renderObj.getByText(/FalconSat/i)
    const name2 =  renderObj.getByText(/DemoSat/i)
    const des1 = renderObj.getByText(/details 1/i)
    const des2 = renderObj.getByText(/details 2/i)
    const images =  renderObj.getAllByRole("img")
    const loading =  renderObj.queryByText(/loading/i)
    const error =  renderObj.queryByText(/error/i)
    const heading =  renderObj.getByText(/Missions Launched by SpaceX/i)


    expect(items.length).toEqual(2)
    expect(images.length).toEqual(2)
    expect(name1).toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(des1).toBeInTheDocument()
    expect(des2).toBeInTheDocument()
    expect(loading).toBeNull();
    expect(error).toBeNull();
    expect(heading).toBeInTheDocument()
    
  
});


test('Testing the page when its waiting to receive the data from API', () => {

 

  mockeduseLaunchListQuery.mockReturnValue({
  loading: true,
  error: undefined,
  data: undefined
})




  const renderObj = render( <LaunchListContainer  ></LaunchListContainer>);

    const loading =  renderObj.getByText(/loading/i)
    const error =  renderObj.queryByText(/error/i)
    const displayData =  renderObj.queryAllByRole("generic", { name: 'card' })
    
    
    expect(loading).toBeInTheDocument()
    expect(error).toBeNull()
    expect(displayData.length).toEqual(0)


    
  
});


test('Testing the page when there is an error', () => {

 

  mockeduseLaunchListQuery.mockReturnValue({
  loading: false,
  error: true,
  data: undefined
})




  const renderObj = render( <LaunchListContainer  ></LaunchListContainer>);

    const loading =  renderObj.queryByText(/loading/i)
    const error =  renderObj.getByText(/error/i)
    const displayData =  renderObj.queryAllByRole("generic", { name: 'card' })
    
    
    expect(loading).toBeNull()
    expect(error).toBeInTheDocument()
    expect(displayData.length).toEqual(0)


    
  
});
