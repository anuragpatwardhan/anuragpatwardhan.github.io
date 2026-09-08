import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { blogs } from "./blogs";
import { projectDetails, getProjectBySlug } from "./projectDetails";
import { projects, images, techIcons, nav, testimonials } from "./site";

/**
 * A static content site does not fail loudly. A slug listed on an index page
 * with no detail entry behind it is a dead link; a mistyped image path is an
 * empty box. Both survive `next build` and both are only noticed by a visitor.
 *
 * These check the references between the data files, and that anything served
 * from `public/` is actually there.
 */

const PUBLIC = path.resolve(__dirname, "../../public");

const isRemote = (src: string) => src.startsWith("http://") || src.startsWith("https://");

describe("project slugs", () => {
  it("are unique", () => {
    const slugs = projectDetails.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("are URL-safe, since they are path segments", () => {
    for (const { slug } of projectDetails) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("every card that links somewhere has a case study behind it", () => {
    // A card with slug null is deliberate — it renders without a link. A card
    // with a slug and no detail entry is a 404.
    for (const card of projects.filter((p) => p.slug)) {
      expect(getProjectBySlug(card.slug as string), `no case study for ${card.slug}`).toBeDefined();
    }
  });

  it("getProjectBySlug returns nothing for an unknown slug", () => {
    expect(getProjectBySlug("not-a-project")).toBeUndefined();
  });
});

describe("blog entries", () => {
  it("have unique slugs", () => {
    const slugs = blogs.map((b) => b.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("have URL-safe slugs", () => {
    for (const { slug } of blogs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("carry a body when they are hosted here", () => {
    // Without one the page renders a title and nothing else. External posts do
    // not need a body, since the card links away instead.
    for (const post of blogs.filter((b) => !b.external)) {
      expect(post.body?.trim(), `${post.slug} has no body`).toBeTruthy();
    }
  });

  it("point at an absolute URL when they link out", () => {
    for (const post of blogs.filter((b) => b.external)) {
      expect(isRemote(post.external as string), `${post.slug} links out relatively`).toBe(true);
    }
  });

  it("all have tags, a date and a read time", () => {
    for (const post of blogs) {
      expect(post.tags.length, `${post.slug} has no tags`).toBeGreaterThan(0);
      expect(post.date, `${post.slug} has no date`).toBeTruthy();
      expect(post.readTime, `${post.slug} has no read time`).toBeTruthy();
    }
  });
});

describe("images", () => {
  const localPaths = [
    ...Object.values(images),
    ...projects.map((p) => p.image),
    ...techIcons.map((t) => t.src),
  ].filter((src) => !isRemote(src));

  it("finds some local files to check", () => {
    // Guards the guard: if every asset moved to a CDN this suite would pass by
    // checking nothing at all.
    expect(localPaths.length).toBeGreaterThan(0);
  });

  it("every local image exists in public/", () => {
    for (const src of localPaths) {
      const onDisk = path.join(PUBLIC, src.replace(/^\//, ""));
      expect(existsSync(onDisk), `missing: ${src}`).toBe(true);
    }
  });

  it("every local image path is absolute", () => {
    // A relative src resolves against the current route, so the same string
    // works on /about and breaks on /projects/opscanvas.
    for (const src of localPaths) {
      expect(src.startsWith("/"), `not absolute: ${src}`).toBe(true);
    }
  });
});

describe("navigation", () => {
  it("has no duplicate destinations", () => {
    const hrefs = nav.map((n) => n.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("links to routes that exist", () => {
    // Every nav href must correspond to a directory under src/app, which is
    // what the App Router turns into a page.
    const appDir = path.resolve(__dirname, "../app");
    for (const { href } of nav) {
      if (href.startsWith("#") || isRemote(href)) continue;
      const route = href.replace(/^\//, "").replace(/\/$/, "");
      const target = route === "" ? appDir : path.join(appDir, route);
      expect(existsSync(target), `nav points at ${href} with no page`).toBe(true);
    }
  });
});

describe("case study detail", () => {
  it("every case study has a name, tagline and pitch", () => {
    for (const project of projectDetails) {
      expect(project.name, `${project.slug} has no name`).toBeTruthy();
      expect(project.tagline, `${project.slug} has no tagline`).toBeTruthy();
      expect(project.pitch?.trim(), `${project.slug} has no pitch`).toBeTruthy();
    }
  });

  it("names match between the card and the case study", () => {
    // The index and the detail page are separate data, so they can drift and
    // show two different names for the same project.
    for (const card of projects.filter((p) => p.slug)) {
      const detail = getProjectBySlug(card.slug as string);
      expect(detail?.name, `name mismatch for ${card.slug}`).toBe(card.name);
    }
  });
});

describe("testimonials", () => {
  it("each has a quote and an attributed author", () => {
    // An unattributed quote on a portfolio reads as invented.
    for (const entry of testimonials) {
      expect(entry.quote?.trim()).toBeTruthy();
      expect(entry.name?.trim()).toBeTruthy();
    }
  });
});
