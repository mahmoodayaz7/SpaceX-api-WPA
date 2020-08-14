import gql from 'graphql-tag';



export const QUERY_LAUNCH_LIST = gql`
query launchList {
  launches {
    flight_number
    mission_name
    launch_year
    details
    links{
      flickr_images
    }
    
}
}
`;
