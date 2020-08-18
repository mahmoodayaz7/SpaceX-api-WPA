import React from 'react';
import { useMissionItemsQuery  } from '../../generated/graphql';
import MissionItem from './MissionItem';
import { useParams} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'





const MissionItemContainer = () => {
  

  const { id } = useParams();

  


  const { data, error, loading } = useMissionItemsQuery();
  let collection = localStorage.getItem('Missions');
  if (collection !== null && collection !== undefined){
  let jsonData = JSON.parse(collection); 

 


const currentItem = jsonData.missions.find((mission: { mission_id: any; }) => mission.mission_id === id)
 


  return <MissionItem data={currentItem} />;
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

localStorage.setItem("Missions",JSON.stringify(data));


const currentItem:any = data?.missions?.find(mission => mission?.mission_id === id)
console.log(currentItem);
return (<MissionItem data={currentItem} />);
}



}


export default MissionItemContainer;