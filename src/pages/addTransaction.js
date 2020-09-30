import React, { Component } from "react";
import main from "../api/main";

export default class AddTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTransactionType: "",
      accountNumber: this.props.location.state,
      amount: "",
      transactionTypes: ["Withdraw", "Deposit"],
    };
  }

  componentDidMount() {}

  addTransaction = async () => {
    try {
      if (
        this.state.amount === "" ||
        this.state.selectedTransactionType === "" ||
        this.state.selectedTransactionType === "default"
      ) {
        throw new Error("Please select a valid input");
      }
      let response = await main.addTransaction(
        this.state.selectedTransactionType,
        this.state.accountNumber,
        this.state.amount
      );
      if (response.status === 200) {
        alert(
          `Successfully ${this.state.selectedTransactionType} account number ${response.data.accountNumber}`
        );
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
        <h1>Deposit money to account number {this.state.accountNumber} </h1>
        <div style={{ backgroundColor: "#29487D", padding: "50px 150px" }}>
          <div>
            <p style={{ color: "white" }}>Transaction Type</p>
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
                this.setState({ selectedTransactionType: event.target.value });
              }}
            >
              <option value="default">Choose Transaction Type</option>
              {this.state.transactionTypes.map((data, i) => {
                return (
                  <option
                    key={i}
                    value={data}
                    selected={
                      data === this.state.selectedTransactionType ? true : null
                    }
                  >
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <p style={{ color: "white" }}>Insert Amount</p>
            <input
              type="number"
              style={{
                width: "100%",
                borderRadius: 2,
                border: "none",
                outline: "none",
                backgroundColor: "#FFFFFF27",
                color: "white",
                padding: 10,
              }}
              value={this.state.amount}
              onChange={(event) => {
                this.setState({ amount: event.target.value });
              }}
            />
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              style={{ padding: "8px 10px" }}
              onClick={this.addTransaction}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
