import React, { Component } from "react";

import main from "../api/main";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  addCustomer = async () => {
    try {
      if (this.state.name === "") {
        throw new Error("Please select a valid input");
      }
      let response = await main.addCustomer(this.state.name);
      if (response.status === 200) {
        alert(`Successfully added ${response.data.name}`);
      }
      window.history.back();
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Create a new account</h1>
        <div style={{ backgroundColor: "#29487D", padding: "50px 150px" }}>
          <div>
            <p style={{ color: "white", marginTop: 0 }}>
              Insert customer's name
            </p>
            <input
              type="text"
              style={{
                width: "100%",
                borderRadius: 2,
                border: "none",
                outline: "none",
                backgroundColor: "#FFFFFF27",
                color: "white",
                padding: 10,
              }}
              value={this.state.name}
              onChange={(event) => {
                this.setState({ name: event.target.value });
              }}
            />
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button style={{ padding: "8px 10px" }} onClick={this.addCustomer}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
