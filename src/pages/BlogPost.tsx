import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Shuffle } from "lucide-react";
import { getPostBySlug, getRelatedPosts, getRandomPost } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || "");
  const [readProgress, setReadProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const total = articleRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      setReadProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Article not found
          </h1>
          <Link
            to="/blog"
            className="text-sm font-body text-accent hover:text-foreground transition-colors"
          >
            ← Back to journal
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPosts(post.slug);

  const renderContent = (content: string) => {
    const blocks = content.split("\n\n");
    return blocks.map((block, i) => {
      // Heading
      if (block.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="font-display text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4"
          >
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="font-display text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3"
          >
            {block.replace("### ", "")}
          </h3>
        );
      }
      // Blockquote
      if (block.startsWith("> ")) {
        return (
          <blockquote
            key={i}
            className="my-8 pl-6 border-l-2 border-accent"
          >
            <p className="font-display text-xl md:text-2xl italic text-foreground/80 leading-relaxed">
              {block.replace(/^> "?|"?$/g, "")}
            </p>
          </blockquote>
        );
      }
      // Regular paragraph — handle **bold**
      const parts = block.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p
          key={i}
          className="font-body text-base md:text-lg text-foreground/85 leading-[1.8] mb-6"
        >
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="font-semibold text-foreground">
                {part.slice(2, -2)}
              </strong>
            ) : (
              <span key={j}>{part}</span>
            )
          )}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-border/30">
        <motion.div
          className="h-full bg-accent"
          style={{ width: `${readProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Hero */}
      <div className="relative w-full aspect-[21/9] md:aspect-[21/7] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Article */}
      <article ref={articleRef} className="relative -mt-24 md:-mt-32 z-10">
        <div className="max-w-[680px] mx-auto px-6">
          {/* Nav */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-body font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Journal
          </Link>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-[10px] font-body font-medium tracking-[0.3em] uppercase bg-muted text-foreground rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 mt-5 text-muted-foreground text-sm font-body">
              <time>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
            </div>
            <div className="h-px bg-border mt-8 mb-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {renderContent(post.content)}
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground border border-border rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20">
          <div className="border-t border-border pt-12">
            <p className="text-xs font-body font-medium tracking-[0.3em] uppercase text-accent mb-2">
              Continue Reading
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground italic mb-10">
              You might also enjoy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-sm aspect-[4/3] mb-4">
                    <img
                      src={rp.coverImage}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] font-body font-medium tracking-[0.3em] uppercase text-accent">
                    {rp.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground mt-1 group-hover:text-accent transition-colors leading-snug">
                    {rp.title}
                  </h3>
                  <span className="flex items-center gap-1 mt-2 text-xs font-body text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {rp.readingTime} min read
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Random discover */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-16">
          <div className="text-center border-t border-border pt-10">
            <p className="text-xs font-body tracking-[0.3em] uppercase text-muted-foreground mb-1">
              Feeling adventurous?
            </p>
            <h3 className="font-display text-xl font-bold italic text-foreground mb-5">
              Discover something unexpected
            </h3>
            <button
              onClick={() => {
                const rp = getRandomPost(post.slug);
                navigate(`/blog/${rp.slug}`);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-body font-medium tracking-widest uppercase border border-foreground text-foreground rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Random Article
            </button>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-24 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="font-display text-lg font-bold text-foreground hover:text-accent transition-colors"
          >
            Varsha Kotegar
          </Link>
          <p className="text-xs font-body text-muted-foreground">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
