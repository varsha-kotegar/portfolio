import { Github, Linkedin, Twitter, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-body text-sm text-muted-foreground">
          © {new Date().getFullYear()} Varsha Kotegar. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="https://github.com/varsha-kotegar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/varshakotegar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="https://x.com/varsha_kotegar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter size={18} />
          </a>
          <a href="https://leetcode.com/u/varsha-kotegar/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Code size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
