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
import { useToast } from "../../contexts/ToastProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  editLoanProduct,
  getLoanProduct,
} from "../../sdk/loan-products/loan-products";
import { useQuery, useMutation } from "react-query";
import * as Sentry from "@sentry/react";

export default function EditLoanProduct() {
  const [formData, setFormData] = useState({
    product_code: "",
    product_name: "",
    description: "",
    features: null,
    terms_and_conditions: null,
    is_active: true,
    org_code: "",
    loan_mode: 1,
    min_amount: "",
    max_amount: "",
    min_period: 0,
    max_period: 0,
    limit_algorithm: "fixed",
    limit_start_amount: "0.00",
    limit_increment_amount: "0.00",
    limit_start_multiplier: "0.000",
    limit_increment_multiplier: "0.000",
    limit_max_multiplier: "0.0000",
    limit_multiplier_basis: "savings",
    limit_resets_on_default: true,
    interest_rate: "0.000",
    interest_key: "pm",
    interest_method: "reducing_balance",
    repayment_interval: "Monthly",
    duration_key: "pm",
    processing_fee_type: "percentage",
    processing_fee_value: "1.0000",
    deduct_fee_from_principal: true,
    has_insurance: true,
    insurance_rate: "0.000",
    has_penalty: true,
    penalty_type: "percentage_of_outstanding",
    penalty_value: "0.0000",
    penalty_frequency: "monthly",
    grace_period_days: 0,
    penalty_grace_period_days: 0,
    penalty_cap_days: 0,
    max_penalty_rate: "0.0000",
    workflow_type: "",
    auto_disburse: false,
    committee_approvals_required: 3,
    requires_manager_approval: true,
    allowed_disbursement_methods: [],
    requires_guarantor: true,
    min_guarantors: 0,
    max_guarantors: 0,
    guarantor_required_above_amount: "0.00",
    guarantor_coverage_percent: "0.0000",
    min_membership_months: 0,
    min_shares_amount: "0.00",
    min_savings_amount: "0.00",
    max_loan_to_shares_ratio: "0.0000",
    max_loan_to_savings_ratio: "0.0000",
    max_active_loans_of_type: 0,
    max_total_active_loans: 0,
    block_if_defaulted: true,
    min_repayment_percent_before_reapply: "0.0000",
    block_if_guarantor_on_defaulted: true,
    required_kyc_level: 1,
    allows_rollover: false,
    allows_topup: true,
    min_repayment_percent_for_topup: "0.0000",
    moratorium_months: 0,
    moratorium_interest_handling: "interest_only",
    requires_collateral: false,
    collateral_description: "",
    terms_and_conditions: "",
  });
  const navigate = useNavigate();
  const [loanProduct, setLoanProduct] = useState({});
  const { showToast } = useToast();
  const { id } = useParams();

  const { isFetching } = useQuery({
    queryKey: ["loan-product", id],
    queryFn: async () => {
      const response = await getLoanProduct(id);
      return response.data.data;
    },
    onSuccess: (data) => {
      setLoanProduct(data);
      setFormData({
        product_code: data?.product_code ?? "",
        product_name: data?.product_name ?? "",
        description: data?.description ?? "",
        features: data?.features,
        terms_and_conditions: data?.terms_and_conditions ?? "",
        org_code: "BA208",
        loan_mode: data?.loan_mode ?? "",
        min_amount: data?.min_amount ?? "",
        max_amount: data?.max_amount ?? "",
        min_period: data?.min_period ?? "",
        max_period: data?.max_period ?? "",
        limit_algorithm: data?.limit_algorithm,
        limit_start_amount: data?.limit_start_amount,
        limit_increment_amount: data?.limit_increment_amount,
        limit_start_multiplier: data?.limit_start_multiplier,
        limit_increment_multiplier: data?.limit_increment_multiplier,
        limit_max_multiplier: data?.limit_max_multiplier,
        limit_multiplier_basis: data?.limit_multiplier_basis,
        limit_resets_on_default: data?.limit_resets_on_default,
        interest_rate: data?.interest_rate,
        interest_key: data?.interest_key,
        interest_method: data?.interest_method,
        repayment_interval: data?.repayment_interval,
        duration_key: data?.duration_key,
        processing_fee_type: data?.processing_fee_type,
        processing_fee_value: data?.processing_fee_value,
        deduct_fee_from_principal: data?.deduct_fee_from_principal,
        has_insurance: data?.has_insurance,
        insurance_rate: data?.insurance_rate,
        has_penalty: data?.has_penalty,
        penalty_type: data?.penalty_type,
        penalty_value: data?.penalty_value,
        penalty_frequency: data?.penalty_frequency,
        penalty_cap_days: data?.penalty_cap_days,
        max_penalty_rate: data?.max_penalty_rate,
        workflow_type: "committee_and_manager",
        auto_disburse: data?.auto_disburse,
        committee_approvals_required: data?.committee_approvals_required,
        requires_manager_approval: data?.requires_manager_approval,
        allowed_disbursement_methods: data?.allowed_disbursement_methods,
        requires_guarantor: data?.requires_guarantor,
        min_guarantors: data?.min_guarantors,
        max_guarantors: data?.max_guarantors,
        guarantor_required_above_amount: data?.guarantor_required_above_amount,
        guarantor_coverage_percent: data?.guarantor_coverage_percent,
        min_membership_months: data?.min_membership_months,
        min_shares_amount: data?.min_shares_amount,
        min_savings_amount: data?.min_savings_amount,
        max_loan_to_shares_ratio: data?.max_loan_to_shares_ratio,
        max_loan_to_savings_ratio: data?.max_loan_to_savings_ratio,
        max_active_loans_of_type: data?.max_active_loans_of_type,
        max_total_active_loans: data?.max_total_active_loans,
        blocked_concurrent_loan_types: data?.blocked_concurrent_loan_types,
        allowed_concurrent_loan_types: data?.allowed_concurrent_loan_types,
        block_if_defaulted: data?.block_if_defaulted,
        min_repayment_percent_before_reapply:
          data?.min_repayment_percent_before_reapply,
        block_if_guarantor_on_defaulted: data?.block_if_guarantor_on_defaulted,
        required_kyc_level: data?.required_kyc_level,
        allows_rollover: data?.allows_rollover,
        allows_topup: data?.allows_topup,
        min_repayment_percent_for_topup: data?.min_repayment_percent_for_topup,
        requires_collateral: data?.requires_collateral,
        requires_documents: data?.requires_documents,
        collateral_description: data?.collateral_description ?? "",
      });
    },
    onError: (error) => {
      Sentry.captureException(error, {
        tags: { component: "Loan Products", action: "get loan products" },
      });
      showToast({
        title: "Loan Products processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["edit loan product"],
    mutationFn: async () => {
      const response = await editLoanProduct(
        id,
        formData?.product_code,
        formData?.product_name,
        formData?.description,
        formData?.features,
        formData?.terms_and_conditions,
        formData?.org_code,
        formData?.loan_mode,
        formData?.min_amount,
        formData?.max_amount,
        Number(formData?.min_period),
        Number(formData?.max_period),
        formData?.limit_algorithm,
        formData?.limit_start_amount,
        formData?.limit_increment_amount,
        formData?.limit_start_multiplier,
        formData?.limit_increment_multiplier,
        Number(formData?.limit_max_multiplier),
        formData?.limit_multiplier_basis,
        formData?.limit_resets_on_default,
        Number(formData?.interest_rate),
        formData?.interest_key,
        formData?.interest_method,
        formData?.repayment_interval,
        formData?.duration_key,
        formData?.processing_fee_type,
        formData?.processing_fee_value,
        formData?.deduct_fee_from_principal,
        formData?.has_insurance,
        formData?.insurance_rate,
        formData?.has_penalty,
        formData?.penalty_type,
        formData?.penalty_value,
        formData?.penalty_frequency,
        formData?.penalty_cap_days,
        formData?.max_penalty_rate,
        formData?.workflow_type,
        formData?.auto_disburse,
        formData?.committee_approvals_required,
        formData?.requires_manager_approval,
        formData?.allowed_disbursement_methods,
        formData?.requires_guarantor,
        formData?.min_guarantors,
        formData?.max_guarantors,
        formData?.guarantor_required_above_amount,
        formData?.guarantor_coverage_percent,
        formData?.min_membership_months,
        formData?.min_shares_amount,
        formData?.min_savings_amount,
        formData?.max_loan_to_shares_ratio,
        formData?.max_loan_to_savings_ratio,
        formData?.max_active_loans_of_type,
        formData?.max_total_active_loans,
        formData?.block_if_defaulted,
        formData?.min_repayment_percent_before_reapply,
        formData?.block_if_guarantor_on_defaulted,
        formData?.required_kyc_level,
        formData?.allows_rollover,
        formData?.allows_topup,
        formData?.min_repayment_percent_for_topup,
        formData?.requires_collateral,
        formData?.collateral_description,
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      showToast({
        title: "Product Configured",
        type: "success",
        position: "top-right",
        description: `${formData.product_name} has been successfully updated onto the ecosystem platform.`,
      });
      navigate(`/admin/loan-products`);
    },
    onError: (error) => {
      Sentry.captureException(error, {
        tags: { component: "Loan Products", action: "edit loan product" },
      });
      showToast({
        title: "Loan Products processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  const noSpinnerUtility =
    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="w-full font-sans antialiased text-slate-800">
      {/* HEADER SECTION PANEL */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-6">
        <div>
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase opacity-60">
            System Configurations
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-primary mt-1">
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
        <form onSubmit={handleSubmit} className="lg:col-span-12 space-y-8">
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    KES
                  </span>
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
                  <span className="absolute right-4 text-[10px] font-bold text-slate-400">
                    KES
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Loan Duration">
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

              <FormGroup label="Maximum Loan Duration">
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

              <FormGroup label="Max Active Loans (This Type)">
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

              <FormGroup label="Max Total Active Loans">
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

              <FormGroup label="Required KYC Tier">
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
            </div>
          </FormCardLayout>

          {/* SECTION 3: BORROWING LIMITS & MULTIPLIERS */}
          <FormCardLayout
            id="multipliers"
            title="Borrowing Limits & Eligibility"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Limit Calculation Method">
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
                  <option value="fixed">Fixed Step Multiplier</option>
                </select>
              </FormGroup>

              <FormGroup label="Limit Based On">
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
                  <option value="savings">Member Savings / Deposits</option>
                </select>
              </FormGroup>

              <FormGroup label="Starting Limit Base Amount">
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

              <FormGroup label="Limit Increment Step Amount">
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    x
                  </span>
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    x
                  </span>
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
                  <span className="absolute right-4 text-xs font-bold text-slate-400">
                    x
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Minimum Membership Duration">
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

              <FormGroup label="Minimum Shares Required">
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

              <FormGroup label="Minimum Savings Required">
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

              <FormGroup label="Max Loan-to-Shares Ratio">
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

              <FormGroup label="Max Loan-to-Savings Ratio">
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
                  label="Reset limit multipliers back to starting baseline upon default"
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
          <FormCardLayout id="amortization" title="Interest Rates & Fees">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Interest Rate">
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

              <FormGroup label="Interest Calculation Method">
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

              <FormGroup label="Repayment Frequency">
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
                  <option value="percentage">Percentage</option>
                </select>
              </FormGroup>

              <FormGroup label="Processing Fee">
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

              <FormGroup label="Insurance Fee">
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
                  label="Deduct processing fee upfront from loan amount"
                  checked={formData.deduct_fee_from_principal}
                  onChange={(checked) =>
                    setFormData({
                      ...formData,
                      deduct_fee_from_principal: checked,
                    })
                  }
                />
                <FormCheckbox
                  label="Requires active insurance policy coverage"
                  checked={formData.has_insurance}
                  onChange={(checked) =>
                    setFormData({ ...formData, has_insurance: checked })
                  }
                />
              </div>
            </div>
          </FormCardLayout>

          {/* SECTION 5: RISK & PENALTY CONTROL */}
          <FormCardLayout id="risk" title="Penalties & Risk Safeguards">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Repayment Grace Period">
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

              <FormGroup label="Penalty Calculation Method">
                <select
                  value={formData.penalty_type}
                  onChange={(e) =>
                    setFormData({ ...formData, penalty_type: e.target.value })
                  }
                  className="custom-select-box font-sans"
                >
                  <option value="percentage_of_outstanding">
                    Percentage of Outstanding Balance
                  </option>
                </select>
              </FormGroup>

              <FormGroup label="Penalty Rate">
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

              <FormGroup label="Maximum Penalty Cap">
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

              <FormGroup label="Penalty Grace Period">
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

              <FormGroup label="Penalty Cap Duration">
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

              <FormGroup label="Moratorium Period">
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

              <FormGroup label="Interest During Moratorium">
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
                  label="Charge penalties on late payments"
                  checked={formData.has_penalty}
                  onChange={(checked) =>
                    setFormData({ ...formData, has_penalty: checked })
                  }
                />
                <FormCheckbox
                  label="Block borrower if they have an active loan default"
                  checked={formData.block_if_defaulted}
                  onChange={(checked) =>
                    setFormData({ ...formData, block_if_defaulted: checked })
                  }
                />
                <FormCheckbox
                  label="Block borrower if their chosen guarantor has defaulted"
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
          <FormCardLayout id="underwriting" title="Approvals & Guarantor Rules">
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
                    Committee & Manager Approval
                  </option>
                </select>
              </FormGroup>

              <FormGroup label="Committee Approvals Required">
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

              <FormGroup label="Committee Group Identifier">
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

              <FormGroup label="Min Repayment Required Before Re-applying">
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

              <FormGroup label="Minimum Guarantors Required">
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
                    Guarantors
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Guarantors Allowed">
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
                    Guarantors
                  </span>
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Require Guarantors Above Amount">
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

              <FormGroup label="Guarantor Coverage">
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

              <FormGroup label="Min Repayment Required for Top-Up">
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
                <FormGroup label="Allowed Disbursement Channels">
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
                          <span>{method}</span>
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
                <FormGroup label="Collateral Description">
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
                    label="Manager Approval"
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
                    label="Requires Guarantors"
                    checked={formData.requires_guarantor}
                    onChange={(checked) =>
                      setFormData({ ...formData, requires_guarantor: checked })
                    }
                  />
                </div>
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Auto Disburse"
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
                    label="Requires Physical Collateral"
                    checked={formData.requires_collateral}
                    onChange={(checked) =>
                      setFormData({ ...formData, requires_collateral: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </FormCardLayout>

          <FormCardLayout id="general" title="Loan Terms & Conditions">
            <FormGroup label="Loan Terms & Conditions" error="">
              <textarea
                value={formData.terms_and_conditions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    terms_and_conditions: e.target.value,
                  })
                }
                rows={3}
                placeholder="Outline or paste the loan terms and conditions here..."
                className="w-full bg-white border-2 rounded-2xl p-4 text-sm font-medium outline-none transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/5 border-slate-100"
              />
            </FormGroup>
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
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading}
              className="h-11 px-6 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-97 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <span>Saving...</span>
                  <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                </>
              ) : (
                <>
                  <span>Modify Product</span>
                  <ArrowUpRight size={14} />
                </>
              )}
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
