import React, { Component } from "react";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_GOD } = Queries;

import gql from "graphql-tag";
import NameDetail from "../detail/NameDetail";
import TypeDetail from "../detail/TypeDetail";
import DescriptionDetail from "../detail/DescriptionDetail";
import DomainDetail from "../detail/DomainDetail";
import OtherDetails from "../detail/OtherDetails";


const GodDetail = (props) => {

    return (
      <Query query={FETCH_GOD} variables={{id: props.match.params.id }}>
      {({ loading, error, data}) => {
        if(loading) return <p>Loading...</p>;
        if(error) return <p>{error}</p>;
        console.log(data);
        return (
                <div className="detail">
                  <NameDetail id={data.god.id} name={data.god.name} />
                  <TypeDetail id={data.god.id} type={data.god.type} />
                  <DescriptionDetail id={data.god.id} description={data.god.description} />
                  <DomainDetail id={data.god.id} domains={data.god.domains} />
                  <OtherDetails
                    parents={data.god.parents}
                    siblings={data.god.siblings}
                    abode={data.god.abode}
                    children={data.god.children}
                    emblems={data.god.emblems}
                  />
                </div>
              );
      }}
      </Query>
    );
}

export default GodDetail;
