import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MaskRevealLines } from "@/components/MaskReveal";
import { useMagnetic } from "@/hooks/use-magnetic";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/varshakotegar" },
  { label: "GitHub", href: "https://github.com/varsha-kotegar" },
  { label: "X", href: "https://x.com/varsha_kotegar" },
  { label: "Resume", href: "/resume.pdf" },
];

const MagneticLink = ({ link }: { link: (typeof links)[0] }) => {
  const magnetic = useMagnetic({ strength: 0.25, stiffness: 200, damping: 20 });

  return (
    <motion.a
      ref={magnetic.ref as any}
      style={
        {
          ...magnetic.style,
          borderColor: "rgba(0,0,0,0.15)",
          color: "#3A3A37",
        } as any
      }
      onMouseMove={magnetic.onMouseMove as any}
      onMouseLeave={magnetic.onMouseLeave as any}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group px-6 py-3 border rounded-full font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-foreground hover:text-background"
      data-cursor="Open"
    >
      {link.label}
    </motion.a>
  );
};

type FormStatus = "idle" | "sending" | "success" | "error";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const isValid =
    name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        // Reset success state after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Submission failed:", data.message);
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <MaskRevealLines
            lines={["Contact"]}
            lineClassName="editorial-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
            className="flex flex-col items-center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-2">
              Send a message
            </p>
            <p className="font-body text-base text-muted-foreground mb-8 leading-relaxed">
              Have a question, collaboration idea, or just want to say hello?
              I'd love to hear from you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  required
                  placeholder="Your name"
                  className="w-full bg-transparent border-b border-border py-3 font-body text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b border-border py-3 font-body text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors duration-300"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={2000}
                  required
                  rows={5}
                  placeholder="Tell me what's on your mind..."
                  className="w-full bg-transparent border-b border-border py-3 font-body text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                />
                <p className="text-right text-[11px] font-body text-muted-foreground/60 mt-1">
                  {message.length}/2000
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid || status === "sending"}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-foreground text-foreground rounded-full font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-foreground hover:text-background disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-foreground"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {/* Feedback */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-3 pt-2"
                  >
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="font-body text-sm text-foreground leading-relaxed">
                      Your message has been sent successfully. Thank you for
                      reaching out.
                    </p>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-3 pt-2"
                  >
                    <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <p className="font-body text-sm text-destructive leading-relaxed">
                      Something went wrong. Please try again.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right — Links & email */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-2">
                Or reach out directly
              </p>
              <a
                href="mailto:varshakotegar26@gmail.com"
                className="inline-block font-display italic text-xl md:text-2xl text-accent hover:text-foreground transition-colors duration-300 mb-12"
                data-cursor="Email"
              >
                varshakotegar26@gmail.com
              </a>
            </div>

            <div>
              <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-6">
                Find me online
              </p>
              <div className="flex flex-wrap gap-4">
                {links.map((link) => (
                  <MagneticLink key={link.label} link={link} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
