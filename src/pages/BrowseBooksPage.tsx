import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Heart, ShoppingCart, ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";

// Sample book data - in a real app, this would come from an API
const allBooks = [
  {
    id: 1,
    title: "NCERT Mathematics Class 10",
    author: "NCERT",
    price: 299,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    category: "ncert",
  },
  {
    id: 2,
    title: "RS Aggarwal Quantitative Aptitude",
    author: "R.S. Aggarwal",
    price: 449,
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    category: "competitive",
  },
  {
    id: 3,
    title: "Lucent's General Knowledge",
    author: "Lucent Publication",
    price: 199,
    condition: "Fair",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    category: "government",
  },
  {
    id: 4,
    title: "RD Sharma Class 11",
    author: "R.D. Sharma",
    price: 599,
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1550399504-8953e1a1f1cb?w=400&h=600&fit=crop",
    category: "ncert",
  },
  {
    id: 5,
    title: "Arihant General Studies Paper 2",
    author: "Arihant Experts",
    price: 379,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop",
    category: "government",
  },
  {
    id: 6,
    title: "NCERT Science Class 9",
    author: "NCERT",
    price: 249,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop",
    category: "ncert",
  },
  {
    id: 7,
    title: "HC Verma Concepts of Physics",
    author: "H.C. Verma",
    price: 499,
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1532015042219-39c970b67c1e?w=400&h=600&fit=crop",
    category: "reference",
  },
  {
    id: 8,
    title: "Disha Chapterwise MCQ",
    author: "Disha Experts",
    price: 329,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    category: "competitive",
  },
  {
    id: 9,
    title: "NCERT Physics Class 12",
    author: "NCERT",
    price: 349,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1531919793100-101fc76d0c92?w=400&h=600&fit=crop",
    category: "ncert",
  },
  {
    id: 10,
    title: "Kiran's SSC Mathematics",
    author: "Kiran Publication",
    price: 279,
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1587369802194-8d30b1e7c8d7?w=400&h=600&fit=crop",
    category: "government",
  },
  {
    id: 11,
    title: "Pradeep's Chemistry Class 11",
    author: "Pradeep Publications",
    price: 429,
    condition: "Fair",
    image: "https://images.unsplash.com/photo-1532015042219-39c970b67c1e?w=400&h=600&fit=crop",
    category: "reference",
  },
  {
    id: 12,
    title: "Fast Track Objective Arithmetic",
    author: "Rajesh Verma",
    price: 399,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    category: "competitive",
  },
];

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

const BrowseBooksPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    setIsLoggedIn(!!userString);
    
    // Load favorites from localStorage
    const existingWishlist = localStorage.getItem("wishlist");
    if (existingWishlist) {
      const wishlist: WishlistItem[] = JSON.parse(existingWishlist);
      setFavorites(wishlist.map(item => item.id));
    }
  }, []);

  const toggleFavorite = (id: number) => {
    if (!isLoggedIn) {
      alert("Please sign in to add books to favorites");
      navigate("/");
      return;
    }
    
    // Find the book by ID
    const book = allBooks.find(b => b.id === id);
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
      navigate("/");
      return;
    }
    
    // Find the book by ID
    const book = allBooks.find(b => b.id === id);
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

  // Filter books based on search term and filters
  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    
    const matchesCondition = conditionFilter === "all" || book.condition.toLowerCase() === conditionFilter;
    
    let matchesPrice = true;
    if (priceRangeFilter === "low") {
      matchesPrice = book.price < 300;
    } else if (priceRangeFilter === "mid") {
      matchesPrice = book.price >= 300 && book.price <= 600;
    } else if (priceRangeFilter === "high") {
      matchesPrice = book.price > 600;
    }
    
    return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
  });

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(allBooks.map(book => book.category)));

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <main className="flex-grow">
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div className="flex items-center">
                <Button 
                  onClick={() => navigate(-1)} 
                  variant="outline" 
                  className="mr-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Browse Books</h1>
                  <p className="text-muted-foreground">Discover amazing books for students and exam preparation</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="md:hidden flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              {!isLoggedIn && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800 flex items-center gap-2">
                    <span>Sign in to save favorites and add books to cart</span>
                  </p>
                </div>
              )}
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search books by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-6 text-lg"
                />
              </div>
            </motion.div>

            {/* Filters - Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex flex-col md:flex-row gap-4 mb-8"
            >
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="md:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ncert">NCERT Books</SelectItem>
                  <SelectItem value="reference">Reference Books</SelectItem>
                  <SelectItem value="competitive">Competitive Exams</SelectItem>
                  <SelectItem value="government">Government Exams</SelectItem>
                </SelectContent>
              </Select>
              <Select value={conditionFilter} onValueChange={setConditionFilter}>
                <SelectTrigger className="md:w-[180px]">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceRangeFilter} onValueChange={setPriceRangeFilter}>
                <SelectTrigger className="md:w-[180px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Under ₹300</SelectItem>
                  <SelectItem value="mid">₹300 - ₹600</SelectItem>
                  <SelectItem value="high">Above ₹600</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Filters - Mobile */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mb-6 p-4 border rounded-lg bg-card"
              >
                <div className="grid grid-cols-1 gap-4">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card z-50">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="ncert">NCERT Books</SelectItem>
                      <SelectItem value="reference">Reference Books</SelectItem>
                      <SelectItem value="competitive">Competitive Exams</SelectItem>
                      <SelectItem value="government">Government Exams</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={conditionFilter} onValueChange={setConditionFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent className="bg-card z-50">
                      <SelectItem value="all">All Conditions</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priceRangeFilter} onValueChange={setPriceRangeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent className="bg-card z-50">
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="low">Under ₹300</SelectItem>
                      <SelectItem value="mid">₹300 - ₹600</SelectItem>
                      <SelectItem value="high">Above ₹600</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredBooks.length} of {allBooks.length} books
              </p>
              {filteredBooks.length > 0 && (
                <Badge variant="secondary">
                  {categoryFilter !== "all" ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Books` : "All Books"}
                </Badge>
              )}
            </div>

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{book.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">₹{book.price}</span>
                        <Button 
                          size="sm" 
                          className="hover:scale-105 transition-transform"
                          onClick={() => navigate(`/book/${book.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No books found</h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any books matching your search criteria. Try adjusting your filters.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                    setConditionFilter("all");
                    setPriceRangeFilter("all");
                  }}
                  className="px-6 py-3"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowseBooksPage;