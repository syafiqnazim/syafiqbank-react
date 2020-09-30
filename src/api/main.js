import axios from "axios";

const baseURL = "http://localhost:8080";

const req = axios.create({
  baseURL: "http://localhost:8080",
});

function apiErrorHandler(error) {
  if (error.response) {
    return [Number(error.response.status), error.response.data.error];
  } else {
    return [500, "Something went wrong. Please try again."];
  }
}

// all CUSTOMERS CRUD start
async function getAllCustomers() {
  try {
    let response = await req.get("/customers");
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}
// all CUSTOMERS CRUD end

// each CUSTOMER CRUD start
async function addCustomer(name) {
  try {
    let response = await req.post("/customer", {
      name,
    });
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}

async function getCustomer(id) {
  try {
    let response = await req.get("/customer/" + id);
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}

async function editCustomer(id, name) {
  try {
    let response = await req.put("/customer", {
      id,
      name,
    });
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}

async function deleteCustomer(id) {
  try {
    let response = await req.delete("/customer/" + id);
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}
// each CUSTOMER CRUD end

// all ACCOUNTS CRUD start

async function getAccountsById(id) {
  try {
    let response = await req.get("/accounts/" + id);
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}

// all ACCOUNTS CRUD end

// each ACCOUNT CRUD start

async function addAccount(accountType, accountStatus, customerId) {
  try {
    let response = await req.post("/account", {
      accountType,
      accountStatus,
      customerId,
    });
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}

async function getAccount(accountNumber) {
  try {
    let response = await req.get("/account/" + accountNumber);
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}
async function editAccount(
  accountNumber,
  accountType,
  accountStatus,
  customerId
) {
  try {
    let response = await req.post("/account", {
      accountNumber,
      accountType,
      accountStatus,
      customerId,
    });
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}
async function deleteAccount(accountNumber) {
  try {
    let response = await req.delete("/account/" + accountNumber);
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}

// each ACCOUNT CRUD end

// all TRANSACTIONS CRUD start

async function getTransactionsByAccountNumber(accountNumber) {
  try {
    let response = await req.get("/transactions/" + accountNumber);
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}

// all TRANSACTIONS CRUD end

// each TRANSACTION CRUD start

async function addTransaction(transactionType, accountNumber, amount) {
  try {
    let response = await req.post("/transaction", {
      transactionType,
      accountNumber,
      amount,
    });
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}

async function getTransaction(accountNumber) {
  try {
    let response = await req.get("/transaction/" + accountNumber);
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
}

// each TRANSACTION CRUD end

export default {
  // all CUSTOMERS CRUD
  getAllCustomers,

  // each CUSTOMER CRUD
  addCustomer,
  getCustomer,
  editCustomer,
  deleteCustomer,

  // all ACCOUNTS CRUD
  getAccountsById,

  // each ACCOUNT CRUD
  addAccount,
  getAccount,
  editAccount,
  deleteAccount,

  // all TRANSACTIONS CRUD
  getTransactionsByAccountNumber,

  // all TRANSACTION CRUD
  addTransaction,
  getTransaction,
};
