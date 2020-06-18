import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import {IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";

import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_TYPE } = Mutations;


class TypeDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      type: this.props.type || ""
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e){
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field){
    return e => this.setState({ [field] : e.target.value });
  }

  render() {
    if(this.state.editing){
      return (
        <Mutation mutation={UPDATE_GOD_TYPE}>
        {(updateGodType, data) => (
          <div>
          <form
          onSubmit={e => {
            e.preventDefault();
            updateGodType({
              variables: { id: this.props.id, type: this.state.type }
            }).then(() => this.setState({ editing: false }));
          }}
          >
          <input
            value={this.state.type}
            onChange={this.fieldUpdate("type")}
          />
          <button type="submit">Update Type</button>
          </form>
          </div>
        )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <div
            onClick={this.handleEdit}
            style={{ fontSize: "10px", cursor: "pointer", display: "inline"}}
            >
            <IconContext.Provider value={{ className: "custom-icon"}}>
              <FaPencilAlt />
            </IconContext.Provider>
          </div>
          <h2>{this.state.type}</h2>
        </div>
      );
    }
  }
}

export default TypeDetail;
