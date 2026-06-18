"use client";

import { useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "ok" | "fallback" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // Path 1: silent send via Web3Forms when the access key is configured
    if (key && key !== "" && key !== "YOUR_ACCESS_KEY_HERE") {
      try {
        const data = new FormData();
        data.append("access_key", key);
        data.append("name", name);
        data.append("email", email);
        data.append("phone", phone);
        data.append("message", message);
        data.append("subject", `Portfolio contact from ${name || "visitor"}`);
        data.append("from_name", "anuragpatwardhan.github.io");
        data.append("botcheck", String(fd.get("botcheck") || ""));

        const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
        const json = await res.json();
        if (json.success) {
          setStatus("ok");
          form.reset();
          return;
        }
        // fall through to mailto fallback on failure
        setError(json.message || "Send failed, opening email instead.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error, opening email instead.");
      }
    }

    // Path 2: mailto fallback. Opens the visitor's email client with everything prefilled.
    const subject = `Portfolio contact from ${name || "visitor"}`;
    const bodyLines = [
      `From: ${name || "(no name)"} <${email || "no@email"}>`,
      phone ? `Phone: ${phone}` : "",
      "",
      message || "",
    ].filter(Boolean);
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
    setStatus("fallback");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <h2 className="text-2xl font-semibold text-zinc-900">Send a message</h2>

      <Field label="Name" name="name" placeholder="Your name" required />
      <Field label="Email" name="email" type="email" placeholder="hello@mail.com" required />
      <Field label="Phone" name="phone" placeholder="+1 (123) 456 7890" />

      <div>
        <label className="block text-sm text-zinc-700 mb-2">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What are you working on?"
          className="w-full bg-transparent border-b border-zinc-300 focus:border-black outline-none py-2 text-zinc-900 resize-none"
        />
      </div>

      {/* honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn w-full justify-center py-4 text-base tracking-wide uppercase bg-black text-white hover:bg-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{status === "sending" ? "Sending…" : "Send Message"}</span>
      </button>

      {status === "ok" && (
        <p className="text-green-700 text-sm">
          Thanks, your message is on its way. I&apos;ll reply within 48 hours.
        </p>
      )}
      {status === "fallback" && (
        <p className="text-zinc-700 text-sm">
          Opening your email app so you can send the message. If nothing opened, write me directly at{" "}
          <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      {status === "error" && error && (
        <p className="text-red-700 text-sm">{error}</p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm text-zinc-700 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-zinc-300 focus:border-black outline-none py-2 text-zinc-900 placeholder:text-zinc-400"
      />
    </div>
  );
}
