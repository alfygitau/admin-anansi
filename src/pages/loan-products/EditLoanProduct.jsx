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
  ShieldAlert,
  Sliders,
  Briefcase,
  Layers3,
} from "lucide-react";

export default function EditLoanProduct() {
  const [formData, setFormData] = useState({
    product_code: "Development_loan",
    product_name: "Development Loan",
    description:
      "Long-term development loan requiring full credit committee review",
    features: null,
    terms_and_conditions: null,
    is_active: true,
    org_code: "BA208",
    loan_mode: 1,
    min_amount: "50000.00",
    max_amount: "5000000.00",
    min_period: 6,
    max_period: 60,
    limit_algorithm: "fixed",
    limit_start_amount: "0.00",
    limit_increment_amount: "0.00",
    limit_start_multiplier: "1.5000",
    limit_increment_multiplier: "0.5000",
    limit_max_multiplier: "3.0000",
    limit_multiplier_basis: "savings",
    limit_resets_on_default: true,
    interest_rate: "1.5000",
    interest_key: "pm",
    interest_method: "reducing_balance",
    repayment_interval: "Monthly",
    duration_key: "pm",
    processing_fee_type: "percentage",
    processing_fee_value: "1.0000",
    deduct_fee_from_principal: true,
    has_insurance: true,
    insurance_rate: "0.5000",
    has_penalty: true,
    penalty_type: "percentage_of_outstanding",
    penalty_value: "5.0000",
    penalty_frequency: "monthly",
    grace_period_days: 30,
    penalty_grace_period_days: 0,
    penalty_cap_days: 0,
    max_penalty_rate: "20.0000",
    workflow_type: "committee_and_manager",
    auto_disburse: false,
    committee_approvals_required: 3,
    requires_manager_approval: true,
    committee_group_id: "credit-committee-group-uuid",
    allowed_disbursement_methods: ["MPESA", "BANK"],
    requires_guarantor: true,
    min_guarantors: 2,
    max_guarantors: 4,
    guarantor_required_above_amount: "0.00",
    guarantor_coverage_percent: "100.0000",
    min_membership_months: 6,
    min_shares_amount: "10000.00",
    min_savings_amount: "20000.00",
    max_loan_to_shares_ratio: "5.0000",
    max_loan_to_savings_ratio: "0.0000",
    max_active_loans_of_type: 1,
    max_total_active_loans: 2,
    blocked_concurrent_loan_types: ["Development_loan"],
    allowed_concurrent_loan_types: [],
    block_if_defaulted: true,
    min_repayment_percent_before_reapply: "100.0000",
    block_if_guarantor_on_defaulted: true,
    required_kyc_level: 1,
    allows_rollover: false,
    allows_topup: true,
    min_repayment_percent_for_topup: "50.0000",
    moratorium_months: 0,
    moratorium_interest_handling: "interest_only",
    requires_collateral: false,
    collateral_description:
      "Logbook, title deed, or other acceptable collateral",
    allowed_currencies: ["KES"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Shared string representation configuration for stripping default chrome spinners
  const noSpinnerUtility =
    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="w-full space-y-8 font-sans antialiased text-slate-800">
      {/* HEADER SECTION PANEL */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-6">
        <div>
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase opacity-60">
            System Configurations
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Modify Product
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Map out detailed lending limits, multi-tier risk metrics, and custom
            credit workflow policies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* RIGHT INPUT CANVAS PANELS */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-12 space-y-8 pb-24"
        >
          {/* SECTION 1: GENERAL PRODUCT CONFIG */}
          <FormCardLayout id="general" title="Product Definition Profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Product Machine Code">
                <InputWrapper icon={<Settings size={18} />}>
                  <input
                    type="text"
                    value={formData.product_code}
                    onChange={(e) =>
                      setFormData({ ...formData, product_code: e.target.value })
                    }
                    placeholder="e.g. Development_loan"
                    className="custom-form-input"
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Product Public Name">
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
                <FormGroup label="Description Ledger Context">
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    placeholder="Detail core parameters requiring full credit review cycles..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium outline-none transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/5"
                  />
                </FormGroup>
              </div>

              <FormGroup label="Organization Origin Code">
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

              <FormGroup label="Lending Operational Mode">
                <InputWrapper icon={<Sliders size={18} />}>
                  <input
                    type="number"
                    value={formData.loan_mode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        loan_mode: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 1"
                    className={`custom-form-input ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="System Currency Suite">
                <div className="flex gap-2">
                  {formData.allowed_currencies.map((curr) => (
                    <span
                      key={curr}
                      className="px-3.5 h-14 border border-slate-200/60 bg-white rounded-2xl flex items-center justify-center text-xs font-bold text-primary shadow-sm"
                    >
                      {curr}
                    </span>
                  ))}
                </div>
              </FormGroup>

              <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100/60">
                <FormCheckbox
                  label="Product Operational Matrix Visibility status (Is Active)"
                  checked={formData.is_active}
                  onChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
              </div>
            </div>
          </FormCardLayout>

          {/* SECTION 2: SIZING & THRESHOLDS */}
          <FormCardLayout id="limits" title="Sizing, Thresholds & Bounds">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Minimum Borrowing Capital Floor">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    KES
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Borrowing Capital Ceiling">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    KES
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Period Interval">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Months ({formData.duration_key})
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Period Interval">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Months ({formData.duration_key})
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Max Active Loans (Of This Specific Type)">
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

              <FormGroup label="Max Total Active Concurrent System Loans">
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

              <FormGroup label="Required Account KYC Clearance Level">
                <InputWrapper icon={<ShieldAlert size={18} />}>
                  <input
                    type="number"
                    value={formData.required_kyc_level}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        required_kyc_level: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 1"
                    className={`custom-form-input pr-12 ${noSpinnerUtility}`}
                  />
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Tier
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Blocked Concurrent Matrix Profiles">
                <div className="flex flex-wrap gap-2 pt-1">
                  {formData.blocked_concurrent_loan_types.map((type) => (
                    <span
                      key={type}
                      className="px-3.5 py-2 border border-rose-200/60 bg-rose-50/40 rounded-xl text-xs font-semibold text-error flex items-center gap-1.5"
                    >
                      <AlertTriangle size={12} />
                      {type}
                    </span>
                  ))}
                </div>
              </FormGroup>
            </div>
          </FormCardLayout>

          {/* SECTION 3: ALGORITHMIC MULTIPLIERS */}
          <FormCardLayout
            id="multipliers"
            title="Algorithmic Multipliers & Evaluation Bounds"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Calculation Algorithm Framework">
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
                  <option value="fixed">Fixed Step Multiplier Matrix</option>
                </select>
              </FormGroup>

              <FormGroup label="Multiplier Evaluation Basis Source">
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
                  <option value="savings">
                    Member Deposits / Long-term Savings
                  </option>
                </select>
              </FormGroup>

              <FormGroup label="Limit Base Start Amount">
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

              <FormGroup label="Limit Incremental Padding Amount">
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

              <FormGroup label="Start Multiplier Index Step">
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    x
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Incremental Step Matrix Scale">
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    x
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Absolute Maximum Multiplier Ceiling Cap">
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    x
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Min Membership History Profile">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Months
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Allocated Shares Balance">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    KES
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Capital Savings Floor">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    KES
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Max Loan-to-Shares Density Ratio">
                <InputWrapper icon={<Percent size={18} />}>
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    %
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Max Loan-to-Savings Density Ratio">
                <InputWrapper icon={<Percent size={18} />}>
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    %
                  </span>
                </InputWrapper>
              </FormGroup>

              <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100/60">
                <FormCheckbox
                  label="Reset Multiplier Limit Calculations upon Active Delinquency/Default"
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
          <FormCardLayout
            id="amortization"
            title="Interest, Amortization & Fee Matrix"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Nominal Rate Charge Basis">
                <InputWrapper icon={<Percent size={18} />}>
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    / Month ({formData.interest_key})
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Amortization Calculation Paradigm Method">
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
                  <option value="reducing_balance">
                    Reducing Balance Amortization Framework
                  </option>
                  <option value="flat_rate">
                    Flat Structural Evaluation Framework
                  </option>
                </select>
              </FormGroup>

              <FormGroup label="Repayment Settlement Intervals">
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
                  <option value="Monthly">Monthly Accounting Intervals</option>
                </select>
              </FormGroup>

              <FormGroup label="Processing System Fee Type Scale">
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
                  <option value="percentage">
                    Percentage Value Evaluation
                  </option>
                </select>
              </FormGroup>

              <FormGroup label="Processing Operational Levy Cost">
                <InputWrapper icon={<Percent size={18} />}>
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    %
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Insurance Premium Levy Assessment">
                <InputWrapper icon={<Percent size={18} />}>
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    %
                  </span>
                </InputWrapper>
              </FormGroup>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100/60 mt-2">
                <FormCheckbox
                  label="Deduct Processing Fees Directly Upfront from Principal Ledger"
                  checked={formData.deduct_fee_from_principal}
                  onChange={(checked) =>
                    setFormData({
                      ...formData,
                      deduct_fee_from_principal: checked,
                    })
                  }
                />
                <FormCheckbox
                  label="Enforce Active Portfolio Insurance Policy Premium Cover"
                  checked={formData.has_insurance}
                  onChange={(checked) =>
                    setFormData({ ...formData, has_insurance: checked })
                  }
                />
              </div>
            </div>
          </FormCardLayout>

          {/* SECTION 5: RISK & PENALTY CONTROL */}
          <FormCardLayout
            id="risk"
            title="Risk Mitigations, Moratoriums & Penalties"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Repayment Arrears Grace Allocation Window">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Days
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Penalty Charging Matrix Assessment Framework">
                <select
                  value={formData.penalty_type}
                  onChange={(e) =>
                    setFormData({ ...formData, penalty_type: e.target.value })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="percentage_of_outstanding">
                    Percentage of Total Outstanding Balance Arrears
                  </option>
                </select>
              </FormGroup>

              <FormGroup label="Default Delinquency Penalty Scale Rate">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    % / {formData.penalty_frequency}
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Absolute Maximum Cumulative Penalty Ceiling Cap">
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    %
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Penalty Accounting Grace Intermission Days">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Days
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Penalty Calculation Ceiling Cap Duration">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Days
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Moratorium Window Allocation Period">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Months
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Moratorium Accounting Interest Strategy">
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
                  <option value="interest_only">
                    Accumulate Nominal Interest Charges Only
                  </option>
                </select>
              </FormGroup>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100/60">
                <FormCheckbox
                  label="Enforce Active Penalties"
                  checked={formData.has_penalty}
                  onChange={(checked) =>
                    setFormData({ ...formData, has_penalty: checked })
                  }
                />
                <FormCheckbox
                  label="Restrict Accounts If Profile in Active Default"
                  checked={formData.block_if_defaulted}
                  onChange={(checked) =>
                    setFormData({ ...formData, block_if_defaulted: checked })
                  }
                />
                <FormCheckbox
                  label="Restrict Accounts If Chosen Guarantor has Arrears"
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
          <FormCardLayout
            id="underwriting"
            title="Workflow Logic, Guarantorship & Collateral"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Lending Governance Evaluation Workflow Engine">
                <select
                  value={formData.workflow_type}
                  onChange={(e) =>
                    setFormData({ ...formData, workflow_type: e.target.value })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="committee_and_manager">
                    Joint Board Committee & Executive Sign-off Matrix
                  </option>
                </select>
              </FormGroup>

              <FormGroup label="Governance Committee Authorization Quorum Floor">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Votes
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Credit Committee Allocation Target Group Identifier">
                <InputWrapper icon={<Briefcase size={18} />}>
                  <input
                    type="text"
                    value={formData.committee_group_id}
                    readOnly
                    className="custom-form-input opacity-60 bg-slate-100 text-slate-400 text-xs"
                    placeholder="e.g. credit-committee-group-uuid"
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Required Account Cleared Ratio Before Re-Application">
                <InputWrapper icon={<Percent size={18} />}>
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    %
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Guarantor Group Structure Floor">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Co-Signers
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Guarantor Group Structure Ceiling">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    Co-Signers
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Guarantor Enforcement Floor Threshold Amount">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    KES
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Guarantor Liabilities Asset Coverage Factor">
                <InputWrapper icon={<Percent size={18} />}>
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    %
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Required Repayment for Account Top-Up">
                <InputWrapper icon={<Percent size={18} />}>
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    %
                  </span>
                </InputWrapper>
              </FormGroup>

              <div className="md:col-span-2">
                <FormGroup label="Allowed Automated Ledger Distribution Channels">
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
                <FormGroup label="Physical Collateral Registration Requirements Description">
                  <textarea
                    value={formData.collateral_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        collateral_description: e.target.value,
                      })
                    }
                    rows={2}
                    placeholder="Logbook, title deed, or other acceptable collateral..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium outline-none transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/5"
                  />
                </FormGroup>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100/60">
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Manager Sign-off"
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
                    label="Guarantor Bounds"
                    checked={formData.requires_guarantor}
                    onChange={(checked) =>
                      setFormData({ ...formData, requires_guarantor: checked })
                    }
                  />
                </div>
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Auto Disbursement"
                    checked={formData.auto_disburse}
                    onChange={(checked) =>
                      setFormData({ ...formData, auto_disburse: checked })
                    }
                  />
                </div>
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Allow Rollovers"
                    checked={formData.allows_rollover}
                    onChange={(checked) =>
                      setFormData({ ...formData, allows_rollover: checked })
                    }
                  />
                </div>
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Allow Top-Ups"
                    checked={formData.allows_topup}
                    onChange={(checked) =>
                      setFormData({ ...formData, allows_topup: checked })
                    }
                  />
                </div>
                <div className="md:col-span-2 mt-1">
                  <FormCheckbox
                    label="Requires Tangible Asset Collateral Pledges"
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
              Cancel & Purge
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 cursor-pointer flex items-center gap-2"
            >
              <span>Save Product Changes</span>
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
    className="flex items-center gap-3 text-left py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 group select-none cursor-pointer"
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
