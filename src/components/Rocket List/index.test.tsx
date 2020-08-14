import React from 'react';
import { render,cleanup } from '@testing-library/react';
import RocketListContainer from './index';
import { useRocketItemsQuery } from '../../generated/graphql';
import { RocketItemsQuery } from '../../generated/graphql';
import { BrowserRouter as Router } from 'react-router-dom';



afterEach(cleanup);


jest.mock("../../generated/graphql");

const rockets: RocketItemsQuery = { rockets:[
  {
  rocket_name: "Falcon 1", rocket_id: "Falcon 1", description: "rocket 1 description", flickr_images: ["https://imgur.com/DaCfMsj.jpg" , "https://imgur.com/azYafd8.jpg"] 
} ,

{rocket_name: "Falcon 9", rocket_id: "Falcon 9", description : "rocket 2 description", flickr_images: ["https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg", "https://farm4.staticflickr.com/3955/32915197674_eee74d81bb_b.jpg"]
} 

  ]}
  
  const mockeduseRocketListQuery = useRocketItemsQuery as jest.Mock;

test('Testing Rockets API response with data', () => {

 

  mockeduseRocketListQuery.mockReturnValue({
  loading: false,
  error: false,
  data: rockets
})




  const renderObj = render(<Router> <RocketListContainer  ></RocketListContainer> </Router>);

    const items =  renderObj.getAllByRole("generic", { name: 'card' })
    const name1 =  renderObj.getByText(/Falcon 1/i)
    const name2 =  renderObj.getByText(/Falcon 9/i)
    const des1 = renderObj.getByText(/rocket 1 description/i)
    const des2 = renderObj.getByText(/rocket 2 description/i)
    const images =  renderObj.getAllByRole("img")
    const loading =  renderObj.queryByText(/loading/i)
    const error =  renderObj.queryByText(/error/i)
    const heading =  renderObj.getByText(/Rockets Launched by SpaceX/i)


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

 

  mockeduseRocketListQuery.mockReturnValue({
  loading: true,
  error: undefined,
  data: undefined
})




  const renderObj = render( <RocketListContainer  ></RocketListContainer>);

    const loading =  renderObj.getByText(/loading/i)
    const error =  renderObj.queryByText(/error/i)
    const displayData =  renderObj.queryAllByRole("generic", { name: 'card' })
    
    
    expect(loading).toBeInTheDocument()
    expect(error).toBeNull()
    expect(displayData.length).toEqual(0)


    
  
});


test('Testing the page when there is an error', () => {

 

  mockeduseRocketListQuery.mockReturnValue({
  loading: false,
  error: true,
  data: undefined
})




  const renderObj = render( <RocketListContainer  ></RocketListContainer>);

    const loading =  renderObj.queryByText(/loading/i)
    const error =  renderObj.getByText(/error/i)
    const displayData =  renderObj.queryAllByRole("generic", { name: 'card' })
    
    
    expect(loading).toBeNull()
    expect(error).toBeInTheDocument()
    expect(displayData.length).toEqual(0)


    
  
});
