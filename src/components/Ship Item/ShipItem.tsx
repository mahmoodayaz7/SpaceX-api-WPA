import  React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import no_img from './images/no_image_available.jpg';


interface Props {
    data: {

      ship_id:string
      ship_name:string
      ship_model: string | null
      ship_type: string
      roles: string[]
      active: boolean
      year_built:number
      successful_landings: number | null
      attempted_landings: number | null
      image: string | null

    }
  }
  


const ShipItem: React.FC<Props> = ({ data }) => {

 
  


  console.log(data);

return(
  

    <div data-testid = "Ship" >
  <h1 className = "launchHeading" >{data?.ship_name?.replace(/_/gi, " ")}</h1>
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

 if (entry[0] !== "__typename" && entry[0] !== "ship_name" &&  entry[0] !== "image" && entry[0] !== "ship_id"){


   
    if (entry[1] === null){

      entry[1] = "NA"
    }


    if (typeof entry[1] === "boolean"){

    
    if (entry[1] === true){

      entry[1] = "yes";
    
    }

    if (entry[1] === false){

      entry[1] = "no";
    
    }

    } 


    if (entry[0] === "roles"){

       

          
      return(


        <tr key = {i} >
        <td> {entry[0].replace(/_/gi, " ")} </td>
        <td> 
        {
           !!entry[1] && Object.values(entry[1]).map((role,k) => {
              return (


                <li key = {k}>  {role}   </li>
              )


           })
        }  
        </td>
        </tr>
      

      )

        
 
    }


return (


  <tr key = {i} >
  <td> {entry[0].replace(/_/gi, " ")} </td>
  <td> {entry[1]} </td>
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



  <Image className = {data.image ? "itemImgs" : "errorImg"}  data-testid = "imgs" src={data.image ?data.image : no_img } onError={(e:React.ChangeEvent<any>)=>{e.target.onerror = null; e.target.src=no_img; e.target.className = "errorImg" }} rounded />
   
  



    </div>
  
)

}



export default ShipItem;


