import React, { Component } from "react";
import { Mutation } from "react-apollo";

// import gql from "graphql-tag";

import Mutations from "../graphql/mutations";
const { REGISTER} = Mutations;


class Register extends Component {
  constructor(props){
    super(props)
      this.state = {
        email: "",
        password: "",
        name: ""
      };
  }

  updateCache(client, {data}){
    console.log(data);

    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });

    console.log(".....")
    console.log(client);
  }

  update(field){
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
      {(registerUser) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              registerUser({
                variables: {
                  name: this.state.name,
                  email: this.state.email,
                  password: this.state.password
                }
              });
            }}
          >
            <input
              value={this.state.name}
              onChange={this.update("name")}
              placeholder="Name"
            />
            <input
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            <input
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />

            <button type="submit">Register</button>
          </form>
        </div>
      )}
      </Mutation>
    );
  }
}
export default Register;
