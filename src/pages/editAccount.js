import React, { Component } from "react";
import main from "../api/main";
import utils from "../lib/utils";

export default class EditAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customersId: this.props.location.state.customersId,
      accountNumber: this.props.location.state.accountNumber,
      selectedAccountType: "",
      selectedAccountStatus: "",
      createdAt: "",
      accountTypes: ["Saving", "Current"],
      accountStatuses: ["Active", "Closed"],
    };
  }

  async componentDidMount() {
    await this.getAccount();
  }

  getAccount = async () => {
    try {
      let response = await main.getAccount(this.state.accountNumber);
      const newDate = new Date(response.data.createdAt);
      var date = newDate.toLocaleDateString();
      var time = newDate.toLocaleTimeString();
      const actual = date + " " + utils.tConvert(time);
      if (response.status === 200) {
        this.setState({
          selectedAccountType: response.data.accountType,
          selectedAccountStatus: response.data.accountStatus,
          createdAt: actual,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  editAccount = async () => {
    try {
      if (
        this.state.selectedAccountStatus === "default" ||
        this.state.selectedAccountType === "default" ||
        this.state.selectedAccountStatus === "" ||
        this.state.selectedAccountType === ""
      ) {
        throw new Error("Please select a valid input");
      }
      let response = await main.editAccount(
        this.state.accountNumber,
        this.state.selectedAccountType,
        this.state.selectedAccountStatus,
        this.state.customersId
      );
      if (response.status === 200) {
        alert(`Successfully updated account id ${this.state.accountNumber}`);
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
        <h1>Edit account for account number {this.state.accountNumber}</h1>
        <div style={{ backgroundColor: "#29487D", padding: "50px 150px" }}>
          <div>
            <p style={{ color: "white", marginTop: 0 }}>Account Number</p>
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
              value={this.state.accountNumber}
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
          <div>
            <p style={{ color: "white" }}>Account Status</p>
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
                this.setState({ selectedAccountStatus: event.target.value });
              }}
            >
              <option value="default" style={{ color: "black" }}>
                Choose Account Status
              </option>
              {this.state.accountStatuses.map((data, i) => {
                return (
                  <option
                    style={{ color: "black" }}
                    key={i}
                    value={data}
                    selected={
                      data === this.state.selectedAccountStatus ? true : null
                    }
                  >
                    {data}
                  </option>
                );
              })}
            </select>
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
            <button style={{ padding: "8px 10px" }} onClick={this.editAccount}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
