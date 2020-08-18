import React from 'react';
import { useInfoItemsQuery} from '../../generated/graphql';
import Home from './Home';
import Spinner from 'react-bootstrap/Spinner'



const HomeContainer = () => {


 
  const { data, error, loading } = useInfoItemsQuery();

  const [updateData, setUpdateData] = React.useState(false);

  
  
  

  React.useEffect (()=>{

   console.log(data)
  
   if (data !== null && data !== undefined){
    localStorage.setItem("Home",JSON.stringify(data));
    setUpdateData(true)
   }
  

  },[data])


  let collection = localStorage.getItem('Home');
 
  
  if (collection !== null && collection !== undefined ){
    
    
    let jsonData = JSON.parse(collection);

    if (updateData === true){
      console.log("data updated")
      return (<Home data={data!} />);

      

    }

    return (<Home data={jsonData} />)

    
  }





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


  
  return (<Home data={data} />);

  



  
};

export default HomeContainer;


