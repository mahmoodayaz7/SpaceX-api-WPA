import  React from 'react';
import { MissionItemsQuery } from '../../generated/graphql';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


interface Props {
  data: MissionItemsQuery;
  }
  


const ShipList: React.FC<Props> = ({ data }) =>{ 



return (


  <div  id = "wrapper" >


<h1 className = "launchHeading">Missions Launched by SpaceX</h1>
<div id ="cardContainer">
{!!data.missions &&
        data.missions.map(
          (mission, i) =>
            !!mission && (


<Card aria-label = "card"  id = "card" key = {i}  style={{ width: '18rem' }}>
  
  <Card.Body id = "cardBody" >
    <div id = "cardtitletext" >
    <Card.Title id = "cardTitle" >{mission.mission_name}</Card.Title>
    <Card.Text className = "cardText">
    {mission.description}
    </Card.Text>
    </div>
    
    <Link to={`/missions/${mission.mission_id}`} >
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




