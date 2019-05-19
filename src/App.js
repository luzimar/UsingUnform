import React, { Component, Fragment } from "react";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Custom invalid email message")
    .required("Custom required message"),
  name: Yup.string().required()
});

export default class App extends Component {
  state = {
    protocol: "",
    email: "",
    handleMessage: ""
  };
  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleSubscribe = () => {
    if (localStorage.getItem("email") === this.state.email) {
      this.setState({
        handleMessage: "Email has already been subscribed"
      });
    } else {
      localStorage.setItem("email", this.state.email);
      console.log(localStorage.getItem("email"));
      this.setState({
        protocol: (Math.floor(Math.random() * 100000) + 100).toString()
      });
    }
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <Form schema={schema} onSubmit={this.handleSubscribe}>
            <img
              src="https://www.sportsmediawatch.com/wp-content/uploads/2018/06/nbadraft.png"
              height="200"
              width="300"
            />
            {this.state.protocol === "" ? (
              <Fragment>
                <h1 className="handle-message">{this.state.handleMessage}</h1>
                <Input name="name" placeholder="Name" />
                <Input
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
                <button type="submit">Subscribe</button>
              </Fragment>
            ) : (
              <Fragment>
                <p>
                  Subscribed successfully
                  <br />
                  Protocol: {this.state.protocol}
                </p>
              </Fragment>
            )}
          </Form>
        </div>
      </Fragment>
    );
  }
}
