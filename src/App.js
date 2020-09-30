import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homePage";
import AccountsPage from "./pages/accountsPage";
import EditAccount from "./pages/editAccount";
import EditProfile from "./pages/editProfile";
import AddTransaction from "./pages/addTransaction";
import Transactions from "./pages/transactions";
import AddCustomer from "./pages/addCustomer";
import AddAccount from "./pages/addAccount";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/accounts" component={AccountsPage} />
          <Route exact path="/editprofile" component={EditProfile} />
          <Route exact path="/editaccount" component={EditAccount} />
          <Route exact path="/transactions" component={Transactions} />
          <Route exact path="/addcustomer" component={AddCustomer} />
          <Route exact path="/addaccount" component={AddAccount} />
          <Route exact path="/addtransaction" component={AddTransaction} />
        </Switch>
      </Router>
    );
  }
}
