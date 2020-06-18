import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import {IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";

import Mutations from "../../graphql/mutations";
const { ADD_GOD_DOMAIN } = Mutations;


class OtherDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      parents: this.props.parents || "",
      children: this.props.children || "",
      siblings: this.props.siblings || "",
      abode: this.props.abode || "",
      emblems: this.props.emblems || ""
    };

  }


  returnArrayElements(array){
    if(array){
      return array.map(ele => (
              <>
                <p id={ele.id}>{ele.name}</p>
              </>
      ));
    }
  }

  render() {
    const { parents, children, siblings, emblems, abode } = this.state;
    console.log(this.state)
    return (
      <div>
      <h3>Parents:</h3>
      {this.returnArrayElements(parents)}

      <h3>Children:</h3>
      {this.returnArrayElements(children)}

      <h3>Siblings:</h3>
      {this.returnArrayElements(siblings)}

      <h3>Emblems:</h3>
      {this.returnArrayElements(emblems)}

      <h3>Abode:</h3>
      {abode.name}
      </div>

    )

  }
}

export default OtherDetails;
