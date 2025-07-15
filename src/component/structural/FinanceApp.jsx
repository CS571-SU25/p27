import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router";

import FinanceLayout from "./FinanceLayout.jsx";
import FinanceLogin from "../auth/FinanceLogin.jsx";
import FinanceRegister from "../auth/FinanceRegister.jsx";
import FinanceLogout from "../auth/FinanceLogout.jsx";
import Dashboard from "../content/Dashboard.jsx";
import AccountManager from "../content/AccountManager.jsx";
import TransactionList from "../content/TransactionList.jsx";
import FinanceNoMatch from "../content/FinanceNoMatch.jsx";




export default function FinanceApp() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<FinanceLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/login" element={<FinanceLogin />} />
          <Route path="/register" element={<FinanceRegister />} />
          <Route path="/accounts" element={<AccountManager />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/logout" element={<FinanceLogout />} />
          <Route path="*" element={<FinanceNoMatch />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}