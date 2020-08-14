import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import swDev from './service worker/serviceRegister'


const client = new ApolloClient({
  uri: 'https://spacexdata.herokuapp.com/graphql',
});




ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


swDev();
