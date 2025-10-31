import { motion } from "framer-motion";
import { ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-books.jpg";

// Hero component for the homepage
const Hero = () => {
  const { t } = useLanguage();

  const scrollToNext = () => {
    const browseSection = document.getElementById("browse");
    browseSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to create a test user for development
  const createTestUser = () => {
    const testUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      userType: "user"
    };
    localStorage.setItem("user", JSON.stringify(testUser));
    window.location.reload();
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
            key={t.hero.headline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            {t.hero.headline}
          </motion.h1>

          <motion.p
            key={t.hero.subtext}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 text-white/90"
          >
            {t.hero.subtext}
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
              {t.hero.browseBooksBtn}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground transition-all text-lg px-8"
              onClick={() => document.getElementById("sell")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.sellBookBtn}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Development Test Button */}
      {import.meta.env.DEV && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={createTestUser}
          className="absolute top-4 right-4 z-20 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          title="Create Test User"
        >
          <User className="w-5 h-5" />
        </motion.button>
      )}

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