import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-books.jpg";

const Hero = () => {
  const scrollToNext = () => {
    const browseSection = document.getElementById("browse");
    browseSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Buy. Sell. Repeat.{" "}
            <span className="text-primary">Discover Stories</span> That Deserve a Second Life.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 text-white/90"
          >
            A marketplace for students and book lovers to buy and sell second-hand books easily.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              variant="default"
              className="hover:scale-105 hover:shadow-glow transition-all text-lg px-8"
              onClick={scrollToNext}
            >
              Browse Books
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground transition-all text-lg px-8"
              onClick={() => document.getElementById("sell")?.scrollIntoView({ behavior: "smooth" })}
            >
              Sell Your Book
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.5 },
        }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white cursor-pointer hover:text-primary transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
};

export default Hero;
