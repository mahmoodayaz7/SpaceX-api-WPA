import  React from 'react';
import { LaunchListQuery } from '../../generated/graphql';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import no_img from './images/no_image_available.jpeg'



interface Props {
  data: LaunchListQuery;
  }
  


const LaunchList: React.FC<Props> = ({ data }) =>{ 



return (


  <div  id = "wrapper" >


<h1>Missions Launched by SpaceX</h1>
<div id ="cardContainer">
{!!data.launches &&
        data.launches.map(
          (launch, i) =>
            !!launch && (


<Card aria-label = "card"  id = "card" key = {i}  style={{ width: '18rem' }}>
  <div id = "imgContainer" >
  <Card.Img id = "displayImg"   variant="top" src = {launch?.links?.flickr_images?.[0] ? launch?.links?.flickr_images[0] : no_img } />
  </div>
  <Card.Body id = "cardBody" >
    <div id = "cardtitletext" >
    <Card.Title id = "cardTitle" >{launch.mission_name} ({launch.launch_year})</Card.Title>
    <Card.Text className = "cardText">
    {launch.details}
    </Card.Text>
    </div>
    
    
    <Button variant="primary">Learn More</Button>
  
   
  </Card.Body>
</Card>

     )
     )}
</div>

  </div>
);
}
export default LaunchList;




