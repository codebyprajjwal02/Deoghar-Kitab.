import { motion } from "framer-motion";
import { BookOpen, Facebook, Twitter, Instagram, Mail, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">Deoghar Kitab</span>
            </div>
            <p className="text-background/70 mb-6">
              Your trusted marketplace for buying and selling second-hand books. Join our community of book lovers today.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Browse Books", "Sell a Book", "How It Works", "About Us"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-background/70 hover:text-primary transition-colors inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {["FAQ", "Shipping Info", "Returns", "Contact Us"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-background/70 hover:text-primary transition-colors inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-background/70 mb-4">
              Subscribe to get special offers and updates on new arrivals
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:ring-2 focus:ring-primary"
              />
              <Button
                size="icon"
                className="flex-shrink-0 hover:scale-105 transition-transform"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-background/70 text-sm">
            © 2025 Deoghar Kitab. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-background/70 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/70 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
