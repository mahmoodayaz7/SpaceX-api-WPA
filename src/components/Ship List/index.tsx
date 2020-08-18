import React from 'react';
import {useShipItemsQuery} from '../../generated/graphql';
import ShipList from './ShipList';
import Spinner from 'react-bootstrap/Spinner'


const ShipListContainer = () => {


  const { data, error, loading } = useShipItemsQuery();

  const [updateData, setUpdateData] = React.useState(false);

  
  
  

  React.useEffect (()=>{

   console.log(data)
  
   if (data !== null && data !== undefined){
    localStorage.setItem("Ships",JSON.stringify(data));
    setUpdateData(true)
   }
  

  },[data])


  let collection = localStorage.getItem('Ships');
 
  
  if (collection !== null && collection !== undefined ){
    
    
    let jsonData = JSON.parse(collection);

    if (updateData === true){
      console.log("data updated")
      return (<ShipList data={data!} />);

      

    }

    return (<ShipList data={jsonData} />)

    
  }






  if (loading) {
    return <div data-testid = "loader" className = "loader">
  
  <Spinner  animation="border" role="status">
  <span className="sr-only">Loading...</span>
  </Spinner>
    </div>;
  
  
  }
  
  if (error || !data) {
    return <div className = "error">Please load this page online once</div>;
  }


  
  return (<ShipList data={data} />);

  

}

export default ShipListContainer;