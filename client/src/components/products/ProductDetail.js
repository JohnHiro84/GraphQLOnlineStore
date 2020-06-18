import React, { Component } from "react";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_PRODUCT } = Queries;

import gql from "graphql-tag";
// import NameDetail from "../detail/NameDetail";
// import TypeDetail from "../detail/TypeDetail";
// import DescriptionDetail from "../detail/DescriptionDetail";
// import DomainDetail from "../detail/DomainDetail";
// import OtherDetails from "../detail/OtherDetails";


const ProductDetail = (props) => {

    return (
      <Query query={FETCH_PRODUCT} variables={{id: props.match.params.id }}>
      {({ loading, error, data}) => {
        if(loading) return <p>Loading...</p>;
        if(error) return <p>{error}</p>;
        console.log(data);
        return (
                <div className="detail">
                  <li>{data.product.name} - {data.product.description} - {data.product.weight}</li>
                </div>
              );
      }}
      </Query>
    );
}

export default ProductDetail;
