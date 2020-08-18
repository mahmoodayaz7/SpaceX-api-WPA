import gql from 'graphql-tag';

export const QUERY_INFO = gql`
query InfoItems {
  info{
   
   name
   founder
   founded
   employees
   vehicles
   launch_sites
   test_sites
   ceo
   cto
   coo
   valuation
   headquarters{
     address
     city
     state
   }
   summary
 }
 }
`;
