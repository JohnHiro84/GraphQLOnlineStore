import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import {IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";

import Mutations from "../../graphql/mutations";
const { ADD_GOD_DOMAIN } = Mutations;

import Queries from "../../graphql/queries";
const { FETCH_GOD } = Queries;

import DeleteDomain from "./DeleteDomain";

class DomainDetain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      domains: this.props.domains || "",
      domain: ""
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.renderDomains = this.renderDomains.bind(this);
    this.domainsUpdate = this.domainsUpdate.bind(this);

  }

  handleEdit(e){
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field){
    return e => this.setState({ [field] : e.target.value });
  }

  domainsUpdate(value){
    this.setState({ domains: value });
  }

  renderDomains(){
    if(this.state.domains){

      let domains = this.state.domains.map(domain => (
          <>
            <p>{domain}</p>
            <DeleteDomain id={this.props.id} domain={domain} domainsUpdate={this.domainsUpdate.bind(this)} />
            </>
      ));
      return (
        <>
        <h4>Add Domain</h4>
        <div>
        {domains}
        </div>
        </>
      )
    } else {
      return "";
    }
  }

  updateCache(cache, data){

    let domains = data.data.addGodDomain.domains;
    // console.log(domains);
    this.setState({ domains: domains});

  }

  render() {
    // console.log(this.state.domains);
    if(this.state.editing){
      return (
        <Mutation mutation={ADD_GOD_DOMAIN} update={(cache, data) => this.updateCache(cache, data)}>
        {(updateGodDomain, data) => (
          <div>
          <form
          onSubmit={e => {
            e.preventDefault();
            updateGodDomain({
              variables: { id: this.props.id, domain: this.state.domain }
            }).then(() => this.setState({ editing: false }));
          }}
          >
          <input
            value={this.state.domain}
            onChange={this.fieldUpdate("domain")}
          />
          <button type="submit">Update Domain</button>
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
          {this.renderDomains()}
        </div>
      );
    }
  }
}

export default DomainDetain;
