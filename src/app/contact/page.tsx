import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata = { title: "Contact | Anurag Patwardhan" };

export default function Page() {
  return (
    <section className="bg-white text-zinc-900 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <span className="inline-block text-[11px] tracking-[0.18em] uppercase border border-zinc-300 rounded-full px-3 py-1 text-zinc-700">
            Let&apos;s talk for your project done
          </span>
          <h1 className="display mt-6 text-[clamp(2.5rem,6vw,5rem)] text-zinc-900">
            Let&apos;s create amazing stuff together!
          </h1>
          <p className="mt-6 text-zinc-500 max-w-md leading-relaxed">
            Have a project in mind? Looking to partner or work together? Reach out through the form and I&apos;ll get back to
            you in the next 48 hours.
          </p>
          <div className="mt-10 space-y-4 text-zinc-800">
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:underline">
              <Mail /> {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\D/g, "")}`} className="flex items-center gap-3 hover:underline">
              <Phone /> {site.phone}
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Mail() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 8l8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Phone() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
