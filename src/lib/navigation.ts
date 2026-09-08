/**
 * "Read next" / "Next project" selection, shared by the blog and project detail
 * pages so both walk their list the same way.
 *
 * It lives here rather than inline in each page because the two had drifted: the
 * project page cycled correctly while the blog page always offered the first
 * other entry, which left the third post unreachable by following the links.
 */

export type HasSlug = { slug: string };

/**
 * The entry after `slug`, wrapping past the end.
 *
 * Returns undefined when there is nothing to move on to — an unknown slug, or a
 * list with only the current entry in it. The caller hides the block in that
 * case rather than rendering a link back to the page you are already on.
 */
export function nextBySlug<T extends HasSlug>(items: T[], slug: string): T | undefined {
  const index = items.findIndex((item) => item.slug === slug);
  if (index === -1 || items.length < 2) return undefined;
  return items[(index + 1) % items.length];
}
