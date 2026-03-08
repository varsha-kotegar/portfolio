import cover1 from "@/assets/blog/cover-1.jpg";
import cover2 from "@/assets/blog/cover-2.jpg";
import cover3 from "@/assets/blog/cover-3.jpg";
import cover4 from "@/assets/blog/cover-4.jpg";
import cover5 from "@/assets/blog/cover-5.jpg";

// Import markdown files as raw text
import post1 from "@/content/blog/the-art-of-learning-engineering-in-public.md?raw";
import post2 from "@/content/blog/how-i-approach-learning-new-technologies.md?raw";
import post3 from "@/content/blog/my-journey-from-curiosity-to-building-real-projects.md?raw";
import post4 from "@/content/blog/why-writing-makes-you-a-better-engineer.md?raw";
import post5 from "@/content/blog/lessons-from-solving-difficult-problems.md?raw";

export type BlogCategory =
  | "Engineering"
  | "Learning Notes"
  | "Tech Explorations"
  | "Career Journey"
  | "Ideas & Reflections";

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  readingTime: number;
  excerpt: string;
  coverImage: string;
  tags: string[];
  content: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Engineering",
  "Learning Notes",
  "Tech Explorations",
  "Career Journey",
  "Ideas & Reflections",
];

// Map cover image filenames to imports
const coverImages: Record<string, string> = {
  "cover-1.jpg": cover1,
  "cover-2.jpg": cover2,
  "cover-3.jpg": cover3,
  "cover-4.jpg": cover4,
  "cover-5.jpg": cover5,
};

/**
 * Parses a markdown file with YAML frontmatter into a BlogPost object.
 *
 * Frontmatter format:
 * ---
 * title: "Your Title"
 * slug: "your-slug"
 * category: "Engineering"
 * date: "2026-01-01"
 * readingTime: 5
 * excerpt: "A short description."
 * coverImage: "cover-1.jpg"
 * tags: ["tag1", "tag2"]
 * ---
 *
 * Content goes here...
 */
function parseMarkdownPost(raw: string): BlogPost {
  // Normalize line endings (CRLF → LF) to handle Windows/git differences
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  const frontmatterMatch = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    throw new Error("Invalid markdown: missing frontmatter");
  }

  const frontmatter = frontmatterMatch[1];
  const content = frontmatterMatch[2].trim();

  const get = (key: string): string => {
    const match = frontmatter.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m"));
    return match ? match[1].replace(/^"|"$/g, "") : "";
  };

  const getNumber = (key: string): number => {
    return parseInt(get(key), 10) || 0;
  };

  const getTags = (): string[] => {
    const match = frontmatter.match(/^tags:\s*\[(.*)\]\s*$/m);
    if (!match) return [];
    return match[1].split(",").map((t) => t.trim().replace(/^"|"$/g, ""));
  };

  const coverImageFile = get("coverImage");

  return {
    title: get("title"),
    slug: get("slug"),
    category: get("category") as BlogCategory,
    date: get("date"),
    readingTime: getNumber("readingTime"),
    excerpt: get("excerpt"),
    coverImage: coverImages[coverImageFile] || coverImageFile,
    tags: getTags(),
    content,
  };
}

// Parse all markdown posts and sort by date (newest first)
export const blogPosts: BlogPost[] = [
  parseMarkdownPost(post1),
  parseMarkdownPost(post2),
  parseMarkdownPost(post3),
  parseMarkdownPost(post4),
  parseMarkdownPost(post5),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getRelatedPosts = (currentSlug: string, count = 3): BlogPost[] => {
  const current = getPostBySlug(currentSlug);
  if (!current) return blogPosts.slice(0, count);
  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, count);
};

export const getRandomPost = (excludeSlug?: string): BlogPost => {
  const candidates = excludeSlug
    ? blogPosts.filter((p) => p.slug !== excludeSlug)
    : blogPosts;
  return candidates[Math.floor(Math.random() * candidates.length)];
};
