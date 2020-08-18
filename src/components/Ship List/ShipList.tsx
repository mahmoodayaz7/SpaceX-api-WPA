import  React from 'react';
import { ShipItemsQuery } from '../../generated/graphql';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import no_img from './images/no_image_available.jpg'
import { Link } from 'react-router-dom';


interface Props {
  data: ShipItemsQuery;
  }
  


const ShipList: React.FC<Props> = ({ data }) =>{ 



return (


  <div  id = "wrapper" >


<h1 className = "launchHeading" >Ships Launched by SpaceX</h1>
<div id ="cardContainer">
{!!data.ships &&
        data.ships.map(
          (ship, i) =>
            !!ship && (


<Card aria-label = "card"  id = "cardShip" key = {i}  style={{ width: '18rem' }}>
  <div id = "imgContainerShip" >
  <Card.Img id = "displayImg"  onError={(e:React.ChangeEvent<any>)=>{e.target.onerror = null; e.target.src=no_img}}  variant="top" src = {ship?.image ? ship?.image : no_img } />
  </div>
  <Card.Body id = "cardBody" >
    <div id = "cardtitletext" >
    <Card.Title id = "cardTitle" >{ship.ship_name}</Card.Title>
    <Card.Text className = "cardTextShip">
    {ship.year_built}
    </Card.Text>
    </div>
    
    <Link to={`/ships/${ship.ship_id}`} >
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
export default ShipList;




