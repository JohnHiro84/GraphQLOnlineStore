import React from 'react';
import ReactDOM from 'react-dom';
import App from "./src/components/App";
import { HashRouter } from "react-router-dom";


//using ApolloClient from boost not apollo-client
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import {ApolloProvider} from "react-apollo";


import Mutations from "./src/graphql/mutations";
const { VERIFY_USER } = Mutations;


// import { onError } from "apollo-link-error";

// import { createHttpLink } from "apollo-link-http";
//used to help carry data b/w two servers
// import { ApolloLink } from "apollo-link";

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null
});


const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
  headers: {
    authorization: localStorage.getItem("auth-token")
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});


const token = localStorage.getItem("auth-token");

cache.writeData({
  data: {
    isLoggedIn: Boolean(token)
  }
});

if(token){
  client
  .mutate({ mutation: VERIFY_USER, variables: { token } })
  .then(({ data }) => {
    cache.writeData({
      data: {
        isLoggedIn: data.verifyUser.loggedIn
      }
    });
  });
}

const Root = () => {

  return (
      <ApolloProvider client={client}>
        <HashRouter>
          <App />
        </HashRouter>
      </ApolloProvider>
  );
};



ReactDOM.render(<Root />, document.querySelector('#root'));
