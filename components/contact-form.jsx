"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[1.75rem] border border-moss/25 bg-moss/5 p-10 text-center">
        <span className="text-4xl">✉️</span>
        <h3 className="mt-3 font-display text-2xl font-semibold text-lagoon-900">Message sent!</h3>
        <p className="mt-2 text-lagoon/65">We&apos;ll get back to you within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[1.75rem] border border-[#e4dccb] bg-white p-7 shadow-[0_24px_50px_-30px_rgba(18,39,52,0.5)] sm:p-8">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" value={form.name} onChange={update("name")} placeholder="Your name" required />
          <Field label="Email" type="email" value={form.email} onChange={update("email")} placeholder="you@email.com" required />
        </div>
        <Field label="Subject" value={form.subject} onChange={update("subject")} placeholder="How can we help?" required />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-lagoon-900">Message</span>
          <textarea
            rows={5}
            value={form.message}
            onChange={update("message")}
            required
            className="w-full rounded-xl border border-lagoon/15 bg-white px-4 py-2.5 text-lagoon-900 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-marigold px-6 py-3.5 text-base font-semibold text-lagoon-900 transition-transform hover:-translate-y-0.5 hover:bg-marigold-600"
      >
        Send message
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
