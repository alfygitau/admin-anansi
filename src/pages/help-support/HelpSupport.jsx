import React, { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  Search,
  HelpCircle,
  ShieldAlert,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function HelpCenterWorkspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqs, setOpenFaqs] = useState([]);

  const toggleFaq = (index) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqData = [
    {
      category: "Account Safety & Onboarding",
      questions: [
        {
          q: "How do I clear biometric verification validation errors during selfie uploads?",
          a: "Biometric drops usually occur due to low lighting or backlighting. Ensure you are in a well-lit room, keep your face entirely within the camera bounding box frame, and do not wear caps or sunglasses. If the issue persists, try switching to a mobile device browser using our companion QR sync link.",
        },
        {
          q: "Why is my profile status marked as 'Manual Review Pending'?",
          a: "If the national regulatory database check flags a slight mismatch between your input registration text and your official government ID card data, our compliance team manually validates the files. This security operational pass usually takes less than 2 hours during normal business hours.",
        },
        {
          q: "How do I securely reset my forgotten transaction or account access PIN?",
          a: "Click 'Forgot PIN' on the secure login screen. The system will dispatch an automated verification OTP code to your registered mobile number. Once verified, you will be required to answer your security question metrics and complete a brief face-match biometric check to authenticate the new PIN creation.",
        },
        {
          q: "Can I change the primary mobile phone number linked to my Sacco account?",
          a: "Because your phone number acts as your primary ledger identifier and M-PESA clearing destination, changing it requires an official audit pass. You must upload a certified copy of your ID card and a formal request letter through the Account Settings portal or visit an branches desk.",
        },
        {
          q: "Why is the system rejecting my front or back ID card document uploads?",
          a: "The document scanning parser expects clear, uncropped images where all four physical corners of the ID card are completely visible. Ensure there is no camera flash glare obscuring your name or ID number, and that the text is fully legible before hitting submit.",
        },
        {
          q: "What causes my account to get locked, and how do I restore user access?",
          a: "Accounts are automatically isolated after 3 consecutive failed login credentials or PIN entry attempts to protect against brute-force intrusion. To self-unlock, use the self-service verification pipeline on the app homepage, or contact support to verify your identity parameters manually.",
        },
        {
          q: "Can I register multiple distinct Sacco member nodes using the same ID number?",
          a: "No. The system core ledger enforces a unique constraint key configuration mapping one national identification number (ID/Passport) to exactly one core member node profile. Duplicate application lines will be caught and instantly rejected at the underwriting level.",
        },
        {
          q: "How do I update my registered Next of Kin or beneficiary ledger details?",
          a: "Navigate to Profile > Member Management > Next of Kin. You can update or replace beneficiary lines dynamically. Note that your changes are written to the live audit trail ledger instantly and will require a secondary authentication PIN signature check to finalize.",
        },
        {
          q: "What is the mandatory membership entry fee and is it refundable if I exit?",
          a: "The one-time structural membership admission fee is used to clear initial registration validation costs, system onboarding overheads, and KYC processing passes. Per our institutional bylaws, this registration premium is entirely non-refundable upon member exit.",
        },
        {
          q: "How do I enable or disable native app biometrics (FaceID/TouchID) for login?",
          a: "Go to Settings > Authentication > Security Preferences. Switch on the 'Enable Biometric Login' toggle. The app will sync seamlessly with your smartphone's native operating system secure enclave to clear all future access queries without manual input passwords.",
        },
      ],
    },
    {
      category: "Loans & Disbursals",
      questions: [
        {
          q: "How fast will funds hit my mobile wallet after a payout approval?",
          a: "Once approved, mobile wallet payouts (M-PESA) initiate instantly and land in your wallet within 5 to 15 minutes. Bank wire transfers settle via internal clearing windows and can take up to 24 hours depending on processing schedules.",
        },
        {
          q: "What happens if a selected guarantor declines my liability endorsement request?",
          a: "If a guarantor declines the request, your loan application drops back into draft mode. You will receive an instant notification ring to replace them with a new qualified member node from your dashboard panel.",
        },
        {
          q: "How does the system calculate my dynamic borrowing and loan limits?",
          a: "Your borrowing cap is governed by our 3x multiplier underwriting matrix rule applied directly against your total active non-withdrawable deposits. This ceiling value is dynamically adjusted down or up based on your external CRB credit history rating and overall payment track performance.",
        },
        {
          q: "Are there any administrative penalties or fees for early loan repayment?",
          a: "No. We encourage early loan settlement. You can pay off the outstanding facility principal balance at any point during the term structure lifecycle. The system recalculates interest dynamically, saving you money on unamortized term fractions with zero hidden penalties.",
        },
        {
          q: "What are the structural penalties if I miss a scheduled repayment installment?",
          a: "Late installments are flagged on the day of default. A standard 10% late penalty fee is levied on the specific past-due principal amount block. If an account remains in arrears beyond 30 days, the recovery protocol begins, and notifications are sent to your guarantors.",
        },
        {
          q: "Can I operate two active advanced credit facility loans at the same time?",
          a: "Members can access a secondary development or emergency facility line only if their total consolidated balance falls within their approved borrowing multiplier limit. Additionally, your primary development loan must be performing cleanly with no historical delinquency flags.",
        },
        {
          q: "Why was my credit application declined if I have a high available borrowing limit?",
          a: "An available borrowing limit does not guarantee automatic execution authorization. Applications can be blocked during final compliance passes if you have active external default reports on CRB tracking nodes, or if your chosen guarantors do not hold sufficient unencumbered deposit buffers.",
        },
        {
          q: "Where do I track my active remaining loan balance and amortization schedule?",
          a: "Navigate to Dashboard > View Loans Dashboard > Active Facilities. Select the target loan code to access a live tracker detailing your total principal remaining, accrued interest balances, payment log ledgers, and exact future installment dates.",
        },
        {
          q: "What exact criteria must a member meet to qualify as a guarantor for my loan?",
          a: "A guarantor must be a fully registered, active member node with a status in good standing. Crucially, the portion of their deposits they allocate to back your loan must be unencumbered—meaning those funds are not already backing their own active facilities or other members' loans.",
        },
        {
          q: "What should I do if my bank transfer disbursal fails or is marked as 'Dropped'?",
          a: "If a bank transfer disbursal fails due to an invalid routing branch or account number anomaly, the funds are automatically reversed to our core clearing pool. Our system will flag the error, restore your loan status to a pending correction state, and prompt you to verify your banking details.",
        },
      ],
    },
  ];

  let flatIndex = 0;

  return (
    <div className="w-full space-y-3 antialiased text-slate-800">
      <div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block select-none">
          Operations Help Desk
        </span>
        <h1 className="text-xl font-black tracking-tight text-slate-900 mt-0.5">
          Support Workspace
        </h1>
      </div>
      {/* CONTACT QUICK-CARDS ROW CONTAINER */}
      <div className="flex flex-row overflow-x-auto sm:grid sm:grid-cols-3 gap-4 w-full items-stretch snap-x snap-mandatory sm:pb-0 scrollbar-thin">
        {/* CARD A: WHATSAPP */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between shadow-3xs group relative overflow-hidden snap-start shrink-0 w-[280px] sm:w-auto">
          <div className="space-y-3">
            <div className="size-10 rounded-xl bg-emerald-50 border border-emerald-100/60 flex items-center justify-center text-emerald-600 shadow-3xs">
              <MessageCircle size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-900">
                  WhatsApp Live Chat
                </h3>
                <span className="flex size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-normal">
                Direct secure connection pipeline for quick interactive system
                resets.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between text-[11px] font-bold text-emerald-600">
            <span className="font-mono text-slate-400 font-normal">
              SLA: &lt; 5 Mins
            </span>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Start Chat</span>
              <ArrowRight
                size={12}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* CARD B: HOTLINE */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between shadow-3xs group relative overflow-hidden snap-start shrink-0 w-[280px] sm:w-auto">
          <div className="space-y-3">
            <div className="size-10 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center text-[#074073] shadow-3xs">
              <Phone size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Official Voice Hotline
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-normal">
                Call center voice desk channel operational for complex ledger
                tracing.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between text-[11px] font-bold text-[#074073]">
            <span className="font-mono text-slate-400 font-normal">
              Mon-Fri 8am-5pm
            </span>
            <a
              href="tel:+254712345678"
              className="flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>+254 712 345 678</span>
            </a>
          </div>
        </div>

        {/* CARD C: EMAIL */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between shadow-3xs group relative overflow-hidden snap-start shrink-0 w-[280px] sm:w-auto">
          <div className="space-y-3">
            <div className="size-10 rounded-xl bg-purple-50 border border-purple-100/60 flex items-center justify-center text-purple-600 shadow-3xs">
              <Mail size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Email Desk Service
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-normal">
                Submit official onboarding overrides or corporate file
                printouts.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between text-[11px] font-bold text-purple-600">
            <span className="font-mono text-slate-400 font-normal">
              SLA: &lt; 2 Hours
            </span>
            <a
              href="mailto:support@sacco.com"
              className="flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Open Ticket</span>
              <ArrowRight
                size={12}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>

      {/* CORE FAQ ACCORDIONS */}
      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 select-none">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8 w-full">
          {faqData.map((categoryBlock, catIdx) => {
            const filteredQuestions = categoryBlock.questions.filter(
              (item) =>
                item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.a.toLowerCase().includes(searchQuery.toLowerCase()),
            );

            if (filteredQuestions.length === 0) return null;

            return (
              <div key={catIdx} className="space-y-3.5">
                <h3 className="text-xs font-black text-[#074073] bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 inline-block select-none">
                  {categoryBlock.category}
                </h3>

                {/* FIXED: Removed parent borders, parent overflow constraints, and parent backgrounds */}
                <div className="space-y-2.5 w-full">
                  {filteredQuestions.map((faqItem) => {
                    const currentIndex = flatIndex++;
                    const isOpen = openFaqs.includes(currentIndex);

                    return (
                      /* FIXED: Individual detached card wrapper with separate shadow, radius, and boundary borders */
                      <div
                        key={currentIndex}
                        className="w-full bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-3xs transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(currentIndex)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 font-bold text-xs text-slate-800 hover:bg-slate-50/40 cursor-pointer transition-all outline-none"
                        >
                          <span className="tracking-tight text-[12px]">
                            {faqItem.q}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#074073]" : ""}`}
                          />
                        </button>

                        <div
                          className={`grid transition-all duration-200 ease-in-out bg-slate-50/30 ${
                            isOpen
                              ? "grid-rows-[1fr] border-t border-slate-100/60 opacity-100"
                              : "grid-rows-[0fr] opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="p-5 text-[11px] font-medium text-slate-500 leading-relaxed max-w-4xl">
                              {faqItem.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {flatIndex === 0 && (
            <div className="p-8 text-center bg-slate-50 border border-slate-100 rounded-2xl select-none font-medium text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
              <ShieldAlert size={20} className="text-slate-300" />
              <span>
                No direct FAQ items match your matching search parameters
                criteria string.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
