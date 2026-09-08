import { describe, expect, it } from "vitest";
import { nextBySlug } from "./navigation";
import { blogs } from "@/data/blogs";
import { projectDetails } from "@/data/projectDetails";

/**
 * The blog page used to offer the first *other* post as "read next", which is
 * indistinguishable from correct on two posts and silently strands the rest.
 * The reachability tests below are the ones that would have caught it.
 */

const items = (...slugs: string[]) => slugs.map((slug) => ({ slug }));

describe("nextBySlug", () => {
  it("returns the following entry", () => {
    expect(nextBySlug(items("a", "b", "c"), "a")).toEqual({ slug: "b" });
  });

  it("wraps past the end", () => {
    expect(nextBySlug(items("a", "b", "c"), "c")).toEqual({ slug: "a" });
  });

  it("never returns the entry you are already on", () => {
    const list = items("a", "b", "c");
    for (const { slug } of list) {
      expect(nextBySlug(list, slug)?.slug).not.toBe(slug);
    }
  });

  it("returns undefined for a slug that is not in the list", () => {
    expect(nextBySlug(items("a", "b"), "missing")).toBeUndefined();
  });

  it("returns undefined for a single entry, rather than linking to itself", () => {
    expect(nextBySlug(items("only"), "only")).toBeUndefined();
  });

  it("returns undefined for an empty list", () => {
    expect(nextBySlug([], "a")).toBeUndefined();
  });

  it("alternates between exactly two entries", () => {
    const list = items("a", "b");
    expect(nextBySlug(list, "a")?.slug).toBe("b");
    expect(nextBySlug(list, "b")?.slug).toBe("a");
  });

  it("visits every entry before repeating", () => {
    // The property the old implementation broke: following the link from any
    // starting point must eventually reach all of them.
    const list = items("a", "b", "c", "d", "e");
    for (const start of list) {
      const visited = new Set<string>();
      let current: string | undefined = start.slug;
      while (current && !visited.has(current)) {
        visited.add(current);
        current = nextBySlug(list, current)?.slug;
      }
      expect(visited.size).toBe(list.length);
    }
  });

  it("carries the whole entry through, not just the slug", () => {
    const list = [
      { slug: "a", title: "First" },
      { slug: "b", title: "Second" },
    ];
    expect(nextBySlug(list, "a")?.title).toBe("Second");
  });
});

describe("the real blog list", () => {
  const internal = blogs.filter((b) => !b.external);

  it("has posts to link between", () => {
    expect(internal.length).toBeGreaterThan(1);
  });

  it("reaches every internal post by following read next", () => {
    // The bug: with three internal posts, the chain bounced between the first
    // two and "pune-to-boston" could not be reached from any of them.
    const visited = new Set<string>();
    let current: string | undefined = internal[0].slug;
    while (current && !visited.has(current)) {
      visited.add(current);
      current = nextBySlug(internal, current)?.slug;
    }
    expect([...visited].sort()).toEqual(internal.map((b) => b.slug).sort());
  });

  it("never offers a post that links out as read next", () => {
    // An external post has no page here, so /blogs/<its slug> would 404.
    const external = new Set(blogs.filter((b) => b.external).map((b) => b.slug));
    for (const post of internal) {
      const next = nextBySlug(internal, post.slug);
      expect(external.has(next!.slug)).toBe(false);
    }
  });
});

describe("the real project list", () => {
  it("reaches every case study by following next project", () => {
    const visited = new Set<string>();
    let current: string | undefined = projectDetails[0].slug;
    while (current && !visited.has(current)) {
      visited.add(current);
      current = nextBySlug(projectDetails, current)?.slug;
    }
    expect(visited.size).toBe(projectDetails.length);
  });
});
