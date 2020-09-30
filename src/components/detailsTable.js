import React from "react";
import { Link } from "react-router-dom";

import { Table } from "semantic-ui-react";

export default class DetailsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: this.props.data.length,
    };
  }

  componentDidMount() {}

  capitalizeFirstLetter(string) {
    if (typeof string === "string") {
      const array = string.split(" ");
      const newArray = [];

      for (var x = 0; x < array.length; x++) {
        newArray.push(array[x].charAt(0).toUpperCase() + array[x].slice(1));
      }
      return newArray.join(" ");
    }
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: "#29487D",
          margin: "0px auto",
          width: "80%",
        }}
      >
        <div
          style={{
            padding: 20,
            margin: "auto",
          }}
        >
          <p
            style={{
              color: "#A3A4A7",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            {`${this.props.data.length} entries`}
          </p>
          <Table
            style={{
              background: "transparent",
              border: "1px solid #FFFFFF2B",
              borderRadius: 0,
            }}
          >
            <Table.Header>
              <Table.Row>
                {this.props.headers.map((data, i) => {
                  return (
                    <Table.HeaderCell
                      style={{
                        background: "transparent",
                        color: "white",
                        width: (100 / this.props.rows) * 100,
                      }}
                      key={i}
                    >
                      {this.capitalizeFirstLetter(
                        data.replace(/([A-Z])/g, " $1").trim()
                      )}
                    </Table.HeaderCell>
                  );
                })}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.data && this.props.data.length > 0 ? (
                this.props.data.map((data, i) => {
                  let cellData = [];
                  let count = 0;
                  for (let header of this.props.headers) {
                    if (header.includes("viewAccount(s)")) {
                      cellData.push(
                        <Table.Cell
                          style={{ textAlign: "center" }}
                          key={count + i}
                        >
                          <Link
                            to={{
                              pathname: "/accounts",
                              state: data.customersId,
                            }}
                          >
                            <button style={{ padding: "8px 10px" }}>
                              View
                            </button>
                          </Link>
                        </Table.Cell>
                      );
                    } else if (header.includes("editProfile")) {
                      cellData.push(
                        <Table.Cell
                          style={{ textAlign: "center" }}
                          key={count + i}
                        >
                          <Link
                            to={{
                              pathname: "/editprofile",
                              state: data.customersId,
                            }}
                          >
                            <button style={{ padding: "8px 10px" }}>
                              Edit
                            </button>
                          </Link>
                        </Table.Cell>
                      );
                    } else if (header.includes("deleteProfile")) {
                      cellData.push(
                        <Table.Cell
                          style={{ textAlign: "center" }}
                          key={count + i}
                        >
                          <button
                            style={{ padding: "8px 10px" }}
                            onClick={() =>
                              this.props.deleteCustomer(data.customersId)
                            }
                          >
                            Delete
                          </button>
                        </Table.Cell>
                      );
                    } else if (header.includes("editAccount")) {
                      cellData.push(
                        <Table.Cell
                          style={{ textAlign: "center" }}
                          key={count + i}
                        >
                          <Link
                            to={{
                              pathname: "/editaccount",
                              state: {
                                accountNumber: data.accountNumber,
                                customersId: data.customersId,
                              },
                            }}
                          >
                            <button style={{ padding: "8px 10px" }}>
                              Edit
                            </button>
                          </Link>
                        </Table.Cell>
                      );
                    } else if (header.includes("deleteAccount")) {
                      cellData.push(
                        <Table.Cell
                          style={{ textAlign: "center" }}
                          key={count + i}
                        >
                          <button
                            style={{ padding: "8px 10px" }}
                            onClick={() => {
                              this.props.deleteAccount(data.accountNumber);
                            }}
                          >
                            Delete
                          </button>
                        </Table.Cell>
                      );
                    } else if (header.includes("allTransactions")) {
                      cellData.push(
                        <Table.Cell
                          style={{ textAlign: "center" }}
                          key={count + i}
                        >
                          <Link
                            to={{
                              pathname: "/transactions",
                              state: data.accountNumber,
                            }}
                          >
                            <button style={{ padding: "8px 10px" }}>
                              Transactions
                            </button>
                          </Link>
                        </Table.Cell>
                      );
                    } else {
                      cellData.push(
                        <Table.Cell
                          style={{ textAlign: "center" }}
                          key={count + i}
                        >
                          {data[header]}
                        </Table.Cell>
                      );
                    }
                    count++;
                  }
                  return (
                    <Table.Row
                      style={{
                        color: "#FFFFFF",
                        backgroundColor:
                          i % 2 === 0 ? "rgba(255, 255, 255, 0.1)" : "none",
                      }}
                      key={i}
                    >
                      {cellData}
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell
                    style={{
                      color: "white",
                      paddingTop: 20,
                      paddingBottom: 20,
                    }}
                  >
                    No data available.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}
