import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Homelayer from "./layouts/Homelayer";
import LoanProducts from "./pages/loan-products/LoanProducts";
import AddLoanProduct from "./pages/loan-products/AddLoanProduct";
import LoanProduct from "./pages/loan-products/LoanProduct";
import EditLoanProduct from "./pages/loan-products/EditLoanProduct";
import LoanApplications from "./pages/loan-applications/applications/LoanApplications";
import LoanApplication from "./pages/loan-applications/applications/LoanApplication";
import AllLoans from "./pages/loans/all-loans/AllLoans";
import Loan from "./pages/loans/all-loans/Loan";
import AllUsers from "./pages/users/AllUsers";
import AdminUser from "./pages/users/AdminUser";
import AddAdminUser from "./pages/users/AddUser";
import Roles from "./pages/roles/Roles";
import AccountTransactions from "./pages/transactions/account-transactions/AccountTransactions";
import LoanTransactions from "./pages/transactions/loan-transactions/LoanTransactions";
import Guarantors from "./pages/guarantors/Guarantors";
import AllMembers from "./pages/members/AllMembers";
import MemberDetails from "./pages/members/Member";
import AccountDetails from "./pages/members/AccountDetails";
import Accounts from "./pages/portfolio-accounts/PortfolioAccounts";
import AdminLogin from "./pages/auth/Login";
import VerifyLogin from "./pages/auth/VerifyLogin";
import MemberAccounts from "./pages/portfolio-accounts/MemberAccounts";
import MemberLogin from "./pages/auth-member/MemberLogin";
import VerifyMemberLogin from "./pages/auth-member/VerifyMemberLogin";
import MemberCreateAccess from "./pages/auth-member/CreateAccess";
import MemberAcceptTerms from "./pages/auth-member/AcceptTerms";
import ApplyProducts from "./pages/loans/apply-loan/ApplyProducts";
import LoanEligibility from "./pages/loans/apply-loan/Eligibility";
import LoanApplicationDetails from "./pages/loans/apply-loan/LoanApplicationDetails";
import NotifyBorrower from "./pages/loans/all-loans/NotifyBorrower";
import RecordManualPayment from "./pages/loans/all-loans/RecordManualPayment";
import LoanStatements from "./pages/loans/all-loans/LoanStatements";
import Permissions from "./pages/permissions/Permissions";
import AuditTrail from "./pages/audit-trails/AuditTrail";
import LoanApplicationApprovals from "./pages/application-approvals/LoanApplicationApprovals";
import AddMember from "./pages/members/RegisterMember";
import AddGuarantor from "./pages/loans/apply-loan/AddGuarantor";
import ChattelRegistry from "./pages/loans/apply-loan/Collaterals";
import LoanDocuments from "./pages/loans/apply-loan/AddLoanDocuments";
import ApproveApplication from "./pages/loan-applications/approve-loan-application/ApproveApplication";
import CancelApplication from "./pages/loan-applications/cancel-application/CancelApplication";
import DisburseLoan from "./pages/loan-applications/disburse-application/DisburseApplication";
import NotifyApplicant from "./pages/loan-applications/notify-applicant/NotifyApplicant";
import ManagerApproval from "./pages/loan-applications/approve-loan-application/ManagerApproval";

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
        <Route
          path="loan-applications-approvals"
          element={<LoanApplicationApprovals />}
        />
        <Route path="loan-applications/:id" element={<LoanApplication />} />
        <Route
          path="loan-applications/:id/disburse"
          element={<DisburseLoan />}
        />
        <Route
          path="loan-applications/:id/cancel-application"
          element={<CancelApplication />}
        />
        <Route
          path="loan-applications/:id/send-notification"
          element={<NotifyApplicant />}
        />

        <Route path="all-loans" element={<AllLoans />} />
        <Route path="all-loans/:id" element={<Loan />} />
        <Route path="guarantors" element={<Guarantors />} />
        <Route
          path="all-loans/:id/send-notification"
          element={<NotifyBorrower />}
        />
        <Route
          path="all-loans/:id/record-payment"
          element={<RecordManualPayment />}
        />
        <Route
          path="all-loans/:id/loan-statements"
          element={<LoanStatements />}
        />

        <Route path="all-users" element={<AllUsers />} />
        <Route path="all-users/:id" element={<AdminUser />} />
        <Route path="add-admin-user" element={<AddAdminUser />} />
        <Route path="roles" element={<Roles />} />
        <Route path="permissions" element={<Permissions />} />
        <Route path="audit-trail" element={<AuditTrail />} />

        <Route path="account-transactions" element={<AccountTransactions />} />
        <Route path="loan-transactions" element={<LoanTransactions />} />

        <Route path="all-members" element={<AllMembers />} />
        <Route path="all-members/:id" element={<MemberDetails />} />
        <Route path="all-members/add-member" element={<AddMember />} />
        <Route
          path="all-members/account/:id/:accountNumber"
          element={<AccountDetails />}
        />

        <Route path="accounts" element={<Accounts />} />
        <Route path="accounts/:id" element={<MemberAccounts />} />

        <Route
          path="loan-applications/:id/approve"
          element={<ApproveApplication />}
        />
        <Route
          path="loan-applications/:id/manager-approval"
          element={<ManagerApproval />}
        />

        <Route path="apply-loan/products" element={<ApplyProducts />} />
        <Route path="apply-loan/eligibility" element={<LoanEligibility />} />
        <Route
          path="apply-loan/loan-application-details"
          element={<LoanApplicationDetails />}
        />
        <Route path="apply-loan/add-guarantor" element={<AddGuarantor />} />
        <Route path="apply-loan/collaterals" element={<ChattelRegistry />} />
        <Route path="apply-loan/loan-documents" element={<LoanDocuments />} />
      </Route>

      <Route path="/auth/member-login" element={<MemberLogin />} />
      <Route path="/auth/member-verify-login" element={<VerifyMemberLogin />} />
      <Route
        path="/auth/member-accept-terms-conditions"
        element={<MemberAcceptTerms />}
      />
      <Route
        path="/auth/member-create-access"
        element={<MemberCreateAccess />}
      />

      <Route path="/" element={<AdminLogin />} />
      <Route path="auth/verify-login" element={<VerifyLogin />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
