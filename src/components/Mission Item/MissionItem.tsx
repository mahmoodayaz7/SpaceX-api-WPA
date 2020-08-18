import  React from 'react';
import Table from 'react-bootstrap/Table';

interface Props {
    data: {

      mission_id:string
      mission_name:string
      manufacturers:string[]
      description:string
      wikipedia:string | null
      website:string | null
      twitter:string | null
      

    }
  }
  


const RocketItem: React.FC<Props> = ({ data }) => {

 
  


  console.log(data);

return(
  

    <div data-testid = "mission" >
  <h1 className = "launchHeading"  >{data?.mission_name?.replace(/_/gi, " ")}</h1>
  <h3   className = "launchDes" >{data?.description?.replace(/-/gi, " ")}</h3>
 
  <Table striped bordered hover variant="dark">
  <thead className = "tableHeader" >
    <tr>
      <th>Specifications</th>
      <th>Details</th>
    </tr>
  </thead>

  <tbody className = "tableBody" >  

 { 



!!data && 
Object.entries(data).map((entry,i) => {

 if (entry[0] !== "__typename" && entry[0] !== "mission_name" && entry[0] !== "mission_id" && entry[0] !== "description"){


   
    if (entry[1] === null){

      entry[1] = "NA"
      
    }


    if (entry[0] === "manufacturers"){


          
      return(


        <tr   key = {i} >
        <td> {entry[0].replace(/_/gi, " ")} </td>
        <td> 
        {
           !!entry[1] && Object.values(entry[1]).map((mission,k) => {
              return (


                <li key = {k}>   {mission}   </li>
              )


           })
        }  
        </td>
        </tr>
      

      )

        
 
    }



/*
    if ((entry[0] === "wikipedia" || entry[0] === "website" || entry[0] === "twitter") && entry[1] !== "N/A"  ){



      return (


        <tr key = {i} >
        <td> {entry[0].replace(/_/gi, " ")} </td>
        <td> {entry[1]} </td>
        </tr>
      
      )


    }
*/

return (

/*
  <tr key = {i} >
  <td> {entry[0].replace(/_/gi, " ")} </td>
  <td> {entry[1]} </td>
  </tr>

  */




 <tr   key = {i} >
 <td> {entry[0].replace(/_/gi, " ")} </td>
 <td> {((entry[0] === "wikipedia" || entry[0] === "website" || entry[0] === "twitter") && entry[1] !== "NA")? <a href={entry[1].toString()}>link</a>: entry[1] } </td>
 </tr>


)


}

return (

 null

)

}

)
  
}


</tbody>
</Table>

    </div>
  
)

}



export default RocketItem;


