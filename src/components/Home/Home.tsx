import React from 'react';
import { InfoItemsQuery } from '../../generated/graphql';
import Carousel from 'react-bootstrap/Carousel'
import slide1 from './images/slider1.jpg'
import slide2 from './images/slider2.jpg'
import slide3 from './images/slider3.jpg'
import './styles.css'
interface Props {
  data: InfoItemsQuery;
  }

  const Home: React.FC<Props> = ({ data }) => {


  return (
    <div data-testid = "homeContent" id = "backgroundWrapper">
  

<Carousel data-testid = "slider" className = "slider">
  <Carousel.Item >
    <img
      className="d-block w-100"
      src={slide1}
      alt="First slide"
    />
    
    <Carousel.Caption>
      <h3 className = "sliderHeading">History</h3>
  <p className = "sliderText">{data.info?.name} was founded by {data.info?.founder} in {data.info?.founded}. The current valuation of the company is around $ {data.info?.valuation}</p>
    </Carousel.Caption>
    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slide2}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3 className = "sliderHeading">Assets</h3>
      <p className = "sliderText">{data.info?.name} currently owns {data.info?.vehicles} vehicle(s), {data.info?.launch_sites} launch site(s) and {data.info?.test_sites} test site(s)</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slide3}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3 className = "sliderHeading">Hierarchy</h3>
      <li className = "sliderText" >CEO: {data.info?.ceo}</li> 
      <li className = "sliderText" >CTO: {data.info?.cto}</li> 
      <li className = "sliderText" >COO: {data.info?.coo}</li> 
      <li className = "sliderText" >Total Emplpoyees: {data.info?.employees}</li> 
     
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>



<p className = "companyDes">{data.info?.summary}</p>

<div className = "headquarter" >
<h2 id = "headquarterHeading">Headquarter:</h2>
<li className = "headquarterText" >Address: {data.info?.headquarters?.address} </li>
<li className = "headquarterText" >City: {data.info?.headquarters?.city} </li>
<li className = "headquarterText" >State: {data.info?.headquarters?.state} </li>
</div>

    </div>
  );
}

export default Home;
