import React from 'react';
import { useMissionItemsQuery} from '../../generated/graphql';
import MissionList from './MissionList';
import Spinner from 'react-bootstrap/Spinner'




const MissionListContainer = () => {


 
  const { data, error, loading } = useMissionItemsQuery();

  const [updateData, setUpdateData] = React.useState(false);

  
  
  

  React.useEffect (()=>{

   console.log(data)
  
   if (data !== null && data !== undefined){
    localStorage.setItem("Missions",JSON.stringify(data));
    setUpdateData(true)
   }
  

  },[data])


  let collection = localStorage.getItem('Missions');
 
  
  if (collection !== null && collection !== undefined ){
    
    
    let jsonData = JSON.parse(collection);

    if (updateData === true){
      console.log("data updated")
      return (<MissionList data={data!} />);

      

    }

    return (<MissionList data={jsonData} />)

    
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

  
  return (<MissionList data={data} />);

  



  
};

export default MissionListContainer;



/*

import React from 'react';
import {useMissionItemsQuery, MissionItemsQuery} from '../../generated/graphql';
import MissionList from './MissionList';


const MissionListContainer = () => {

const { data, error, loading } = useMissionItemsQuery();

const [newDataAvailable,setNewDataAvailable] = React.useState(false)
const [savedData,setSavedData] = React.useState<MissionItemsQuery>()
const [load,setLoad] = React.useState(false);
const [err,setErr] = React.useState(false);


React.useEffect (()=>{

    if (loading) {
      setLoad(true)
    }
    else{
      setLoad(false)
    }
    
    if (error || !data) {
      setErr(true)
    }
    else{
      setErr(false)
    }

    if (data!== undefined && data!== null){
      if (data !== savedData){
        setNewDataAvailable(true)

      }
     
    }

    if (newDataAvailable){
      localStorage.setItem("Missions",JSON.stringify(data));
      setSavedData(data);
    }



},[loading,error,data])


let collection = localStorage.getItem('Missions');

  if (collection === null || collection === undefined){

    
    if (load) {

      return (

        <div>Loading...</div>
      )
    }

    if (err){

      return (

        <div>ERROR</div>
      )
    }


    setSavedData(data);
    localStorage.setItem("Missions",JSON.stringify(savedData));


      return (<MissionList data={savedData!} />);

  }

  else{

    let collection = localStorage.getItem('Missions');
    let jsonData = JSON.parse(collection!); 
    setSavedData(jsonData);

    
    if (!newDataAvailable){
      return (<MissionList data={savedData!} />);
    }
    else{
      alert("New Data Available, please refresh your page")
      setNewDataAvailable(false);
      return(
      
        <MissionList data={savedData!} />
    
      )

      
    }
  

  }




};

export default MissionListContainer;

*/