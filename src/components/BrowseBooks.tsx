import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Define the book type
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  condition: string;
  image: string;
  sellerEmail?: string;
  status?: string;
}

// Define the seller book type
interface SellerBook {
  id: number;
  title: string;
  author: string;
  price: number;
  condition: string;
  status: string;
  date: string;
  sales: number;
  revenue: number;
  sellerEmail: string;
}

// Initial hardcoded books
const initialBooks: Book[] = [
  {
    id: 1,
    title: "NCERT Mathematics Class 10",
    author: "NCERT",
    price: 299,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    title: "RS Aggarwal Quantitative Aptitude",
    author: "R.S. Aggarwal",
    price: 449,
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Lucent's General Knowledge",
    author: "Lucent Publication",
    price: 199,
    condition: "Fair",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
  {
    id: 4,
    title: "RD Sharma Class 11",
    author: "R.D. Sharma",
    price: 599,
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1550399504-8953e1a1f1cb?w=400&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Arihant General Studies Paper 2",
    author: "Arihant Experts",
    price: 379,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop",
  },
  {
    id: 6,
    title: "NCERT Science Class 9",
    author: "NCERT",
    price: 249,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop",
  },
];

const BrowseBooks = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [books, setBooks] = useState<Book[]>(initialBooks);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    setIsLoggedIn(!!userString);
    
    // Load books from localStorage
    loadBooks();
  }, []);

  const loadBooks = () => {
    // Get seller books from localStorage
    const sellerBooksString = localStorage.getItem("sellerBooks");
    if (sellerBooksString) {
      try {
        const sellerBooks: SellerBook[] = JSON.parse(sellerBooksString);
        // Filter only published books
        const publishedBooks = sellerBooks.filter((book: SellerBook) => book.status === "Published");
        // Convert seller books to the format expected by BrowseBooks
        const formattedSellerBooks: Book[] = publishedBooks.map((book: SellerBook) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price,
          condition: book.condition,
          image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", // Default image
        }));
        
        // Combine initial books with published seller books
        setBooks([...initialBooks, ...formattedSellerBooks]);
      } catch (error) {
        console.error("Error parsing seller books:", error);
        setBooks(initialBooks);
      }
    } else {
      setBooks(initialBooks);
    }
  };

  // Define the wishlist item type
  interface WishlistItem {
    id: number;
    title: string;
    author: string;
    price: number;
    image: string;
    condition: string;
  }

  // Define the cart item type
  interface CartItem {
    id: number;
    title: string;
    author: string;
    price: number;
    image: string;
    condition: string;
    quantity: number;
  }

  const toggleFavorite = (id: number) => {
    if (!isLoggedIn) {
      alert("Please sign in to add books to favorites");
      window.location.href = "/";
      return;
    }
    
    // Find the book by ID
    const book = books.find(b => b.id === id);
    if (!book) return;
    
    // Get existing wishlist from localStorage or initialize empty array
    const existingWishlist = localStorage.getItem("wishlist");
    const wishlist: WishlistItem[] = existingWishlist ? JSON.parse(existingWishlist) : [];
    
    // Check if book already exists in wishlist
    const existingItemIndex = wishlist.findIndex((item: WishlistItem) => item.id === book.id);
    
    if (existingItemIndex >= 0) {
      // If book exists, remove it from wishlist
      wishlist.splice(existingItemIndex, 1);
    } else {
      // If book doesn't exist, add it to wishlist
      wishlist.push({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
        condition: book.condition,
      });
    }
    
    // Save updated wishlist to localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    
    // Update favorites state
    if (existingItemIndex >= 0) {
      setFavorites(prev => prev.filter(fav => fav !== id));
    } else {
      setFavorites(prev => [...prev, id]);
    }
  };

  const handleAddToCart = (id: number) => {
    if (!isLoggedIn) {
      alert("Please sign in to add books to cart");
      window.location.href = "/";
      return;
    }
    
    // Find the book by ID
    const book = books.find(b => b.id === id);
    if (!book) return;
    
    // Get existing cart from localStorage or initialize empty array
    const existingCart = localStorage.getItem("cart");
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if book already exists in cart
    const existingItemIndex = cart.findIndex((item: CartItem) => item.id === book.id);
    
    if (existingItemIndex >= 0) {
      // If book exists, update quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // If book doesn't exist, add new item
      cart.push({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
        condition: book.condition,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Show success message
    alert(`Added "${book.title}" to cart!`);
  };

  return (
    <section id="browse" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.browse.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.browse.subtitle}
          </p>
          
          {!isLoggedIn && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-block">
              <p className="text-blue-800 flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                <span>Sign in to save favorites and add books to cart</span>
              </p>
            </div>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={t.browse.searchPlaceholder}
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder={t.browse.genre} />
            </SelectTrigger>
            <SelectContent className="bg-card z-50">
              <SelectItem value="ncert">{t.browse.ncert}</SelectItem>
              <SelectItem value="reference">{t.browse.reference}</SelectItem>
              <SelectItem value="competitive">{t.browse.competitive}</SelectItem>
              <SelectItem value="government">{t.browse.government}</SelectItem>
              <SelectItem value="fiction">{t.browse.fiction}</SelectItem>
              <SelectItem value="nonfiction">{t.browse.nonfiction}</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder={t.browse.condition} />
            </SelectTrigger>
            <SelectContent className="bg-card z-50">
              <SelectItem value="excellent">{t.browse.excellent}</SelectItem>
              <SelectItem value="good">{t.browse.good}</SelectItem>
              <SelectItem value="fair">{t.browse.fair}</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder={t.browse.priceRange} />
            </SelectTrigger>
            <SelectContent className="bg-card z-50">
              <SelectItem value="low">{t.browse.underPrice}</SelectItem>
              <SelectItem value="mid">{t.browse.midPrice}</SelectItem>
              <SelectItem value="high">{t.browse.abovePrice}</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                      favorites.includes(book.id)
                        ? "bg-primary text-white"
                        : "bg-white/90 text-foreground hover:bg-primary hover:text-white"
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={favorites.includes(book.id) ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={() => handleAddToCart(book.id)}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-md text-foreground hover:bg-primary hover:text-white transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  {book.condition}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Link to book details page */}
                <a href={`/book/${book.id}`} className="block">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-1">{book.title}</h3>
                  <p className="text-muted-foreground mb-4">{book.author}</p>
                </a>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">₹{book.price}</span>
                  {/* Link to book details page on View Details button */}
                  <a href={`/book/${book.id}`}>
                    <Button 
                      size="sm" 
                      className="hover:scale-105 transition-transform"
                    >
                      {t.browse.viewDetails}
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseBooks;