import gql from 'graphql-tag';

export const QUERY_MISSION_LIST = gql`
query MissionItems {
  missions{
    mission_id
    mission_name
    manufacturers
    description
    wikipedia
    website
    twitter
    
    
    }
}
`;
