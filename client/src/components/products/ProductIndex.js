import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import Queries from "../../graphql/queries";
const {FETCH_PRODUCTS} = Queries;
import ProductDetail from "./ProductDetail";

const ProductIndex = () => {

  return (
    <Query query={FETCH_PRODUCTS}>
      {({ loading, error, data}) => {
        if(loading) return "Loading";
        if(error) return `Error! ${error.message}`;

        return (
          <ul>
            {data.products.map(({_id, name, description }) => (
              <li key={_id}>
                <Link to={`/products/${_id}`}>
                  <h4>{name}</h4>
                </Link>
                <p className="description">Description: {description}</p>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>

  );
};

export default ProductIndex;
