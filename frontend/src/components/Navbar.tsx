import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, Moon, Sun, Languages, User as UserIcon, LogOut, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{email: string, userType: string} | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  // Check cart item count
  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartItems = JSON.parse(cart);
        const count = cartItems.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
        setCartItemCount(count);
      } else {
        setCartItemCount(0);
      }
    };

    updateCartCount();
    
    // Listen for cart changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Check wishlist item count
  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = localStorage.getItem("wishlist");
      if (wishlist) {
        const wishlistItems = JSON.parse(wishlist);
        setWishlistItemCount(wishlistItems.length);
      } else {
        setWishlistItemCount(0);
      }
    };

    updateWishlistCount();
    
    // Listen for wishlist changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "wishlist") {
        updateWishlistCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSignOut = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    // Redirect to home page
    window.location.href = "/";
  };

  const navLinks = [
    { label: t.navbar.browseBooks, href: "#browse" },
    { label: t.navbar.sellBook, href: "#sell" },
    { label: t.navbar.whyUs, href: "#why" },
    { label: t.navbar.reviews, href: "#testimonials" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/home" className="flex items-center gap-2 group">
          <BookOpen className="w-8 h-8 text-primary transition-transform group-hover:rotate-12" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Deoghar Kitab
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          
          {isLoggedIn && user?.userType !== "admin" && (
            <a
              href="/seller"
              className="text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              Seller Dashboard
            </a>
          )}
          
          {/* Language Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="relative p-2 rounded-full hover:bg-primary/10 transition-colors group"
            title={language === "en" ? "Switch to Hindi" : "Switch to English"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={language}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1"
              >
                <Languages className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  {language.toUpperCase()}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="relative p-2 rounded-full hover:bg-primary/10 transition-colors"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -180, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 180, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-primary animate-glow" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground/80 hover:text-primary transition-colors" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Wishlist Icon */}
          <a href="/wishlist" className="relative text-foreground/80 hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
            {wishlistItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItemCount}
              </span>
            )}
          </a>

          {/* Cart Icon */}
          <a href="/cart" className="relative text-foreground/80 hover:text-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </a>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* Profile Icon Only */}
              <a href="/profile" className="text-foreground/80 hover:text-primary transition-colors">
                <UserIcon className="w-5 h-5" />
              </a>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button 
              variant="default" 
              className="hover:scale-105 transition-transform"
              onClick={() => window.location.href = '/'}
            >
              {t.navbar.signIn}
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border mt-2"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href === '#hero' ? '/home#hero' : link.href}
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              
              {isLoggedIn && user?.userType !== "admin" && (
                <a
                  href="/seller"
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Seller Dashboard
                </a>
              )}
              
              {/* Mobile Toggles */}
              <div className="flex gap-4 pt-2 border-t border-border">
                <button
                  onClick={toggleLanguage}
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Languages className="w-5 h-5 text-primary" />
                  <span className="font-medium">{language === "en" ? "हिंदी" : "English"}</span>
                </button>
                
                <button
                  onClick={toggleTheme}
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-primary" />
                  ) : (
                    <Moon className="w-5 h-5 text-primary" />
                  )}
                  <span className="font-medium">{theme === "dark" ? "Light" : "Dark"}</span>
                </button>
              </div>

              {/* Wishlist Icon in Mobile Menu */}
              <a 
                href="/wishlist" 
                className="flex items-center gap-2 p-2 bg-muted rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistItemCount}
                    </span>
                  )}
                </div>
                <span>Wishlist</span>
                {wishlistItemCount > 0 && (
                  <span className="ml-auto text-sm">({wishlistItemCount} items)</span>
                )}
              </a>

              {/* Cart Icon in Mobile Menu */}
              <a 
                href="/cart" 
                className="flex items-center gap-2 p-2 bg-muted rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="ml-auto text-sm">({cartItemCount} items)</span>
                )}
              </a>

              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <a 
                    href="/profile" 
                    className="text-foreground/80 hover:text-primary transition-colors py-2 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserIcon className="w-5 h-5 mx-auto" />
                  </a>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => {
                    window.location.href = '/';
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t.navbar.signIn}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;