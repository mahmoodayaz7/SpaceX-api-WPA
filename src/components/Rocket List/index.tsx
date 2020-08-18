import React from 'react';
import { useRocketItemsQuery} from '../../generated/graphql';
import RocketList from './RocketList';
import Spinner from 'react-bootstrap/Spinner'





const RocketListContainer = () => {


  const { data, error, loading } = useRocketItemsQuery();

  const [updateData, setUpdateData] = React.useState(false);

  
  
  

  React.useEffect (()=>{

   console.log(data)
  
   if (data !== null && data !== undefined){
    localStorage.setItem("Rockets",JSON.stringify(data));
    setUpdateData(true)
   }
  

  },[data])


  let collection = localStorage.getItem('Rockets');
 
  
  if (collection !== null && collection !== undefined ){
    
    
    let jsonData = JSON.parse(collection);

    if (updateData === true){
      console.log("data updated")
      return (<RocketList data={data!} />);

      

    }

    return (<RocketList data={jsonData} />)

    
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

 
 
  return (<RocketList data={data} />);

  





/*




  if (storageUpdated === true ){
    let jsonData = JSON.parse(collection!); 
  

    return (

        <RocketList data={jsonData} />
    )

  }
   
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


*/
  
};

export default RocketListContainer;