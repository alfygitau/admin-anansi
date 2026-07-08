import React, { useState } from "react";
import {
  FileText,
  DollarSign,
  Calendar,
  Layers,
  Percent,
  ShieldCheck,
  Users,
  Settings,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Check,
  Layers3,
  Coins,
} from "lucide-react";

export default function AddLoanProduct() {
  const [formData, setFormData] = useState({
    product_code: "",
    product_name: "",
    description: "",
    features: null,
    terms_and_conditions: null,
    is_active: false,
    org_code: "",
    loan_mode: "",
    min_amount: "",
    max_amount: "",
    min_period: "",
    max_period: "",
    limit_algorithm: "fixed",
    limit_start_amount: "",
    limit_increment_amount: "",
    limit_start_multiplier: "",
    limit_increment_multiplier: "",
    limit_max_multiplier: "",
    limit_multiplier_basis: "savings",
    limit_resets_on_default: false,
    interest_rate: "",
    interest_key: "pm",
    interest_method: "reducing_balance",
    repayment_interval: "Monthly",
    duration_key: "pm",
    processing_fee_type: "percentage",
    processing_fee_value: "",
    deduct_fee_from_principal: false,
    has_insurance: false,
    insurance_rate: "",
    has_penalty: false,
    penalty_type: "percentage_of_outstanding",
    penalty_value: "",
    penalty_frequency: "monthly",
    grace_period_days: "",
    penalty_grace_period_days: "",
    penalty_cap_days: "",
    max_penalty_rate: "",
    workflow_type: "committee_and_manager",
    auto_disburse: false,
    committee_approvals_required: "",
    requires_manager_approval: false,
    committee_group_id: "",
    allowed_disbursement_methods: [],
    requires_guarantor: false,
    min_guarantors: "",
    max_guarantors: "",
    guarantor_required_above_amount: "",
    guarantor_coverage_percent: "",
    min_membership_months: "",
    min_shares_amount: "",
    min_savings_amount: "",
    max_loan_to_shares_ratio: "",
    max_loan_to_savings_ratio: "",
    max_active_loans_of_type: "",
    max_total_active_loans: "",
    blocked_concurrent_loan_types: [],
    allowed_concurrent_loan_types: [],
    block_if_defaulted: false,
    min_repayment_percent_before_reapply: "",
    block_if_guarantor_on_defaulted: false,
    required_kyc_level: "",
    allows_rollover: false,
    allows_topup: false,
    min_repayment_percent_for_topup: "",
    moratorium_months: "",
    moratorium_interest_handling: "interest_only",
    requires_collateral: false,
    collateral_description: "",
    allowed_currencies: ["KES"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const noSpinnerUtility =
    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="w-full space-y-5 font-sans antialiased text-slate-800">
      {/* HEADER SECTION PANEL */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Create Loan Product
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Set up borrowing limits, interest rates, late fees, and approval
            rules for this loan product.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-12 space-y-8 pb-24"
        >
          {/* SECTION 1: GENERAL PRODUCT CONFIG */}
          <FormCardLayout id="general" title="Basic Product Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Product Code">
                <InputWrapper icon={<Settings size={18} />}>
                  <input
                    type="text"
                    value={formData.product_code}
                    onChange={(e) =>
                      setFormData({ ...formData, product_code: e.target.value })
                    }
                    placeholder="e.g. development_loan"
                    className="custom-form-input"
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Product Name">
                <InputWrapper icon={<FileText size={18} />}>
                  <input
                    type="text"
                    value={formData.product_name}
                    onChange={(e) =>
                      setFormData({ ...formData, product_name: e.target.value })
                    }
                    placeholder="e.g. Development Loan"
                    className="custom-form-input"
                  />
                </InputWrapper>
              </FormGroup>

              <div className="md:col-span-2">
                <FormGroup label="Description">
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    placeholder="Describe who this loan is for and what it is generally used for..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium outline-none transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/5"
                  />
                </FormGroup>
              </div>

              <FormGroup label="Organization Code">
                <InputWrapper icon={<ShieldCheck size={18} />}>
                  <input
                    type="text"
                    value={formData.org_code}
                    readOnly
                    className="custom-form-input opacity-60 bg-slate-100"
                    placeholder="e.g. BA208"
                  />
                </InputWrapper>
              </FormGroup>
            </div>
          </FormCardLayout>

          {/* SECTION 2: SIZING & THRESHOLDS */}
          <FormCardLayout id="limits" title="Loan Limits & Terms">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Minimum Loan Amount">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    value={formData.min_amount}
                    onChange={(e) =>
                      setFormData({ ...formData, min_amount: e.target.value })
                    }
                    placeholder="e.g. 50000.00"
                    className={`custom-form-input pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Loan Amount">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    value={formData.max_amount}
                    onChange={(e) =>
                      setFormData({ ...formData, max_amount: e.target.value })
                    }
                    placeholder="e.g. 5000000.00"
                    className={`custom-form-input pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Term (Months)">
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.min_period}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_period: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 6"
                    className={`custom-form-input pr-16 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Term (Months)">
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.max_period}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_period: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 60"
                    className={`custom-form-input pr-16 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Max Active Loans of This Type">
                <InputWrapper icon={<Layers size={18} />}>
                  <input
                    type="number"
                    value={formData.max_active_loans_of_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_active_loans_of_type: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 1"
                    className={`custom-form-input ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Total Max Active Loans Allowed">
                <InputWrapper icon={<Layers3 size={18} />}>
                  <input
                    type="number"
                    value={formData.max_total_active_loans}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_total_active_loans: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 2"
                    className={`custom-form-input ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>
            </div>
          </FormCardLayout>

          {/* SECTION 3: ALGORITHMIC MULTIPLIERS */}
          <FormCardLayout
            id="multipliers"
            title="Borrowing Limits & Multipliers"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="How Limits Are Calculated">
                <select
                  value={formData.limit_algorithm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      limit_algorithm: e.target.value,
                    })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="fixed">Based on Multiplier</option>
                </select>
              </FormGroup>

              <FormGroup label="Multiplier Based On">
                <select
                  value={formData.limit_multiplier_basis}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      limit_multiplier_basis: e.target.value,
                    })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="savings">Member Deposits / Savings</option>
                </select>
              </FormGroup>

              <FormGroup label="Starting Loan Limit">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    value={formData.limit_start_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limit_start_amount: e.target.value,
                      })
                    }
                    placeholder="e.g. 0.00"
                    className={`custom-form-input ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Limit Increase Step">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    value={formData.limit_increment_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limit_increment_amount: e.target.value,
                      })
                    }
                    placeholder="e.g. 0.00"
                    className={`custom-form-input ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Starting Multiplier">
                <InputWrapper icon={<TrendingUp size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.limit_start_multiplier}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limit_start_multiplier: e.target.value,
                      })
                    }
                    placeholder="e.g. 1.5000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Multiplier Increase Step">
                <InputWrapper icon={<TrendingUp size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.limit_increment_multiplier}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limit_increment_multiplier: e.target.value,
                      })
                    }
                    placeholder="e.g. 0.5000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Multiplier Cap">
                <InputWrapper icon={<TrendingUp size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.limit_max_multiplier}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limit_max_multiplier: e.target.value,
                      })
                    }
                    placeholder="e.g. 3.0000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Membership Required (Months)">
                <InputWrapper icon={<Users size={18} />}>
                  <input
                    type="number"
                    value={formData.min_membership_months}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_membership_months: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 6"
                    className={`custom-form-input pr-16 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Shares Balance">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    value={formData.min_shares_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_shares_amount: e.target.value,
                      })
                    }
                    placeholder="e.g. 10000.00"
                    className={`custom-form-input pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Savings Balance">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    value={formData.min_savings_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_savings_amount: e.target.value,
                      })
                    }
                    placeholder="e.g. 20000.00"
                    className={`custom-form-input pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Loan-to-Shares Ratio">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.max_loan_to_shares_ratio}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_loan_to_shares_ratio: e.target.value,
                      })
                    }
                    placeholder="e.g. 5.0000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Loan-to-Savings Ratio">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.max_loan_to_savings_ratio}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_loan_to_savings_ratio: e.target.value,
                      })
                    }
                    placeholder="e.g. 0.0000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100/60">
                <FormCheckbox
                  label="Reset borrowing limits if the member defaults"
                  checked={formData.limit_resets_on_default}
                  onChange={(checked) =>
                    setFormData({
                      ...formData,
                      limit_resets_on_default: checked,
                    })
                  }
                />
              </div>
            </div>
          </FormCardLayout>

          {/* SECTION 4: INTEREST & FEES */}
          <FormCardLayout id="amortization" title="Interest, Fees & Repayments">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Interest Rate">
                <InputWrapper icon={<Coins size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.interest_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        interest_rate: e.target.value,
                      })
                    }
                    placeholder="e.g. 1.5000"
                    className={`custom-form-input pr-14 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Interest Method">
                <select
                  value={formData.interest_method}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interest_method: e.target.value,
                    })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="reducing_balance">Reducing Balance</option>
                  <option value="flat_rate">Flat Rate</option>
                </select>
              </FormGroup>

              <FormGroup label="Payment Frequency">
                <select
                  value={formData.repayment_interval}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      repayment_interval: e.target.value,
                    })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Daily">Daily</option>
                </select>
              </FormGroup>

              <FormGroup label="Processing Fee Type">
                <select
                  value={formData.processing_fee_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      processing_fee_type: e.target.value,
                    })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="percentage">Percentage of Loan Amount</option>
                  <option value="fixed">Fixed Fixed Amount</option>
                </select>
              </FormGroup>

              <FormGroup label="Processing Fee Value">
                <InputWrapper icon={<Coins size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.processing_fee_value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        processing_fee_value: e.target.value,
                      })
                    }
                    placeholder="e.g. 1.0000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Insurance Cover Rate (%)">
                <InputWrapper icon={<Coins size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.insurance_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insurance_rate: e.target.value,
                      })
                    }
                    placeholder="e.g. 0.5000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100/60 mt-2">
                <FormCheckbox
                  label="Deduct processing fees upfront from the loan amount"
                  checked={formData.deduct_fee_from_principal}
                  onChange={(checked) =>
                    setFormData({
                      ...formData,
                      deduct_fee_from_principal: checked,
                    })
                  }
                />
                <FormCheckbox
                  label="Require insurance coverage"
                  checked={formData.has_insurance}
                  onChange={(checked) =>
                    setFormData({ ...formData, has_insurance: checked })
                  }
                />
              </div>
            </div>
          </FormCardLayout>

          {/* SECTION 5: RISK & PENALTY CONTROL */}
          <FormCardLayout id="risk" title="Late Payments & Penalties">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Payment Grace Period (Days)">
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.grace_period_days}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        grace_period_days: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 30"
                    className={`custom-form-input pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Penalty Calculation Method">
                <select
                  value={formData.penalty_type}
                  onChange={(e) =>
                    setFormData({ ...formData, penalty_type: e.target.value })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="percentage_of_outstanding">
                    Percentage of Overdue Balance
                  </option>
                </select>
              </FormGroup>

              <FormGroup label="Penalty Rate (%)">
                <InputWrapper icon={<AlertTriangle size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.penalty_value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        penalty_value: e.target.value,
                      })
                    }
                    placeholder="e.g. 5.0000"
                    className={`custom-form-input pr-14 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Penalty Cap (%)">
                <InputWrapper icon={<AlertTriangle size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.max_penalty_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_penalty_rate: e.target.value,
                      })
                    }
                    placeholder="e.g. 20.0000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Penalty Grace Period (Days)">
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.penalty_grace_period_days}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        penalty_grace_period_days: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 0"
                    className={`custom-form-input pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Days to Charge Penalties">
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.penalty_cap_days}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        penalty_cap_days: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 0"
                    className={`custom-form-input pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Payment Holiday / Grace Period (Months)">
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.moratorium_months}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        moratorium_months: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 0"
                    className={`custom-form-input pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="How to Handle Interest During Pause">
                <select
                  value={formData.moratorium_interest_handling}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      moratorium_interest_handling: e.target.value,
                    })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="interest_only">Charge Interest Only</option>
                </select>
              </FormGroup>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100/60">
                <FormCheckbox
                  label="Enable late fees and penalties"
                  checked={formData.has_penalty}
                  onChange={(checked) =>
                    setFormData({ ...formData, has_penalty: checked })
                  }
                />
                <FormCheckbox
                  label="Suspend member account if the loan defaults"
                  checked={formData.block_if_defaulted}
                  onChange={(checked) =>
                    setFormData({ ...formData, block_if_defaulted: checked })
                  }
                />
                <FormCheckbox
                  label="Block application if a guarantor owes money"
                  checked={formData.block_if_guarantor_on_defaulted}
                  onChange={(checked) =>
                    setFormData({
                      ...formData,
                      block_if_guarantor_on_defaulted: checked,
                    })
                  }
                />
              </div>
            </div>
          </FormCardLayout>

          {/* SECTION 6: WORKFLOW & UNDERWRITING */}
          <FormCardLayout id="underwriting" title="Approvals & Security">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Approval Workflow">
                <select
                  value={formData.workflow_type}
                  onChange={(e) =>
                    setFormData({ ...formData, workflow_type: e.target.value })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="committee_and_manager">
                    Committee & Manager Sign-off
                  </option>
                </select>
              </FormGroup>

              <FormGroup label="Required Committee Approvals">
                <InputWrapper icon={<Users size={18} />}>
                  <input
                    type="number"
                    value={formData.committee_approvals_required}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        committee_approvals_required: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 3"
                    className={`custom-form-input pr-14 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Paid Before Re-applying (%)">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.min_repayment_percent_before_reapply}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_repayment_percent_before_reapply: e.target.value,
                      })
                    }
                    placeholder="e.g. 100.0000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Number of Guarantors">
                <InputWrapper icon={<Users size={18} />}>
                  <input
                    type="number"
                    value={formData.min_guarantors}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_guarantors: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 2"
                    className={`custom-form-input pr-20 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Number of Guarantors">
                <InputWrapper icon={<Users size={18} />}>
                  <input
                    type="number"
                    value={formData.max_guarantors}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_guarantors: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 4"
                    className={`custom-form-input pr-20 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Require Guarantors Above This Amount">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    value={formData.guarantor_required_above_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guarantor_required_above_amount: e.target.value,
                      })
                    }
                    placeholder="e.g. 0.00"
                    className={`custom-form-input pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Guarantor Guarantee Coverage (%)">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.guarantor_coverage_percent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guarantor_coverage_percent: e.target.value,
                      })
                    }
                    placeholder="e.g. 100.0000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Paid Before Top-Up (%)">
                <InputWrapper icon={<DollarSign size={18} />}>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.min_repayment_percent_for_topup}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_repayment_percent_for_topup: e.target.value,
                      })
                    }
                    placeholder="e.g. 50.0000"
                    className={`custom-form-input pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <div className="md:col-span-2">
                <FormGroup label="Allowed Disbursement Methods">
                  <div className="flex gap-4">
                    {["MPESA", "BANK"].map((method) => {
                      const isChecked =
                        formData.allowed_disbursement_methods.includes(method);
                      return (
                        <button
                          key={method}
                          type="button"
                          onClick={() => {
                            const current = [
                              ...formData.allowed_disbursement_methods,
                            ];
                            const idx = current.indexOf(method);
                            if (idx > -1) current.splice(idx, 1);
                            else current.push(method);
                            setFormData({
                              ...formData,
                              allowed_disbursement_methods: current,
                            });
                          }}
                          className={`h-14 px-6 border rounded-2xl flex items-center justify-between text-xs font-bold tracking-wider transition-all w-48 cursor-pointer ${
                            isChecked
                              ? "border-primary bg-primary/5 text-primary shadow-sm"
                              : "border-slate-200/60 bg-white text-slate-400"
                          }`}
                        >
                          <span>{method} TRANSFERS</span>
                          {isChecked && (
                            <Check size={14} className="text-primary" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </FormGroup>
              </div>

              <div className="md:col-span-2">
                <FormGroup label="Collateral Requirements Description">
                  <textarea
                    value={formData.collateral_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        collateral_description: e.target.value,
                      })
                    }
                    rows={2}
                    placeholder="e.g. Logbook, title deed, or other acceptable physical collateral..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium outline-none transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/5"
                  />
                </FormGroup>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100/60">
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Requires manager approval"
                    checked={formData.requires_manager_approval}
                    onChange={(checked) =>
                      setFormData({
                        ...formData,
                        requires_manager_approval: checked,
                      })
                    }
                  />
                </div>
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Requires guarantors"
                    checked={formData.requires_guarantor}
                    onChange={(checked) =>
                      setFormData({ ...formData, requires_guarantor: checked })
                    }
                  />
                </div>
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Automatically send funds upon approval"
                    checked={formData.auto_disburse}
                    onChange={(checked) =>
                      setFormData({ ...formData, auto_disburse: checked })
                    }
                  />
                </div>
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Allow loan rollovers"
                    checked={formData.allows_rollover}
                    onChange={(checked) =>
                      setFormData({ ...formData, allows_rollover: checked })
                    }
                  />
                </div>
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Allow loan top-ups"
                    checked={formData.allows_topup}
                    onChange={(checked) =>
                      setFormData({ ...formData, allows_topup: checked })
                    }
                  />
                </div>
                <div className="md:col-span-2 mt-1">
                  <FormCheckbox
                    label="Requires physical collateral (e.g., logbook, title deed)"
                    checked={formData.requires_collateral}
                    onChange={(checked) =>
                      setFormData({ ...formData, requires_collateral: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </FormCardLayout>

          {/* LOWER FIXED ACTIONS COMMAND DOCK BAR */}
          <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <button
              type="button"
              className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-11 px-5 border border-slate-200/80 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 cursor-pointer flex items-center gap-2"
            >
              <span>Launch Product</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const FormCardLayout = ({ id, title, children }) => (
  <div
    id={id}
    className="bg-white rounded-[28px] border border-slate-200/60 shadow-sm overflow-hidden scroll-mt-24"
  >
    <div className="px-6 py-4.5 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
        {title}
      </h3>
      <HelpCircle
        size={15}
        className="text-slate-400 cursor-pointer hover:text-primary transition-colors"
      />
    </div>
    <div className="p-6 md:p-8">{children}</div>
  </div>
);

const FormGroup = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    {children}
  </div>
);

const InputWrapper = ({ icon, children }) => (
  <div className="relative flex items-center group w-full">
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
      <span className="text-slate-300 group-focus-within:text-secondary transition-colors duration-150">
        {icon}
      </span>
      <div className="w-[1px] h-5 bg-slate-200 ml-3 group-focus-within:bg-secondary/20 transition-colors duration-150" />
    </div>
    {children}
  </div>
);

const FormCheckbox = ({ label, checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="flex items-center gap-3 text-left py-1 text-xs font-semibold text-slate-600 hover:text-primary group select-none cursor-pointer"
  >
    <div
      className={`size-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
        checked
          ? "bg-primary border-primary text-white shadow-sm"
          : "border-slate-300 bg-white group-hover:border-slate-400"
      }`}
    >
      {checked && <Check size={12} strokeWidth={3} />}
    </div>
    <span className="leading-tight">{label}</span>
  </button>
);
