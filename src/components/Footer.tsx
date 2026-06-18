import { site } from "@/data/site";

const linkCls = "hover:text-white transition flex items-center gap-1";

export default function Footer() {
  return (
    <footer className="bg-[#050000]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col items-center gap-6 text-sm text-[#a0a0a0] text-center">
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-3">
          <a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a>
          <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>
            Instagram <ArrowUpRight />
          </a>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className={linkCls}>
            Github <ArrowUpRight />
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
            LinkedIn <ArrowUpRight />
          </a>
        </div>
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        {/* spacer so the floating "Get in touch" pill never lands on top of the links */}
        <div aria-hidden className="h-14 md:h-4 w-full" />
      </div>
    </footer>
  );
}

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
