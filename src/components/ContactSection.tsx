import { motion } from "framer-motion";
import { MaskRevealLines } from "@/components/MaskReveal";
import { useMagnetic } from "@/hooks/use-magnetic";

const links = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Resume", href: "#" },
];

const MagneticLink = ({ link }: { link: typeof links[0] }) => {
  const magnetic = useMagnetic({ strength: 0.25, stiffness: 200, damping: 20 });

  return (
    <motion.a
      ref={magnetic.ref as any}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove as any}
      onMouseLeave={magnetic.onMouseLeave as any}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group px-6 py-3 border rounded-full font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-foreground hover:text-background"
      style={{ ...magnetic.style, borderColor: "rgba(0,0,0,0.15)", color: "#3A3A37" }}
      data-cursor="Open"
    >
      {link.label}
    </motion.a>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-12">
          <MaskRevealLines
            lines={["Let's Connect", "Get in touch"]}
            lineClassName="first:font-body first:text-sm first:tracking-[0.3em] first:uppercase first:text-accent first:mb-4 last:editorial-heading last:text-5xl md:last:text-6xl lg:last:text-7xl last:font-bold last:text-foreground"
            className="flex flex-col items-center"
          />
        </div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          href="mailto:varsha@gmail.com"
          className="inline-block font-display italic text-2xl md:text-4xl text-accent hover:text-foreground transition-colors duration-300 mb-16"
          data-cursor="Email"
        >
          varsha@gmail.com
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-8 flex-wrap"
        >
          {links.map((link) => (
            <MagneticLink key={link.label} link={link} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
