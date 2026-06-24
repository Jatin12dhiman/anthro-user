"use client";

import { useState } from "react";

export default function AmbassadorForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", institution: "", why: "" });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e) {
    e.preventDefault();
    // Backend (admin ko email) baad mein wire hoga — abhi client-side confirm.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[1.75rem] border border-moss/25 bg-moss/5 p-8 text-center">
        <span className="text-4xl">🎉</span>
        <h3 className="mt-3 font-display text-2xl font-semibold text-lagoon-900">Application received!</h3>
        <p className="mt-2 text-lagoon/65">
          Thanks {form.name?.split(" ")[0] || "there"} — our team will review your application and get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[1.75rem] border border-[#e4dccb] bg-white p-7 shadow-[0_24px_50px_-30px_rgba(18,39,52,0.5)] sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-moss">Become an ambassador</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-lagoon-900">Apply to represent Anthroplanet</h3>
      <div className="mt-6 space-y-4">
        <Field label="Full name" value={form.name} onChange={update("name")} placeholder="Jatin Dhiman" required />
        <Field label="Email" type="email" value={form.email} onChange={update("email")} placeholder="you@university.edu" required />
        <Field label="Institution" value={form.institution} onChange={update("institution")} placeholder="IIT Delhi" required />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-lagoon-900">Why do you want to join?</span>
          <textarea
            rows={4}
            value={form.why}
            onChange={update("why")}
            className="w-full rounded-xl border border-lagoon/15 bg-white px-4 py-2.5 text-lagoon-900 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-marigold px-6 py-3.5 text-base font-semibold text-lagoon-900 transition-transform hover:-translate-y-0.5 hover:bg-marigold-600"
      >
        Submit application
      </button>
    </form>
  );
}

function Field({ label, type = "text", value, onChange, placeholder, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-lagoon-900">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-lagoon/15 bg-white px-4 py-2.5 text-lagoon-900 placeholder:text-lagoon/35 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
      />
    </label>
  );
}
