import React, { Component } from "react";
import { Link } from "react-router-dom";
import DetailsTable from "../components/detailsTable";

import main from "../api/main";
import utils from "../lib/utils";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    await this.getAllCustomers();
  }

  getAllCustomers = async () => {
    try {
      let response = await main.getAllCustomers();
      let data = response.data.map((data) => {
        const newDate = new Date(data.createdAt);
        var date = newDate.toLocaleDateString();
        var time = newDate.toLocaleTimeString();
        const actual = date + " " + utils.tConvert(time);
        return {
          customersId: data.id,
          customersName: data.name,
          createdAt: actual,
        };
      });
      this.setState({ data });
    } catch (error) {
      alert(error);
    }
  };

  deleteCustomer = async (id) => {
    try {
      let response = await main.deleteCustomer(id);
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
        <h1>Welcome to Syafiqbank</h1>
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <Link to="/addcustomer">
            <button style={{ padding: "8px 10px" }}>Add Customer</button>
          </Link>
        </div>
        <DetailsTable
          data={this.state.data}
          headers={[
            "customersId",
            "customersName",
            "createdAt",
            "viewAccount(s)",
            "editProfile",
            "deleteProfile",
          ]}
          rows={6}
          deleteCustomer={this.deleteCustomer}
        />
      </div>
    );
  }
}
