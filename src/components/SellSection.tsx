import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Upload, DollarSign, Camera, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SellSection = () => {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    setIsLoggedIn(!!userString);
  }, []);

  const handleSellBooks = () => {
    if (!isLoggedIn) {
      alert("Please sign in to sell books");
      window.location.href = "/";
      return;
    }
    
    // Redirect to seller dashboard
    window.location.href = "/seller";
  };

  return (
    <section id="sell" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.sell.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.sell.subtitle}
          </p>
          
          {!isLoggedIn && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-block">
              <p className="text-blue-800 flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                <span>Sign in to start selling your books</span>
              </p>
            </div>
          )}
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t.sell.step1Title}</h3>
                  <p className="text-muted-foreground">
                    {t.sell.step1Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t.sell.step2Title}</h3>
                  <p className="text-muted-foreground">
                    {t.sell.step2Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t.sell.step3Title}</h3>
                  <p className="text-muted-foreground">
                    {t.sell.step3Desc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sell CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg shadow-soft flex flex-col items-center justify-center text-center h-full"
            >
              <div className="mb-6">
                <Upload className="w-16 h-16 mx-auto text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Ready to Sell?</h3>
                <p className="text-muted-foreground">
                  {isLoggedIn 
                    ? "List your books and start earning money today!" 
                    : "Sign in to start selling your books on Deoghar Kitab"}
                </p>
              </div>
              
              <Button 
                onClick={handleSellBooks}
                className="w-full hover:scale-105 transition-transform"
                size="lg"
              >
                {isLoggedIn ? "Go to Seller Dashboard" : "Sign In to Sell Books"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellSection;