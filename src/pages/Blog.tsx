import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Shuffle } from "lucide-react";
import { blogPosts, BLOG_CATEGORIES, getRandomPost, type BlogCategory } from "@/data/blogPosts";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");
  const navigate = useNavigate();

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? blogPosts
        : blogPosts.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const featured = filtered[0];
  const grid = filtered.slice(1);

  const handleRandom = () => {
    const post = getRandomPost();
    navigate(`/blog/${post.slug}`);
  };

  // Grid layout classes for magazine collage
  const gridSizes = [
    "md:col-span-2 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-2 md:row-span-1",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-24 pt-28 pb-8 max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-body font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back to Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-body font-medium tracking-[0.3em] uppercase text-accent mb-3">
            Engineering Journal
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[0.95]">
            Thoughts &<br />
            <span className="italic font-normal">Explorations</span>
          </h1>
          <p className="mt-6 font-body text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Reflections on engineering, learning, and the quiet art of building things that matter.
          </p>
        </motion.div>
      </header>

      {/* Categories */}
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 py-6 border-t border-b border-border"
        >
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase rounded-full border transition-colors duration-200 ${
              activeCategory === "All"
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase rounded-full border transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={handleRandom}
            className="ml-auto flex items-center gap-1.5 px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Surprise me
          </button>
        </motion.div>
      </div>

      {/* Featured Story */}
      {featured && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pt-12"
        >
          <p className="text-[10px] font-body font-medium tracking-[0.4em] uppercase text-accent mb-4">
            Featured Story
          </p>
          <Link to={`/blog/${featured.slug}`} className="group block">
            <div className="relative overflow-hidden rounded-sm aspect-[21/9]">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <span className="inline-block px-3 py-1 text-[10px] font-body font-medium tracking-[0.3em] uppercase bg-background/90 text-foreground rounded-full mb-3">
                  {featured.category}
                </span>
                <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-background leading-tight max-w-2xl">
                  {featured.title}
                </h2>
                <p className="mt-3 font-body text-sm text-background/80 max-w-lg hidden md:block">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-4 text-background/70">
                  <span className="text-xs font-body">{featured.date}</span>
                  <span className="flex items-center gap-1 text-xs font-body">
                    <Clock className="w-3 h-3" />
                    {featured.readingTime} min read
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.section>
      )}

      {/* Grid */}
      {grid.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px]">
            {grid.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className={gridSizes[i % gridSizes.length]}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group relative block h-full overflow-hidden rounded-sm"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <span className="inline-block px-2.5 py-0.5 text-[9px] font-body font-medium tracking-[0.3em] uppercase bg-background/80 text-foreground rounded-full mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-bold text-background leading-snug">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-background/70">
                      <span className="flex items-center gap-1 text-[11px] font-body">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} min
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-background" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Discover Random */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pb-20">
        <div className="border-t border-border pt-12 text-center">
          <p className="text-xs font-body font-medium tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Feeling adventurous?
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground italic mb-6">
            Discover something unexpected
          </h3>
          <button
            onClick={handleRandom}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-body font-medium tracking-widest uppercase border border-foreground text-foreground rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            <Shuffle className="w-4 h-4" />
            Random Article
          </button>
        </div>
      </section>

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

export default Blog;
