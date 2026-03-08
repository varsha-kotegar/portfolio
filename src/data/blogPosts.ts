import cover1 from "@/assets/blog/cover-1.jpg";
import cover2 from "@/assets/blog/cover-2.jpg";
import cover3 from "@/assets/blog/cover-3.jpg";
import cover4 from "@/assets/blog/cover-4.jpg";
import cover5 from "@/assets/blog/cover-5.jpg";

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

export const blogPosts: BlogPost[] = [
  {
    slug: "the-art-of-learning-engineering-in-public",
    title: "The Art of Learning Engineering in Public",
    category: "Learning Notes",
    date: "2026-02-18",
    readingTime: 7,
    excerpt:
      "There's a quiet courage in sharing what you don't yet fully understand. Learning in public isn't about performing expertise — it's about documenting the honest, sometimes messy process of becoming.",
    coverImage: cover1,
    tags: ["learning", "growth", "engineering", "public"],
    content: `There's a quiet courage in sharing what you don't yet fully understand. Learning in public isn't about performing expertise — it's about documenting the honest, sometimes messy process of becoming.

I started writing about what I was learning not because I had answers, but because I had questions. The first blog post I ever published was riddled with imperfections. I misused a technical term, oversimplified a concept, and received a comment pointing out both. It stung. But something unexpected happened after that — I remembered those corrections permanently.

> "The best way to learn is to teach. The best way to teach is to be honest about what you don't know."

When you learn in private, your mistakes are invisible. They're also forgettable. When you learn in public, every misstep becomes a marker — a point in your timeline where understanding shifted. You create a living archive of your growth.

## The Fear of Being Wrong

Most people don't share their learning because they're afraid of being wrong. This fear is reasonable but misplaced. Being wrong publicly is uncomfortable, yes. But it's also accelerating. The feedback loop tightens. People who know more than you will correct you, and people who know less will learn alongside you.

I've found that the engineering community, for all its reputation for rigor, is remarkably generous with people who show genuine curiosity. The key is framing: "Here's what I think I understand" rather than "Here's how it works."

## Building a Knowledge Graph

Over time, your public learning creates something valuable — a knowledge graph that others can traverse. Every article, every tweet, every code snippet becomes a node. Connections form between ideas you explored months apart. Strangers send messages saying your confused-but-honest explanation helped them more than the polished tutorial.

> "Documentation of confusion is more valuable than documentation of certainty."

This is the paradox of learning in public: your most valuable contributions often come from the moments when you understood the least.

## The Practice

My practice is simple. When I encounter something that makes me pause — a concept that doesn't click immediately, a pattern I haven't seen before, a bug that teaches me something about how systems work — I write about it. Not immediately. I let it simmer. Then I write not an explanation, but a narrative of understanding.

The goal isn't to produce content. It's to produce clarity. The writing is a tool for thinking, and sharing it is an invitation for others to think alongside you.

## What I've Gained

Eighteen months of learning in public has given me: a portfolio that demonstrates growth rather than just achievement, connections with engineers I admire, a deeper understanding of every topic I've written about, and — perhaps most importantly — the habit of reflection.

Engineering is not just about building things. It's about understanding why you build them the way you do. Learning in public forces you to articulate that why, and in doing so, strengthens it.`,
  },
  {
    slug: "how-i-approach-learning-new-technologies",
    title: "How I Approach Learning New Technologies as a Student Engineer",
    category: "Engineering",
    date: "2026-01-25",
    readingTime: 6,
    excerpt:
      "Every new technology feels like standing at the edge of a vast landscape. The key isn't to map everything at once — it's to find the right trail and start walking.",
    coverImage: cover2,
    tags: ["engineering", "learning", "technology", "strategy"],
    content: `Every new technology feels like standing at the edge of a vast landscape. The tutorials stretch endlessly, the documentation is a labyrinth, and everyone on the internet seems to already know everything. As a student engineer, I've developed a personal framework for navigating this overwhelm.

## The Three-Phase Approach

I don't try to learn everything. Instead, I move through three phases: **Curiosity**, **Construction**, and **Connection**.

### Phase 1: Curiosity

Before I write a single line of code, I spend time understanding *why* a technology exists. What problem does it solve? What existed before it? What trade-offs did its creators make? This context transforms learning from memorization into understanding.

> "Understanding the 'why' behind a technology is more durable than memorizing its 'how'."

I read the founding blog post, watch the conference talk where it was introduced, and skim the GitHub issues from its early days. These artifacts reveal the human decisions behind the technical choices.

### Phase 2: Construction

Once I have context, I build something small. Not a tutorial project — something I actually want to exist. A tool for my own workflow, a feature for an existing project, a solution to a problem I've encountered. The constraint of real utility forces me past the comfortable plateau of "hello world" knowledge.

I keep a "learning journal" during this phase. Not polished notes — raw observations. "This API feels strange because..." or "I expected X but got Y because..." These observations become the foundation for deeper understanding.

### Phase 3: Connection

The final phase is connecting new knowledge to existing understanding. How does this technology relate to things I already know? Where are the patterns similar? Where do they diverge? This phase is where learning transforms into expertise.

## Embracing Productive Confusion

I've stopped seeing confusion as failure. Confusion is information — it tells you exactly where your mental model diverges from reality. When I'm confused, I now pause and ask: "What assumption am I making that's wrong?"

> "Confusion is not the opposite of understanding. It's the predecessor."

This reframing has been transformative. Instead of feeling frustrated when a concept doesn't click, I feel curious. There's a gap between my expectations and reality, and that gap is where learning happens.

## The Forgetting Curve

I've also made peace with forgetting. The first time I learn something, I'll forget 80% of it within a week. That's normal. The second time, I'll retain more. By the third encounter, it feels natural. Learning isn't a single event — it's a relationship that deepens over time.

My approach isn't optimized for speed. It's optimized for depth. In a field that changes constantly, I've found that deep understanding of fundamentals transfers better than surface-level familiarity with trends.`,
  },
  {
    slug: "my-journey-from-curiosity-to-building-real-projects",
    title: "My Journey From Curiosity to Building Real Projects",
    category: "Career Journey",
    date: "2026-01-08",
    readingTime: 7,
    excerpt:
      "The distance between 'I want to build things' and actually building them is shorter than you think — but the path is rarely straight.",
    coverImage: cover3,
    tags: ["career", "projects", "growth", "journey"],
    content: `The distance between "I want to build things" and actually building them is shorter than you think — but the path is rarely straight. Mine certainly wasn't.

## The Spark

I remember the exact moment engineering shifted from academic subject to personal obsession. I was debugging a simple program that was supposed to sort a list of numbers. It didn't work. For two hours, I stared at logic that seemed correct but produced wrong results. When I finally found the bug — an off-by-one error in a loop boundary — I felt something I hadn't felt in any classroom: the electric satisfaction of making something work.

That feeling became addictive.

## The Tutorial Trap

Like many beginners, I fell into the tutorial trap. I completed courses, followed along with YouTube videos, and felt productive without actually producing anything. My GitHub was a graveyard of half-finished tutorial projects that taught me syntax but not thinking.

> "Following tutorials teaches you to follow. Building teaches you to think."

The breakthrough came when I deleted my todo app (the fifth one) and asked myself: "What do I actually want to exist in the world?"

## The First Real Project

My first real project was embarrassingly simple — a command-line tool that organized my downloads folder by file type. It wasn't innovative. It wasn't impressive. But it was *mine*. I designed the logic, made the architecture decisions, debugged the edge cases, and used it every day.

That project taught me more about software engineering than any course. Not because it was complex, but because it was real. Real projects have real constraints, real users (even if that user is just you), and real consequences when they break.

## Building in Public

I started sharing my projects online, not because they were polished, but because sharing created accountability. When you tell the internet you're building something, there's a gentle pressure to follow through.

> "Ship something imperfect today rather than something perfect never."

The response surprised me. People didn't criticize the rough edges. They offered suggestions, shared their own experiences, and sometimes even contributed code. The engineering community, I learned, rewards effort and authenticity more than perfection.

## What I've Built Since

Each project has been slightly more ambitious than the last. A personal website became a full-stack application. A script became a CLI tool with documentation. A hackathon prototype became a maintained open-source project. The trajectory isn't vertical — it's a spiral, returning to familiar concepts at higher levels of sophistication.

## The Ongoing Journey

I'm still early in this journey. There are technologies I haven't touched, patterns I haven't learned, and mistakes I haven't yet made. But I've crossed the most important threshold: from consumer of technology to creator of it. That shift — from passive to active, from following to building — is the real engineering odyssey.`,
  },
  {
    slug: "why-writing-makes-you-a-better-engineer",
    title: "Why Writing Makes You a Better Engineer",
    category: "Ideas & Reflections",
    date: "2025-12-15",
    readingTime: 5,
    excerpt:
      "Code is a form of writing. But the other kind of writing — the kind with sentences and paragraphs — might be the most underrated engineering skill.",
    coverImage: cover4,
    tags: ["writing", "engineering", "communication", "skills"],
    content: `Code is a form of writing. But the other kind of writing — the kind with sentences and paragraphs — might be the most underrated engineering skill.

## The Connection

At first glance, writing prose and writing code seem like different activities. One is creative and ambiguous; the other is logical and precise. But spend enough time doing both, and you realize they share a common core: the struggle to express complex ideas clearly.

> "Good code and good prose share the same virtue: clarity achieved through revision."

When I write about a technical concept, I'm forced to linearize my understanding. Code lets you hold complexity in parallel — multiple files, nested abstractions, implicit connections. Writing demands that you lay ideas out one after another, each building on the last. This constraint reveals gaps in understanding that code can hide.

## Writing as Debugging

I've started using writing as a debugging tool. When I'm stuck on a problem, I open a blank document and explain the problem to an imaginary reader. I describe what I expect to happen, what actually happens, and what I've tried. More often than not, the act of explanation surfaces the insight I need.

This isn't a new idea — it's essentially "rubber duck debugging" with higher fidelity. But writing it down, rather than just thinking it through, forces a level of precision that thinking alone doesn't require.

## Documentation as Design

Writing documentation before writing code has changed how I approach design. When you describe an API in plain English before implementing it, you make different decisions. The interface becomes more intuitive because you've already practiced explaining it.

> "If you can't explain your architecture in a paragraph, it's probably too complex."

The best engineers I've encountered are also excellent writers. They write clear commit messages, thoughtful design documents, and documentation that respects the reader's time. This isn't coincidental — the skill of clear communication underlies both good writing and good engineering.

## The Practice

I write for thirty minutes every morning. Not always about engineering — sometimes about ideas, observations, or questions. The topic matters less than the habit. Writing regularly builds the muscle of clear thinking, and that muscle serves every other activity.

Some of what I write gets published. Most of it doesn't. The value isn't in the output — it's in the process. Every sentence is a small exercise in clarity, and clarity is the foundation of good engineering.`,
  },
  {
    slug: "lessons-from-solving-difficult-problems",
    title: "Lessons From Solving Difficult Problems in Programming",
    category: "Tech Explorations",
    date: "2025-11-28",
    readingTime: 6,
    excerpt:
      "The hardest problems in programming rarely have purely technical solutions. They require patience, perspective shifts, and the willingness to be stuck.",
    coverImage: cover5,
    tags: ["problem-solving", "programming", "debugging", "mindset"],
    content: `The hardest problems in programming rarely have purely technical solutions. They require patience, perspective shifts, and the willingness to be stuck.

## The Nature of Hard Problems

Easy problems have clear inputs, predictable outputs, and well-documented solutions. Hard problems have ambiguous requirements, unexpected edge cases, and solutions that don't exist on Stack Overflow. The transition from solving easy problems to tackling hard ones is the most significant growth phase in an engineer's development.

> "A hard problem is just an easy problem wearing a disguise. Your job is to see through the costume."

I've noticed that hard problems share a common trait: they resist the first approach. You try the obvious solution, and it doesn't work. You try the second obvious solution, and it partially works but introduces new problems. The real solution usually requires stepping back and questioning your assumptions.

## Lesson 1: Define the Problem Precisely

Most debugging time is spent solving the wrong problem. Before diving into code, I now spend time writing down exactly what's wrong. Not "it doesn't work" but "the function returns null when given an empty array instead of returning an empty array." Precision in problem definition often reveals the solution.

## Lesson 2: Reduce the Problem Space

When facing a complex bug, I systematically eliminate variables. I comment out code, simplify inputs, remove dependencies, until I find the smallest reproduction of the issue. This practice — creating a minimal reproduction — is perhaps the most valuable debugging skill I've developed.

> "The art of debugging is the art of subtraction."

## Lesson 3: Take Breaks Strategically

I used to power through difficult problems, believing that persistence was the key. I've since learned that persistence without pause leads to tunnel vision. Now, when I've been stuck for more than thirty minutes, I take a deliberate break. Walk, make coffee, do something that doesn't involve screens.

The number of times a solution has appeared during these breaks is remarkable. There's neuroscience behind this — the default mode network, which activates during rest, is responsible for creative insight and novel connections.

## Lesson 4: Read Other People's Code

When I'm stuck on an architectural decision, I read how others have solved similar problems. Not to copy, but to expand my vocabulary of solutions. Every codebase I read teaches me a pattern I didn't know, or shows me a familiar pattern used in an unfamiliar context.

## Lesson 5: Document Your Solutions

After solving a hard problem, I write down what the issue was, why it was hard, and how I solved it. This creates a personal knowledge base that I reference surprisingly often. More importantly, the act of documenting forces me to understand the solution deeply rather than just accepting that it works.

## The Mindset

The most important lesson isn't technical — it's psychological. Hard problems are supposed to be hard. Feeling stuck is normal. The discomfort of not knowing is not a sign that you're failing; it's a sign that you're growing. Every difficult problem solved expands your capacity for the next one.`,
  },
];

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
  const pool = excludeSlug ? blogPosts.filter((p) => p.slug !== excludeSlug) : blogPosts;
  return pool[Math.floor(Math.random() * pool.length)];
};
