import React, { Component } from "react";

import main from "../api/main";

export default class AddAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAccountType: "",
      accountStatus: "Active",
      accountTypes: ["Saving", "Current"],
      customersId: this.props.location.state,
    };
  }

  componentDidMount() {}

  submitHandler = async () => {
    try {
      if (
        this.state.selectedAccountType === "default" ||
        this.state.selectedAccountType === ""
      ) {
        throw new Error("Please select account type");
      }
      let response = await main.addAccount(
        this.state.selectedAccountType,
        this.state.accountStatus,
        this.state.customersId
      );
      if (response.status === 200) {
        alert(
          `Successfully created account number ${response.data.accountNumber}`
        );
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
            <p style={{ color: "white", marginTop: 0 }}>Customer's Id</p>
            <input
              readOnly
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
              value={this.state.customersId}
            />
          </div>
          <div>
            <p style={{ color: "white" }}>Account Type</p>
            <select
              id="bank-name"
              name="bank-name"
              style={{
                height: 36,
                width: "100%",
                borderRadius: 2,
                border: "none",
                outline: "none",
                backgroundColor: "#FFFFFF27",
                color: "white",
                padding: 10,
              }}
              onChange={(event) => {
                this.setState({ selectedAccountType: event.target.value });
              }}
            >
              <option value="default">Choose Account Type</option>
              {this.state.accountTypes.map((data, i) => {
                return (
                  <option
                    key={i}
                    value={data}
                    selected={
                      data === this.state.selectedAccountType ? true : null
                    }
                  >
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              style={{ padding: "8px 10px" }}
              onClick={this.submitHandler}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
