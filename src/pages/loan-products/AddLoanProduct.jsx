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
import { useToast } from "../../contexts/ToastProvider";
import { useNavigate } from "react-router-dom";
import { addLoanProduct } from "../../sdk/loan-products/loan-products";
import { useMutation } from "react-query";

export default function AddLoanProduct() {
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_code: "",
    product_name: "",
    description: "",
    features: null,
    terms_and_conditions: null,
    org_code: "BA208",
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
    requires_collateral: false,
    requires_documents: false,
    collateral_description: "",
  });

  const handleBlur = (field, value) => {
    let errorMsg = "";

    // 1. Global Required Field Validation
    if (!value && value !== 0) {
      errorMsg = "This field is required";
    } else {
      // 2. Specific Logical Boundary Validations
      if (
        field === "max_amount" &&
        Number(value) < Number(formData.min_amount)
      ) {
        errorMsg = "Maximum amount cannot be less than minimum amount";
      }
      if (
        field === "max_period" &&
        Number(value) < Number(formData.min_period)
      ) {
        errorMsg = "Maximum term cannot be less than minimum term";
      }
      if (
        field === "max_penalty_rate" &&
        Number(value) < Number(formData.penalty_value)
      ) {
        errorMsg =
          "Maximum penalty cap cannot be lower than the base penalty rate";
      }
      if (
        field === "max_guarantors" &&
        Number(value) < Number(formData.min_guarantors)
      ) {
        errorMsg = "Maximum guarantors cannot be fewer than minimum guarantors";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const inputClass = (field) =>
    `custom-form-input ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10 bg-red-50/10"
        : ""
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutate();
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: ["edit loan product"],
    mutationFn: async () => {
      const response = await addLoanProduct(
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
        formData?.committee_group_id,
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
        formData?.blocked_concurrent_loan_types,
        formData?.allowed_concurrent_loan_types,
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
        description: `${formData.product_name} has been successfully added onto the ecosystem platform.`,
      });
      navigate(`/admin/loan-products`);
    },
    onError: (error) => {
      showToast({
        title: "Loan Products processing failed",
        type: "error",
        position: "top-right",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const noSpinnerUtility =
    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="w-full space-y-5 font-sans antialiased text-slate-800">
      {/* HEADER SECTION PANEL */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create Loan Product
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Set up borrowing limits, interest rates, late fees, and approval
            rules for this loan product.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-12 space-y-8">
          {/* SECTION 1: GENERAL PRODUCT CONFIG */}
          <FormCardLayout id="general" title="Basic Product Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Product Code" error={errors.product_code}>
                <InputWrapper icon={<Settings size={18} />}>
                  <input
                    type="text"
                    value={formData.product_code}
                    onChange={(e) =>
                      setFormData({ ...formData, product_code: e.target.value })
                    }
                    onBlur={(e) => handleBlur("product_code", e.target.value)}
                    placeholder="e.g. development_loan"
                    className={inputClass("product_code")}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Product Name" error={errors.product_name}>
                <InputWrapper icon={<FileText size={18} />}>
                  <input
                    type="text"
                    value={formData.product_name}
                    onChange={(e) =>
                      setFormData({ ...formData, product_name: e.target.value })
                    }
                    onBlur={(e) => handleBlur("product_name", e.target.value)}
                    placeholder="e.g. Development Loan"
                    className={inputClass("product_name")}
                  />
                </InputWrapper>
              </FormGroup>

              <div className="md:col-span-2">
                <FormGroup label="Description" error={errors.description}>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    onBlur={(e) => handleBlur("description", e.target.value)}
                    rows={3}
                    placeholder="Describe who this loan is for and what it is generally used for..."
                    className={`w-full bg-white border-2 rounded-2xl p-4 text-sm font-medium outline-none transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/5 ${
                      errors.description ? "border-red-400" : "border-slate-100"
                    }`}
                  />
                </FormGroup>
              </div>

              {/* FULL WIDTH SPAN FOR LAST ITEM */}
              <div className="md:col-span-2">
                <FormGroup label="Features" error={errors.features}>
                  <div className="space-y-3">
                    {(formData.features || []).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const updated = [...formData.features];
                            updated[index] = e.target.value;
                            setFormData({ ...formData, features: updated });
                          }}
                          onBlur={() =>
                            handleBlur("features", formData.features)
                          }
                          placeholder={`Feature #${index + 1}`}
                          className={`w-full bg-white border-2 rounded-xl p-3 text-sm font-medium outline-none transition-all focus:border-secondary ${
                            errors.features
                              ? "border-red-400"
                              : "border-slate-100"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.features.filter(
                              (_, i) => i !== index,
                            );
                            setFormData({ ...formData, features: updated });
                            handleBlur("features", updated);
                          }}
                          className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          features: [...(formData.features || []), ""],
                        })
                      }
                      className="text-xs font-bold text-secondary hover:underline pt-1"
                    >
                      + Add Feature
                    </button>
                  </div>
                </FormGroup>
              </div>
            </div>
          </FormCardLayout>

          <FormCardLayout id="limits" title="Loan Limits & Terms">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Minimum Loan Amount" error={errors.min_amount}>
                <InputWrapper icon={<Coins size={18} />}>
                  <input
                    type="number"
                    value={formData.min_amount}
                    onChange={(e) =>
                      setFormData({ ...formData, min_amount: e.target.value })
                    }
                    onBlur={(e) => handleBlur("min_amount", e.target.value)}
                    placeholder="e.g. 50000.00"
                    className={`${inputClass("min_amount")} pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="Maximum Loan Amount" error={errors.max_amount}>
                <InputWrapper icon={<Coins size={18} />}>
                  <input
                    type="number"
                    value={formData.max_amount}
                    onChange={(e) =>
                      setFormData({ ...formData, max_amount: e.target.value })
                    }
                    onBlur={(e) => handleBlur("max_amount", e.target.value)}
                    placeholder="e.g. 5000000.00"
                    className={`${inputClass("max_amount")} pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Minimum Term (Months)"
                error={errors.min_period}
              >
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.min_period}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_period: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) => handleBlur("min_period", e.target.value)}
                    placeholder="e.g. 6"
                    className={`${inputClass("min_period")} pr-16 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Maximum Term (Months)"
                error={errors.max_period}
              >
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.max_period}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_period: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) => handleBlur("max_period", e.target.value)}
                    placeholder="e.g. 60"
                    className={`${inputClass("max_period")} pr-16 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Max Active Loans of This Type"
                error={errors.max_active_loans_of_type}
              >
                <InputWrapper icon={<Layers size={18} />}>
                  <input
                    type="number"
                    value={formData.max_active_loans_of_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_active_loans_of_type: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("max_active_loans_of_type", e.target.value)
                    }
                    placeholder="e.g. 1"
                    className={`${inputClass("max_active_loans_of_type")} ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Total Max Active Loans Allowed"
                error={errors.max_total_active_loans}
              >
                <InputWrapper icon={<Layers3 size={18} />}>
                  <input
                    type="number"
                    value={formData.max_total_active_loans}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_total_active_loans: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("max_total_active_loans", e.target.value)
                    }
                    placeholder="e.g. 2"
                    className={`${inputClass("max_total_active_loans")} ${noSpinnerUtility}`}
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
                  <option value="multiplier">Based on Multiplier</option>
                  <option value="incremental">Incremental</option>
                  <option value="fixed">Fixed Amount</option>
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
                  <option value="shares">Member Share Capital</option>
                </select>
              </FormGroup>

              <FormGroup
                label="Starting Loan Limit"
                error={errors.limit_start_amount}
              >
                <InputWrapper icon={<Coins size={18} />}>
                  <input
                    type="number"
                    value={formData.limit_start_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limit_start_amount: e.target.value,
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("limit_start_amount", e.target.value)
                    }
                    placeholder="e.g. 0.00"
                    className={`${inputClass("limit_start_amount")} ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Limit Increase Step"
                error={errors.limit_increment_amount}
              >
                <InputWrapper icon={<Coins size={18} />}>
                  <input
                    type="number"
                    value={formData.limit_increment_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limit_increment_amount: e.target.value,
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("limit_increment_amount", e.target.value)
                    }
                    placeholder="e.g. 0.00"
                    className={`${inputClass("limit_increment_amount")} ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Starting Multiplier"
                error={errors.limit_start_multiplier}
              >
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
                    onBlur={(e) =>
                      handleBlur("limit_start_multiplier", e.target.value)
                    }
                    placeholder="e.g. 1.5000"
                    className={`${inputClass("limit_start_multiplier")} pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Multiplier Increase Step"
                error={errors.limit_increment_multiplier}
              >
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
                    onBlur={(e) =>
                      handleBlur("limit_increment_multiplier", e.target.value)
                    }
                    placeholder="e.g. 0.5000"
                    className={`${inputClass("limit_increment_multiplier")} pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Maximum Multiplier Cap"
                error={errors.limit_max_multiplier}
              >
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
                    onBlur={(e) =>
                      handleBlur("limit_max_multiplier", e.target.value)
                    }
                    placeholder="e.g. 3.0000"
                    className={`${inputClass("limit_max_multiplier")} pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Minimum Membership Required (Months)"
                error={errors.min_membership_months}
              >
                <InputWrapper icon={<Users size={18} />}>
                  <input
                    type="number"
                    value={formData.min_membership_months}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_membership_months: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("min_membership_months", e.target.value)
                    }
                    placeholder="e.g. 6"
                    className={`${inputClass("min_membership_months")} pr-16 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Minimum Shares Balance"
                error={errors.min_shares_amount}
              >
                <InputWrapper icon={<Coins size={18} />}>
                  <input
                    type="number"
                    value={formData.min_shares_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_shares_amount: e.target.value,
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("min_shares_amount", e.target.value)
                    }
                    placeholder="e.g. 10000.00"
                    className={`${inputClass("min_shares_amount")} pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Minimum Savings Balance"
                error={errors.min_savings_amount}
              >
                <InputWrapper icon={<Coins size={18} />}>
                  <input
                    type="number"
                    value={formData.min_savings_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_savings_amount: e.target.value,
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("min_savings_amount", e.target.value)
                    }
                    placeholder="e.g. 20000.00"
                    className={`${inputClass("min_savings_amount")} pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Maximum Loan-to-Shares Ratio"
                error={errors.max_loan_to_shares_ratio}
              >
                <InputWrapper icon={<Coins size={18} />}>
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
                    onBlur={(e) =>
                      handleBlur("max_loan_to_shares_ratio", e.target.value)
                    }
                    placeholder="e.g. 5.0000"
                    className={`${inputClass("max_loan_to_shares_ratio")} pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Maximum Loan-to-Savings Ratio"
                error={errors.max_loan_to_savings_ratio}
              >
                <InputWrapper icon={<Coins size={18} />}>
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
                    onBlur={(e) =>
                      handleBlur("max_loan_to_savings_ratio", e.target.value)
                    }
                    placeholder="e.g. 0.0000"
                    className={`${inputClass("max_loan_to_savings_ratio")} pr-10 ${noSpinnerUtility}`}
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
              <FormGroup label="Interest Rate" error={errors.interest_rate}>
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
                    onBlur={(e) => handleBlur("interest_rate", e.target.value)}
                    placeholder="e.g. 1.5000"
                    className={`${inputClass("interest_rate")} pr-14 ${noSpinnerUtility}`}
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
                  <option value="fixed">Fixed Amount</option>
                </select>
              </FormGroup>

              <FormGroup
                label="Processing Fee Value"
                error={errors.processing_fee_value}
              >
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
                    onBlur={(e) =>
                      handleBlur("processing_fee_value", e.target.value)
                    }
                    placeholder="e.g. 1.0000"
                    className={`${inputClass("processing_fee_value")} pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Insurance Cover Rate (%)"
                error={errors.insurance_rate}
              >
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
                    onBlur={(e) => handleBlur("insurance_rate", e.target.value)}
                    placeholder="e.g. 0.5000"
                    className={`${inputClass("insurance_rate")} pr-10 ${noSpinnerUtility}`}
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
              <FormGroup
                label="Payment Grace Period (Days)"
                error={errors.grace_period_days}
              >
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.grace_period_days}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        grace_period_days: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("grace_period_days", e.target.value)
                    }
                    placeholder="e.g. 30"
                    className={`${inputClass("grace_period_days")} pr-12 ${noSpinnerUtility}`}
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
                  <option value="fixed_amount">
                    Fixed Amount for a Specific Period
                  </option>
                </select>
              </FormGroup>

              <FormGroup label="Penalty Rate (%)" error={errors.penalty_value}>
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
                    onBlur={(e) => handleBlur("penalty_value", e.target.value)}
                    placeholder="e.g. 5.0000"
                    className={`${inputClass("penalty_value")} pr-14 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Maximum Penalty Cap (%)"
                error={errors.max_penalty_rate}
              >
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
                    onBlur={(e) =>
                      handleBlur("max_penalty_rate", e.target.value)
                    }
                    placeholder="e.g. 20.0000"
                    className={`${inputClass("max_penalty_rate")} pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Penalty Grace Period (Days)"
                error={errors.penalty_grace_period_days}
              >
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.penalty_grace_period_days}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        penalty_grace_period_days: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("penalty_grace_period_days", e.target.value)
                    }
                    placeholder="e.g. 0"
                    className={`${inputClass("penalty_grace_period_days")} pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Maximum Days to Charge Penalties"
                error={errors.penalty_cap_days}
              >
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.penalty_cap_days}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        penalty_cap_days: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("penalty_cap_days", e.target.value)
                    }
                    placeholder="e.g. 0"
                    className={`${inputClass("penalty_cap_days")} pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Payment Holiday / Grace Period (Months)"
                error={errors.moratorium_months}
              >
                <InputWrapper icon={<Calendar size={18} />}>
                  <input
                    type="number"
                    value={formData.moratorium_months}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        moratorium_months: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("moratorium_months", e.target.value)
                    }
                    placeholder="e.g. 0"
                    className={`${inputClass("moratorium_months")} pr-12 ${noSpinnerUtility}`}
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
                  <option value="half_interest">Charge half Interest</option>
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
                  <option value="automatic_processing">
                    Automatic Processing
                  </option>
                  <option value="automatic_disbursement">
                    Automatic Processing & Disbursement
                  </option>
                </select>
              </FormGroup>

              <FormGroup
                label="Required Committee Approvals"
                error={errors.committee_approvals_required}
              >
                <InputWrapper icon={<Users size={18} />}>
                  <input
                    type="number"
                    value={formData.committee_approvals_required}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        committee_approvals_required: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("committee_approvals_required", e.target.value)
                    }
                    placeholder="e.g. 3"
                    className={`${inputClass("committee_approvals_required")} pr-14 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Minimum Paid Before Re-applying (%)"
                error={errors.min_repayment_percent_before_reapply}
              >
                <InputWrapper icon={<Coins size={18} />}>
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
                    onBlur={(e) =>
                      handleBlur(
                        "min_repayment_percent_before_reapply",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. 100.0000"
                    className={`${inputClass("min_repayment_percent_before_reapply")} pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Minimum Number of Guarantors"
                error={errors.min_guarantors}
              >
                <InputWrapper icon={<Users size={18} />}>
                  <input
                    type="number"
                    value={formData.min_guarantors}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_guarantors: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) => handleBlur("min_guarantors", e.target.value)}
                    placeholder="e.g. 2"
                    className={`${inputClass("min_guarantors")} pr-20 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Maximum Number of Guarantors"
                error={errors.max_guarantors}
              >
                <InputWrapper icon={<Users size={18} />}>
                  <input
                    type="number"
                    value={formData.max_guarantors}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_guarantors: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                    onBlur={(e) => handleBlur("max_guarantors", e.target.value)}
                    placeholder="e.g. 4"
                    className={`${inputClass("max_guarantors")} pr-20 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Require Guarantors Above This Amount"
                error={errors.guarantor_required_above_amount}
              >
                <InputWrapper icon={<Coins size={18} />}>
                  <input
                    type="number"
                    value={formData.guarantor_required_above_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guarantor_required_above_amount: e.target.value,
                      })
                    }
                    onBlur={(e) =>
                      handleBlur(
                        "guarantor_required_above_amount",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. 0.00"
                    className={`${inputClass("guarantor_required_above_amount")} pr-12 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Guarantor Guarantee Coverage (%)"
                error={errors.guarantor_coverage_percent}
              >
                <InputWrapper icon={<Coins size={18} />}>
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
                    onBlur={(e) =>
                      handleBlur("guarantor_coverage_percent", e.target.value)
                    }
                    placeholder="e.g. 100.0000"
                    className={`${inputClass("guarantor_coverage_percent")} pr-10 ${noSpinnerUtility}`}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup
                label="Minimum Paid Before Top-Up (%)"
                error={errors.min_repayment_percent_for_topup}
              >
                <InputWrapper icon={<Coins size={18} />}>
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
                    onBlur={(e) =>
                      handleBlur(
                        "min_repayment_percent_for_topup",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. 50.0000"
                    className={`${inputClass("min_repayment_percent_for_topup")} pr-10 ${noSpinnerUtility}`}
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
                <FormGroup
                  label="Collateral Requirements Description"
                  error={errors.collateral_description}
                >
                  <textarea
                    value={formData.collateral_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        collateral_description: e.target.value,
                      })
                    }
                    onBlur={(e) =>
                      handleBlur("collateral_description", e.target.value)
                    }
                    rows={2}
                    placeholder="e.g. Logbook, title deed, or other acceptable physical collateral..."
                    className={`w-full bg-slate-50 border rounded-2xl p-4 text-sm font-medium outline-none transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/5 ${
                      errors.collateral_description
                        ? "border-red-400"
                        : "border-slate-100"
                    }`}
                  />
                </FormGroup>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100/60">
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
                <div className="md:col-span-1">
                  <FormCheckbox
                    label="Requires documents"
                    checked={formData.requires_documents}
                    onChange={(checked) =>
                      setFormData({ ...formData, requires_documents: checked })
                    }
                  />
                </div>
                <div className="md:col-span-2 mt-1">
                  <FormCheckbox
                    label="Requires physical collaterals"
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
            <FormGroup
              label="Loan Terms & Conditions"
              error={errors.description}
            >
              <textarea
                value={formData.terms_and_conditions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    terms_and_conditions: e.target.value,
                  })
                }
                onBlur={(e) =>
                  handleBlur("terms_and_conditions", e.target.value)
                }
                rows={3}
                placeholder="Outline or paste the loan terms and conditions here..."
                className={`w-full bg-white border-2 rounded-2xl p-4 text-sm font-medium outline-none transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/5 ${
                  errors.description ? "border-red-400" : "border-slate-100"
                }`}
              />
            </FormGroup>
          </FormCardLayout>

          {/* LOWER FIXED ACTIONS COMMAND DOCK BAR */}
          <div className="bg-white rounded-[24px] border border-slate-200/60 p-4 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <button
              onClick={() => navigate(-1)}
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
                  <span>Launching...</span>
                  <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                </>
              ) : (
                <>
                  <span>Launch Product</span>
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

const FormGroup = ({ label, error, children }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    {children}
    {error && (
      <span className="text-xs font-medium text-red-500 mt-1 animate-fadeIn">
        {error}
      </span>
    )}
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
    <span className="leading-tight truncate">{label}</span>
  </button>
);
