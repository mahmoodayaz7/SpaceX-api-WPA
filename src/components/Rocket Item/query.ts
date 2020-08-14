import gql from 'graphql-tag';

export const QUERY_ROCKET_LIST = gql`
query RocketItem($id:String!) {
    rocket(id:$id) {
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