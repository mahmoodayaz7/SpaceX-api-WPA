import React from 'react';
import { useRocketItemsQuery,RocketItemsQuery  } from '../../generated/graphql';
import RocketItem from './RocketItem';
import { useParams} from 'react-router-dom';

type data =  {

active: boolean
boosters: number
company: string
cost_per_launch: number
country: string
description: string
engines:{
number: number
type: string
version: string
__typename: string
}
first_flight: string
flickr_images: string[]
mass:{
kg: number
__typename: string
}
rocket_id: string
rocket_name: string
rocket_type: string
stages: number
success_rate_pct: number
__typename: string

  }


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
  return <div>Loading...</div>;


}

if (error || !data) {
  return <div>ERROR</div>;
}

else {

localStorage.setItem("Rockets",JSON.stringify(data));


const currentItem:any = data?.rockets?.find(rocket => rocket?.rocket_id === id)
console.log(currentItem);
return (<RocketItem data={currentItem} />);
}



}


export default RocketItemContainer;