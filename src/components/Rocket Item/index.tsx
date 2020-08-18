import React from 'react';
import { useRocketItemsQuery  } from '../../generated/graphql';
import RocketItem from './RocketItem';
import { useParams} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'




const RocketItemContainer = () => {
  

  const { id } = useParams();

  


  const { data, error, loading } = useRocketItemsQuery();
  let collection = localStorage.getItem('Rockets');
  if (collection !== null && collection !== undefined){
  let jsonData = JSON.parse(collection); 

 


const currentItem = jsonData.rockets.find((rocket: { rocket_id: any; }) => rocket.rocket_id === id)
 


  return <RocketItem data={currentItem} />;
};





if (loading) {
  return <div data-testid = "loader" className = "loader">

<Spinner  animation="border" role="status">
<span className="sr-only">Loading...</span>
</Spinner>
  </div>;


}

if (error || !data) {
  return <div className = "error">ERROR</div>;
}

else {

localStorage.setItem("Rockets",JSON.stringify(data));


const currentItem:any = data?.rockets?.find(rocket => rocket?.rocket_id === id)
console.log(currentItem);
return (<RocketItem data={currentItem} />);
}



}


export default RocketItemContainer;