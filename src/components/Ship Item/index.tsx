import React from 'react';
import { useShipItemsQuery  } from '../../generated/graphql';
import ShipItem from './ShipItem';
import { useParams} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'





const ShipItemContainer = () => {
  

  const { id } = useParams();

  


  const { data, error, loading } = useShipItemsQuery();
  let collection = localStorage.getItem('Ships');
  if (collection !== null && collection !== undefined){
  let jsonData = JSON.parse(collection); 

 


const currentItem = jsonData.ships.find((ship: { ship_id: any; }) => ship.ship_id === id)
 


  return <ShipItem data={currentItem} />;
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

localStorage.setItem("Ships",JSON.stringify(data));


const currentItem:any = data?.ships?.find(ship => ship?.ship_id === id)
console.log(currentItem);
return (<ShipItem data={currentItem} />);
}



}


export default ShipItemContainer;