import React from 'react';
import { useRocketItemsQuery, RocketItemsQuery } from '../../generated/graphql';
import RocketList from './RocketList';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";



const RocketListContainer = () => {



  const { data, error, loading } = useRocketItemsQuery();

  let collection = localStorage.getItem('Rockets');
   
    if (collection !== null && collection !== undefined){
    let jsonData = JSON.parse(collection);  

    console.log(jsonData);
    return (<RocketList data={jsonData} />);
 
  }

    else{

      if (loading) {
        return <div>Loading...</div>;
    
    
      }
    
      if (error || !data) {
        return <div>ERROR</div>;
      }
    
      else {
     
      localStorage.setItem("Rockets",JSON.stringify(data));
    
      return (<RocketList data={data} />);
      }


    }



  
};

export default RocketListContainer;