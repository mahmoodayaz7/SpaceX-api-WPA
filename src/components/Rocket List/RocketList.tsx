import  React from 'react';
import { RocketItemsQuery } from '../../generated/graphql';
import Card from 'react-bootstrap/Card'
import './styles.css';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import no_img from './images/no_image_available.jpg';





interface Props {
  data: RocketItemsQuery;
  }
  


/*
const RocketList: React.FC<Props> = ({ data }) => (
  <div >
<Table striped bordered hover variant="dark">
  <thead>
    <tr>

{ !!data?.rockets?.[0] && 
   Object.keys (data?.rockets?.[0]).map ((heading, i) => {
    
    if (heading !== "__typename" && heading !== "rocket_id" )
   return <th key = {i} > {heading.replace("_", " ")} </th>
    else
    return null
   })

}

  </tr>
  </thead>
  
    
  <tbody>

  {!!data.rockets &&
        data.rockets.map(
          (rocket, i) =>
            !!rocket && (
              <tr key = {i}>
              <td>{rocket.id}</td>
              <td>{(rocket.active)?.toString()}</td>
              <td>{rocket.boosters}</td>
              <td>{rocket.first_flight}</td>
              <td>{rocket.country}</td>
              <td>{rocket.rocket_name}</td>
              <td>{rocket.rocket_type}</td>
            </tr>
            ),
        )}
    
    
  </tbody>
  
      
 
</Table>
  </div>
);

export default RocketList;


*/


const RocketList: React.FC<Props> = ({ data }) =>{ 

  

return (




  <div id = "wrapper">
<h1 className = "launchHeading">Rockets Launched by SpaceX</h1>
<div id ="cardContainer">
{!!data.rockets &&
        data.rockets.map(
          (rocket, i) =>
            !!rocket && (


<Card id = "card" key = {i} aria-label = "card" style={{ width: '18rem' }}>
  <div id = "imgContainer">
  <Card.Img id = "displayImg" data-testid = "rocket_img" variant="top" onError={(e:React.ChangeEvent<any>)=>{e.target.onerror = null; e.target.src=no_img}}    src = {rocket?.flickr_images?.[0] ?rocket.flickr_images[0] : no_img }  />
  </div>
  <Card.Body id = "cardBody">
    <div id = "cardtitletext">
    <Card.Title id = "cardTitle" >{rocket.rocket_name}</Card.Title>
    <Card.Text className = "cardText">
    {rocket.description}
    </Card.Text>
    </div>
    
    <Link to={`/rockets/${rocket.rocket_id}`} >
    <Button variant="primary">Learn More</Button>
    </Link>
   
  </Card.Body>
</Card>

     )
     )}
</div>
  </div>
);
}
export default RocketList;
