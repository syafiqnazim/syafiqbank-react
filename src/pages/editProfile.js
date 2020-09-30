import React, { Component } from "react";

import main from "../api/main";
import utils from "../lib/utils";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customersId: this.props.location.state,
      customersName: "",
      createdAt: "",
    };
  }

  async componentDidMount() {
    await this.getCustomer();
  }

  getCustomer = async () => {
    try {
      let response = await main.getCustomer(this.state.customersId);
      const newDate = new Date(response.data.createdAt);
      var date = newDate.toLocaleDateString();
      var time = newDate.toLocaleTimeString();
      const actual = date + " " + utils.tConvert(time);
      if (response.status === 200) {
        this.setState({
          customersName: response.data.name,
          createdAt: actual,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  editCustomer = async () => {
    try {
      if (this.state.customersName === "") {
        throw new Error("Please insert a name");
      }
      let response = await main.editCustomer(
        this.state.customersId,
        this.state.customersName
      );
      if (response.status === 200) {
        alert(`Successfully updated customer id ${this.state.customersId}`);
        window.history.back();
      }
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
        <h1>Edit profile for customer's id {this.state.customersId}</h1>
        <div style={{ backgroundColor: "#29487D", padding: "50px 150px" }}>
          <div>
            <p style={{ color: "white", marginTop: 0 }}>Customer's Id</p>
            <input
              readOnly
              type="text"
              autoCapitalize="none"
              style={{
                width: "100%",
                borderRadius: 2,
                border: "none",
                outline: "none",
                backgroundColor: "#FFFFFF27",
                color: "white",
                padding: 10,
              }}
              value={this.state.customersId}
            />
          </div>
          <div>
            <p style={{ color: "white" }}>Customer's Name</p>
            <input
              type="text"
              autoCapitalize="none"
              style={{
                width: "100%",
                borderRadius: 2,
                border: "none",
                outline: "none",
                backgroundColor: "#FFFFFF27",
                color: "white",
                padding: 10,
              }}
              value={this.state.customersName}
              onChange={(event) =>
                this.setState({ customersName: event.target.value })
              }
            />
          </div>
          <div>
            <p style={{ color: "white" }}>Created At</p>
            <input
              readOnly
              type="text"
              autoCapitalize="none"
              style={{
                width: "100%",
                borderRadius: 2,
                border: "none",
                outline: "none",
                backgroundColor: "#FFFFFF27",
                color: "white",
                padding: 10,
              }}
              value={this.state.createdAt}
            />
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button style={{ padding: "8px 10px" }} onClick={this.editCustomer}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
