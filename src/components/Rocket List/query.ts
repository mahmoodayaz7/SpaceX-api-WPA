import gql from 'graphql-tag';

/*
export const QUERY_ROCKET_LIST = gql`
 query RocketList {
    rockets {
      id
      active
      boosters
      first_flight
      country
      rocket_name
      rocket_type
      rocket_id
    }
  }
`;


*/
export const QUERY_ROCKET_LIST = gql`
query RocketItems {
    rockets {
      rocket_id
      rocket_name
    	rocket_type
    	description
    	active
    	engines{
        number
        type
        version
      }
      mass{
        kg
      }
    	company
    	boosters
    	stages
      first_flight
      country
      cost_per_launch
  		success_rate_pct
    	flickr_images
  }
}`;