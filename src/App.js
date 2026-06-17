import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Homelayer from "./layouts/Homelayer";
import LoanProducts from "./pages/loans/loan-products/LoanProducts";
import AddLoanProduct from "./pages/loans/loan-products/AddLoanProduct";
import LoanProduct from "./pages/loans/loan-products/LoanProduct";
import EditLoanProduct from "./pages/loans/loan-products/EditLoanProduct";
import LoanApplications from "./pages/loans/loan-applications/LoanApplications";
import LoanApplication from "./pages/loans/loan-applications/LoanApplication";
import AllLoans from "./pages/loans/all-loans/AllLoans";
import Loan from "./pages/loans/all-loans/Loan";
import AllUsers from "./pages/users/AllUsers";
import AdminUser from "./pages/users/AdminUser";
import AddAdminUser from "./pages/users/AddUser";
import Roles from "./pages/users/Roles";
import AccountTransactions from "./pages/transactions/account-transactions/AccountTransactions";
import LoanTransactions from "./pages/transactions/loan-transactions/LoanTransactions";
import Guarantors from "./pages/loans/guarantors/Guarantors";
import AllMembers from "./pages/members/AllMembers";
import MemberDetails from "./pages/members/Member";
import AccountDetails from "./pages/members/AccountDetails";
import Accounts from "./pages/portfolio-accounts/PortfolioAccounts";
import AdminLogin from "./pages/auth/Login";
import VerifyLogin from "./pages/auth/VerifyLogin";
import MemberAccounts from "./pages/portfolio-accounts/MemberAccounts";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Homelayer />}>
        <Route index path="dashboard" element={<Homepage />} />
        <Route path="loan-products" element={<LoanProducts />} />
        <Route path="add-loan-product" element={<AddLoanProduct />} />
        <Route path="edit-loan-product" element={<EditLoanProduct />} />
        <Route path="loan-product/:id" element={<LoanProduct />} />

        <Route path="loan-applications" element={<LoanApplications />} />
        <Route path="loan-applications/:id" element={<LoanApplication />} />

        <Route path="all-loans" element={<AllLoans />} />
        <Route path="all-loans/:id" element={<Loan />} />
        <Route path="guarantors" element={<Guarantors />} />

        <Route path="all-users" element={<AllUsers />} />
        <Route path="all-users/:id" element={<AdminUser />} />
        <Route path="add-admin-user" element={<AddAdminUser />} />
        <Route path="roles-permissions" element={<Roles />} />

        <Route path="account-transactions" element={<AccountTransactions />} />
        <Route path="loan-transactions" element={<LoanTransactions />} />

        <Route path="all-members" element={<AllMembers />} />
        <Route path="all-members/:id" element={<MemberDetails />} />
        <Route path="all-members/account/:id" element={<AccountDetails />} />

        <Route path="accounts" element={<Accounts />} />
        <Route path="accounts/:id" element={<MemberAccounts />} />
      </Route>

      <Route path="/" element={<AdminLogin />} />
      <Route path="auth/verify-login" element={<VerifyLogin />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
