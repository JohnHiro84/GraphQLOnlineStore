import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ProductIndex from "./products/ProductIndex";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AuthRoute from "../util/route_util";
import Nav from "./Nav";
import ProductDetail from "./products/ProductDetail";
import CreateProduct from "./products/CreateProduct";

const App = () => {
  return (
    <div>
      <h1>Online Store</h1>
      <Route path="/" component={Nav} />

      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <Route exact path="/" component={ProductIndex}/>
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route exact path="/new" component={CreateProduct} />

      </Switch>
    </div>
  )
};

export default App;


// <AuthRoute path="/" component={Nav} routeType="auth" />

//
// import {Route, Switch } from "react-router-dom";
// import GodsList from "./gods/GodsList";
// import GodCreate from "./create/GodCreate";
// import EmblemCreate from "./create/EmblemCreate";
// import AbodeCreate from "./create/AbodeCreate";
// import Create from "./create/Create";
// import Nav from "./Nav";
// import GodDetail from "./gods/GodDetail";

//
// const App = () => {
//   return (
//     <div>
//       <Nav />
//       <Switch>
//       <Route exact path="/" component={GodsList} />
//       <Route exact path="/godCreate" component={GodCreate} />
//       <Route exact path="/emblemCreate" component={EmblemCreate} />
//       <Route exact path="/abodeCreate" component={AbodeCreate} />
//       <Route exact path="/new" component={Create} />
//       <Route exact path="/gods/:id" component={GodDetail} />
//       </Switch>
//     </div>
//   );
// };
//
//
