import React, { Component } from "react";
import DetailsTable from "../components/detailsTable";
import { Link } from "react-router-dom";

import main from "../api/main";
import utils from "../lib/utils";

export default class AccountsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      customersId: this.props.location.state,
    };
  }

  async componentDidMount() {
    await this.getAccountsById();
  }

  getAccountsById = async () => {
    try {
      let response = await main.getAccountsById(this.state.customersId);

      if (response.status === 200) {
        let data = response.data.map((data) => {
          const newDate = new Date(data.createdAt);
          var date = newDate.toLocaleDateString();
          var time = newDate.toLocaleTimeString();
          const actual = date + " " + utils.tConvert(time);
          return {
            customersId: this.state.customersId,
            accountNumber: data.accountNumber,
            accountType: data.accountType,
            accountStatus: data.accountStatus,
            createdAt: actual,
          };
        });
        this.setState({ data });
      }
    } catch (error) {
      alert(error);
    }
  };

  deleteAccount = async (accountNumber) => {
    try {
      let response = await main.deleteAccount(accountNumber);
      if (response.status === 200) {
        alert(response.data);
        window.location.reload();
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
        <h1>
          These are all id {this.state.customersId} accounts with Syafiqbank
        </h1>
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <Link to={{ pathname: "/addaccount", state: this.state.customersId }}>
            <button style={{ padding: "8px 10px" }}>Add Account</button>
          </Link>
        </div>
        <DetailsTable
          data={this.state.data}
          headers={[
            "customersId",
            "accountNumber",
            "accountType",
            "accountStatus",
            "createdAt",
            "allTransactions",
            "editAccount",
            "deleteAccount",
          ]}
          rows={8}
          deleteAccount={this.deleteAccount}
        />
      </div>
    );
  }
}
