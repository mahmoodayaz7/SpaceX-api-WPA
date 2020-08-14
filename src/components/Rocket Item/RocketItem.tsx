import  React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

interface Props {
    data: {

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
  }
  


const RocketItem: React.FC<Props> = ({ data }) => {

  console.log(data);

return(
  

    <div data-testid = "Rocket" >
  <h1>{data?.rocket_name?.replace(/_/gi, " ")}</h1>
  <h3 >{data?.description?.replace(/-/gi, " ")}</h3>
  <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Specifications</th>
      <th>Details</th>
    </tr>
  </thead>

  <tbody>

 { 



!!data && 
Object.entries(data).map((entry,i) => {

  
 if (entry[0] !== "__typename" && entry[0] !== "description" && entry[0] !== "rocket_name" ){

 

  if (typeof entry[1] === "number" || typeof entry[1] === "string" || typeof entry[1] === "boolean"  ){
   


    if (typeof entry[1] === "boolean"){

    
    if (entry[1] === true){

      entry[1] = "yes";
    
    }

    if (entry[1] === false){

      entry[1] = "no";
    
    }

    } 


return (


  <tr key = {i} >
  <td> {entry[0].replace(/_/gi, " ")} </td>
  <td> {entry[1]} </td>
  </tr>

)
}

else{

if (entry[0] === "engines"){

return (

  <tr key = {i} >
  <td> {entry[0]}  </td>
  <td> Number: {data?.engines?.number}, Type: {data?.engines?.type}, Version: {data?.engines?.version}  </td>
  </tr>





)



}



if (entry[0] === "mass"){

  return (
  
    <tr key = {i} >
    <td> {entry[0]} </td>
    <td> {data?.mass?.kg} Kg </td>
    </tr>
  
  
  
  
  
  )
  
  
  
  }

}

}

return (

 null

)

}

)
  
}


</tbody>
</Table>

{!!data?.flickr_images && 
Object.entries(data?.flickr_images).map((img,k)=> {



return (



  <Image data-testid = "imgs" key = {k} src={img[1] ?img[1] : undefined } rounded />
   
  

   
)

})


}

    </div>
  
)

}



export default RocketItem;


