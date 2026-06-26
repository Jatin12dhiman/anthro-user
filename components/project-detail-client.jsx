"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Download, Award, CheckCircle, ArrowRight } from "@/components/icons";

const STATUS_STYLE = {
  Open: "bg-moss/20 text-marigold",
  Upcoming: "bg-marigold/20 text-walnut",
  Completed: "bg-white/10 text-frost-100",
};

export default function ProjectDetailClient({ project }) {
  const [enrolled, setEnrolled] = useState(false);
  const [seatsRemaining, setSeatsRemaining] = useState(project.seats.remaining);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("details"); // details, payment, process, success
  const [paymentOption, setPaymentOption] = useState("card");
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");

  const isCompleted = project.status === "Completed";
  const isUpcoming = project.status === "Upcoming";

  const handleApplyClick = (e) => {
    e.preventDefault();
    if (isCompleted || isUpcoming || seatsRemaining === 0 || enrolled) return;
    setCheckoutStep("details");
    setModalOpen(true);
  };

  const startCheckoutPayment = () => {
    setCheckoutStep("payment");
  };

  const runDummyPayment = () => {
    setCheckoutStep("process");
    setTimeout(() => {
      setCheckoutStep("success");
      setEnrolled(true);
      setSeatsRemaining((prev) => Math.max(0, prev - 1));
    }, 2500);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Dark Hero Banner */}
      <section className="grain relative overflow-hidden bg-lagoon-900 text-frost-50 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div
          className="pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full opacity-35 blur-[120px]"
          style={{ background: "radial-gradient(circle, #576f3f, transparent 70%)" }}
        />
        
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <Link 
            href="/projects" 
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-marigold hover:text-frost transition-colors mb-6"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> 
            Back to all projects
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${STATUS_STYLE[project.status]}`}>
              <span className="relative flex h-1.5 w-1.5">
                {project.status === "Open" && !enrolled && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75"></span>
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current"></span>
              </span>
              {enrolled ? "Enrolled" : project.status}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-frost-50">
              {project.field}
            </span>
            {project.certificate && (
              <span className="shrink-0 flex items-center gap-1 rounded-xl bg-marigold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-marigold">
                <Award className="h-3.5 w-3.5" />Verified Certificate
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white max-w-4xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Left/Middle Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Description */}
              <div className="rounded-lg border border-[#e3dfd5] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <h2 className="text-xs font-bold uppercase tracking-widest text-moss mb-4">Project Overview</h2>
                <p className="text-base sm:text-lg leading-relaxed text-lagoon/75 font-light">
                  {project.description}
                </p>
              </div>

              {/* Research Guidelines & Instructions */}
              <div className="rounded-lg border border-[#e3dfd5] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <h2 className="text-xs font-bold uppercase tracking-widest text-moss mb-5">Research Guidelines & Instructions</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-moss/10 text-moss text-xs font-bold">1</div>
                    <div>
                      <h4 className="text-sm font-semibold text-lagoon-900">Pre-requisite Study & Reading</h4>
                      <p className="text-xs text-lagoon/60 mt-1 leading-relaxed">
                        Read the downloaded Project Guideline & instructions sheet before beginning data acquisition. Familiarize yourself with standard survey protocols, ethics approvals, and sample sheets.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-moss/10 text-moss text-xs font-bold">2</div>
                    <div>
                      <h4 className="text-sm font-semibold text-lagoon-900">Field Data Acquisition</h4>
                      <p className="text-xs text-lagoon/60 mt-1 leading-relaxed">
                        Acquire raw data using the web-based logger or verified Google Forms connector. Ensure correct timestamps, geolocation markers (if required), and integrity criteria parameters.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-moss/10 text-moss text-xs font-bold">3</div>
                    <div>
                      <h4 className="text-sm font-semibold text-lagoon-900">Weekly Progress Syncs</h4>
                      <p className="text-xs text-lagoon/60 mt-1 leading-relaxed">
                        Your Project Lead/PI will review submission milestones weekly. Make necessary edits or changes according to review comments inside your Central Dashboard portal.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-moss/10 text-moss text-xs font-bold">4</div>
                    <div>
                      <h4 className="text-sm font-semibold text-lagoon-900">Final Verification & Certification</h4>
                      <p className="text-xs text-lagoon/60 mt-1 leading-relaxed">
                        On successful data audit approval by the Project Manager, your verifiable Scholarly Certificate will be minted automatically on your portfolio dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Manager Details card */}
              <div className="rounded-lg border border-[#e3dfd5] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row gap-5 items-start">
                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-frost-50 shrink-0 shadow-sm">
                  <Image src={project.pm.avatar} alt={project.pm.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-moss">Project Lead</span>
                  <h3 className="text-lg font-semibold text-lagoon-900 mt-1 leading-snug">{project.pm.name}</h3>
                  <p className="text-xs text-lagoon/60 font-medium">{project.pm.institution}</p>
                  <p className="text-xs text-lagoon/50 mt-3 leading-relaxed">
                    Facilitating data submissions, running validation reviews, and leading coordination for research compliance. Contact them via the portal upon acceptance.
                  </p>
                </div>
              </div>

              {/* Guides / Resources card */}
              {project.guide && (
                <div className="rounded-lg border border-[#e3dfd5] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-moss/10 text-moss">
                      <Download className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-lagoon-900">Project Guideline & Instructions</h4>
                      <p className="text-xs text-lagoon/50 mt-0.5 truncate">{project.guide}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-lagoon/5 pt-6">
                    <span className="text-[11px] text-lagoon/40 font-medium">Excel templates, manuals, and schemas included.</span>
                    <button className="flex items-center gap-1.5 rounded-lg bg-lagoon-900 px-5 py-2.5 text-xs font-semibold text-frost-50 hover:bg-lagoon transition-all cursor-pointer">
                      Download Kit <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right sidebar quick specs */}
            <div className="space-y-6">
              
              {/* Timeline Specifications */}
              <div className="rounded-lg border border-[#e3dfd5] bg-white p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-moss">Project Metadata</h4>
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center gap-3 text-xs text-lagoon/65">
                    <Calendar className="h-4 w-4 text-moss shrink-0" />
                    <span>Application Deadline: <strong className="text-lagoon-900 font-semibold block sm:inline">{project.deadline}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-lagoon/65">
                    <Clock className="h-4 w-4 text-moss shrink-0" />
                    <span>Est. Time Duration: <strong className="text-lagoon-900 font-semibold block sm:inline">{project.duration}</strong></span>
                  </div>
                </div>
              </div>

              {/* Required Skills tags */}
              <div className="rounded-lg border border-[#e3dfd5] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-moss mb-3">Skills Required</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((s) => (
                    <span key={s} className="rounded bg-lagoon/5 px-2.5 py-1 text-xs font-semibold text-lagoon/70">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Seats remaining meter */}
              {!isCompleted && (
                <div className="rounded-lg border border-[#e3dfd5] bg-lagoon/5 p-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span className={seatsRemaining <= 5 && seatsRemaining > 0 ? "text-chestnut animate-pulse" : "text-lagoon-900"}>
                      {seatsRemaining === 0 ? "Full Enrollment" : seatsRemaining <= 5 ? `Only ${seatsRemaining} seats left!` : `${seatsRemaining} seats open`}
                    </span>
                    <span className="text-lagoon/50">{project.seats.total - seatsRemaining}/{project.seats.total} enrolled</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-lagoon/10">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-moss-600 to-moss"
                      style={{ width: `${((project.seats.total - seatsRemaining) / project.seats.total) * 100}%` }}
                    />
                  </div>
                  <p className="mt-3 text-center text-[10px] leading-relaxed text-lagoon/40">
                    Applications are processed on a rolling basis by the project manager.
                  </p>
                </div>
              )}

              {/* Action Apply button */}
              <div className="pt-2">
                <button
                  onClick={handleApplyClick}
                  disabled={isCompleted || seatsRemaining === 0 || enrolled}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    enrolled
                      ? "bg-moss text-white cursor-default"
                      : isCompleted
                      ? "bg-lagoon/10 text-lagoon/35 cursor-default"
                      : isUpcoming
                      ? "border border-lagoon-900 text-lagoon-900 hover:bg-lagoon-900 hover:text-frost-50"
                      : seatsRemaining === 0
                      ? "bg-lagoon/10 text-lagoon/35 cursor-not-allowed"
                      : "bg-gradient-to-r from-lagoon-900 to-lagoon text-frost-50 hover:shadow-[0_12px_28px_-6px_rgba(18,39,52,0.4)] hover:scale-[1.01]"
                  }`}
                >
                  {enrolled
                    ? "✓ Successfully Enrolled"
                    : isCompleted
                    ? "Project Closed"
                    : isUpcoming
                    ? "Notify Me When Open"
                    : seatsRemaining === 0
                    ? "Join Waitlist"
                    : "Apply to Join Project"}
                  {!isCompleted && !enrolled && <ArrowRight className="h-4 w-4 animate-pulse" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── DUMMY CHECKOUT MODAL ──────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-lagoon-900/40 backdrop-blur-sm animate-fade">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl border border-[#e8e5de] overflow-hidden flex flex-col transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#f0ede6] px-6 py-4">
              <h3 className="text-base font-bold text-lagoon-900 uppercase tracking-wide">
                {checkoutStep === "success" ? "Enrollment Approved" : "Research Seat Enrollment"}
              </h3>
              {checkoutStep !== "process" && (
                <button onClick={closeModal} className="text-lagoon/50 hover:text-lagoon-900 transition-colors text-lg cursor-pointer">
                  ✕
                </button>
              )}
            </div>

            {/* Step Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              
              {checkoutStep === "details" && (
                <div className="space-y-5">
                  <div className="bg-lagoon/5 rounded-lg p-4">
                    <p className="text-[10px] font-bold text-moss uppercase tracking-wider">Project Title</p>
                    <p className="text-sm font-semibold text-lagoon-900 mt-1 leading-snug">{project.title}</p>
                    <p className="text-xs text-lagoon/60 mt-1">{project.field} · Guided by {project.pm.name}</p>
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-lagoon-900 uppercase tracking-wider">Enrollment Summary</h4>
                    <div className="flex justify-between text-xs text-lagoon/70">
                      <span>Research Seat Reservation Fee</span>
                      <span>$15.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-lagoon/70">
                      <span>Platform Access & Processing</span>
                      <span>$4.99</span>
                    </div>
                    <div className="flex justify-between text-xs text-moss font-semibold">
                      <span>Institutional Scholarship Discount</span>
                      <span>-$10.00</span>
                    </div>
                    <div className="border-t border-[#f0ede6] pt-2.5 flex justify-between text-sm font-bold text-lagoon-900">
                      <span>Total Amount Due (Dummy Purchase)</span>
                      <span>$9.99</span>
                    </div>
                  </div>

                  <div className="bg-marigold/10 rounded-lg p-4 flex gap-3">
                    <svg className="h-5 w-5 text-marigold-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <p className="text-xs text-lagoon/80 leading-relaxed">
                      This is a <strong>Simulated Sandbox Checkout</strong>. No real payment card or transaction fees are required. Proceeding will register you on the dummy roster.
                    </p>
                  </div>

                  <button
                    onClick={startCheckoutPayment}
                    className="w-full mt-2 rounded-lg bg-lagoon-900 py-3 text-sm font-semibold text-frost-50 hover:bg-lagoon shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Proceed to Simulated Payment <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {checkoutStep === "payment" && (
                <div className="space-y-5">
                  <h4 className="text-xs font-bold text-lagoon-900 uppercase tracking-wider">Select Dummy Method</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex flex-col items-center justify-center border p-4 rounded-lg cursor-pointer transition-all ${paymentOption === "card" ? "border-lagoon-900 bg-lagoon/5 font-semibold text-lagoon-900" : "border-[#e0dcd4] text-lagoon/60"}`}>
                      <span className="text-lg mb-1">💳</span>
                      <span className="text-xs">Dummy Card</span>
                      <input type="radio" name="pay_opt" checked={paymentOption === "card"} onChange={() => setPaymentOption("card")} className="hidden" />
                    </label>
                    <label className={`flex flex-col items-center justify-center border p-4 rounded-lg cursor-pointer transition-all ${paymentOption === "upi" ? "border-lagoon-900 bg-lagoon/5 font-semibold text-lagoon-900" : "border-[#e0dcd4] text-lagoon/60"}`}>
                      <span className="text-lg mb-1">📱</span>
                      <span className="text-xs">Dummy UPI</span>
                      <input type="radio" name="pay_opt" checked={paymentOption === "upi"} onChange={() => setPaymentOption("upi")} className="hidden" />
                    </label>
                  </div>

                  {paymentOption === "card" ? (
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full rounded border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full rounded border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1">CVV</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            className="w-full rounded border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1">Simulated UPI Address</label>
                      <input
                        type="text"
                        defaultValue="researcher@ybl"
                        disabled
                        className="w-full rounded border border-[#e0dcd4] bg-[#f9f9f7] px-3 py-2 text-sm text-[#888] outline-none cursor-not-allowed"
                      />
                    </div>
                  )}

                  <button
                    onClick={runDummyPayment}
                    className="w-full mt-2 rounded-lg bg-marigold py-3 text-sm font-semibold text-lagoon-900 hover:bg-marigold-600 shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Confirm Dummy Payment ($9.99)
                  </button>
                </div>
              )}

              {checkoutStep === "process" && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-moss border-t-transparent" />
                  <p className="text-sm font-semibold text-lagoon-900">Verifying transaction tokens...</p>
                  <p className="text-xs text-lagoon/50">Processing simulated sandbox credential approval</p>
                </div>
              )}

              {checkoutStep === "success" && (
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-moss/10 text-moss flex items-center justify-center text-3xl">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-lagoon-900">Simulated Purchase Successful!</h4>
                    <p className="text-xs text-lagoon/60 mt-1 max-w-sm mx-auto leading-relaxed">
                      Congratulations! You have been successfully added to the active roster of researchers for this project call.
                    </p>
                  </div>

                  <div className="w-full bg-[#f9f9f7] rounded-lg p-4 border border-[#e8e5de] text-left text-xs space-y-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-lagoon/60">Registry Ref:</span>
                      <span className="font-semibold text-lagoon-900">#RES-2026-9481</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-lagoon/60">Seat Allocation:</span>
                      <span className="font-semibold text-lagoon-900">Enrolled (1 Seat)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-lagoon/60">Assigned Lead:</span>
                      <span className="font-semibold text-lagoon-900">{project.pm.name}</span>
                    </div>
                  </div>

                  <button
                    onClick={closeModal}
                    className="w-full rounded-lg bg-lagoon-900 py-3 text-sm font-semibold text-frost-50 hover:bg-lagoon shadow-md transition-colors cursor-pointer"
                  >
                    View Guidelines & Roster
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </main>
  );
}
