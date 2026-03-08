# 📝 How to Write a New Blog Post

This guide explains how to add new blog posts to your portfolio.

## Quick Steps

### 1. Create a Markdown File

Create a new `.md` file in `src/content/blog/`:

```
src/content/blog/your-post-slug.md
```

### 2. Add Frontmatter + Content

Every blog post needs YAML frontmatter at the top, followed by your content:

```markdown
---
title: "Your Blog Post Title"
slug: "your-post-slug"
category: "Engineering"
date: "2026-03-08"
readingTime: 5
excerpt: "A one-sentence summary that appears on the blog grid cards."
coverImage: "cover-1.jpg"
tags: ["tag1", "tag2", "tag3"]
---

Your article content goes here...

## Subheading

Regular paragraph text with **bold** words.

> "This is a blockquote that will be styled as a pull quote."

### Smaller Subheading

More content...
```

### 3. Add a Cover Image (Optional)

Place your cover image in `src/assets/blog/` and then register it in `src/data/blogPosts.ts`:

```ts
// Add the import at the top
import cover6 from "@/assets/blog/cover-6.jpg";

// Add to the coverImages map
const coverImages: Record<string, string> = {
  // ... existing entries
  "cover-6.jpg": cover6,
};
```

Then reference it in your frontmatter as `coverImage: "cover-6.jpg"`.

You can also reuse an existing cover image (cover-1 through cover-5).

### 4. Register the Post

In `src/data/blogPosts.ts`, import your new markdown file and add it to the array:

```ts
// Add import at the top
import post6 from "@/content/blog/your-post-slug.md?raw";

// Add to the blogPosts array
export const blogPosts: BlogPost[] = [
  parseMarkdownPost(post1),
  parseMarkdownPost(post2),
  // ...
  parseMarkdownPost(post6),  // ← Add here
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
```

That's it! The post will automatically appear on the blog page, sorted by date.

---

## Frontmatter Reference

| Field         | Type     | Description                              |
|---------------|----------|------------------------------------------|
| `title`       | string   | The full article title                   |
| `slug`        | string   | URL-friendly identifier (must be unique) |
| `category`    | string   | One of the blog categories (see below)   |
| `date`        | string   | Publication date in `YYYY-MM-DD` format  |
| `readingTime` | number   | Estimated reading time in minutes        |
| `excerpt`     | string   | Short summary for preview cards          |
| `coverImage`  | string   | Filename of cover image                  |
| `tags`        | string[] | Array of topic tags                      |

## Available Categories

- `Engineering`
- `Learning Notes`
- `Tech Explorations`
- `Career Journey`
- `Ideas & Reflections`

## Content Formatting

| Syntax             | Result                    |
|--------------------|---------------------------|
| `## Heading`       | Section heading (h2)      |
| `### Heading`      | Sub-heading (h3)          |
| `**bold text**`    | **Bold text**             |
| `> "quote text"`   | Styled pull quote         |
| Empty line         | Paragraph break           |
