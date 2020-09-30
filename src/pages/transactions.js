import React, { Component } from "react";
import { Link } from "react-router-dom";
import DetailsTable from "../components/detailsTable";

import main from "../api/main";
import utils from "../lib/utils";

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: this.props.location.state,
      data: [],
    };
  }

  async componentDidMount() {
    await this.getAllTransactions();
  }

  getAllTransactions = async () => {
    try {
      let response = await main.getTransactionsByAccountNumber(
        this.state.accountNumber
      );
      console.log("response", response);
      if (response.status === 200) {
        let data = response.data.map((data) => {
          const newDate = new Date(data.createdAt);
          var date = newDate.toLocaleDateString();
          var time = newDate.toLocaleTimeString();
          const actual = date + " " + utils.tConvert(time);
          return {
            transactionType: data.transactionType,
            accountNumber: data.accountNumber,
            amount: data.amount,
            createdAt: actual,
          };
        });
        this.setState({ data });
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
        <h1>All transactions for account number {this.state.accountNumber} </h1>
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <Link
            to={{
              pathname: "/addtransaction",
              state: this.state.accountNumber,
            }}
          >
            <button style={{ padding: "8px 10px" }}>Add transaction</button>
          </Link>
        </div>
        <DetailsTable
          data={this.state.data}
          headers={["transactionType", "accountNumber", "amount", "createdAt"]}
          rows={4}
        />
      </div>
    );
  }
}
