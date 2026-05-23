import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Heart, 
  ShoppingCart, 
  Star, 
  Check, 
  Shield, 
  Truck, 
  RotateCcw,
  ArrowLeft,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { initialBooks, Book } from "@/lib/booksData";

// Define seller data type
interface SellerData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  showPhone: boolean;
}

const mockBooks: Book[] = initialBooks;


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

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sellerData, setSellerData] = useState<SellerData | null>(null); // Added seller data state

  useEffect(() => {
    const bookId = parseInt(id || "1");
    // Find the book by ID in static books
    let foundBook = mockBooks.find(b => b.id === bookId);
    
    // If not found in static books, search in sellerBooks from localStorage
    if (!foundBook) {
      const sellerBooksString = localStorage.getItem("sellerBooks");
      if (sellerBooksString) {
        try {
          const sellerBooks = JSON.parse(sellerBooksString);
          const sellerBook = sellerBooks.find((b: any) => b.id === bookId && b.status === "Published");
          if (sellerBook) {
            foundBook = {
              id: sellerBook.id,
              title: sellerBook.title,
              author: sellerBook.author,
              price: sellerBook.price,
              originalPrice: sellerBook.price * 1.4,
              condition: sellerBook.condition,
              image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", // Default image
              description: "No description provided by the seller.",
              category: "reference",
              pages: 300,
              publisher: "Unknown Publisher",
              publishedDate: "2023",
              isbn: "000-0-00-000000-0",
              seller: "Local Seller",
              sellerEmail: sellerBook.sellerEmail,
              rating: 4.5,
              reviews: 5,
              inStock: true,
            };
          }
        } catch (e) {
          console.error("Error loading seller book details:", e);
        }
      }
    }

    if (foundBook) {
      setBook(foundBook);
      
      // Load seller data based on seller email
      const sellerDataString = localStorage.getItem(`seller_${foundBook.sellerEmail}`);
      if (sellerDataString) {
        setSellerData(JSON.parse(sellerDataString));
      }
    } else {
      // If book not found, redirect to home
      navigate("/home");
    }
  }, [id, navigate]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    if (!book) return;
    
    // Get existing cart from localStorage or initialize empty array
    const existingCart = localStorage.getItem("cart");
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if book already exists in cart
    const existingItemIndex = cart.findIndex((item: CartItem) => item.id === book.id);
    
    if (existingItemIndex >= 0) {
      // If book exists, update quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // If book doesn't exist, add new item
      cart.push({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
        condition: book.condition,
        quantity: quantity
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    alert(`Added ${quantity} copy(ies) of "${book.title}" to cart!`);
  };

  const handleBuyNow = () => {
    if (!book) return;
    
    // Add to cart first
    handleAddToCart();
    
    // Navigate to cart page
    navigate("/cart");
  };

  const handleCallSeller = () => {
    if (sellerData && sellerData.phone) {
      window.location.href = `tel:${sellerData.phone}`;
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Book Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex gap-2">
              {[0, 1, 2].map((index) => (
                <div 
                  key={index}
                  className={`aspect-square w-20 overflow-hidden rounded-md cursor-pointer border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={book.image}
                    alt={`${book.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {book.condition} Condition
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(book.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {book.rating} ({book.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold">₹{book.price}</span>
                <span className="text-lg text-muted-foreground line-through">₹{book.originalPrice}</span>
                <Badge variant="default">
                  Save ₹{book.originalPrice - book.price}
                </Badge>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={incrementQuantity}
                >
                  +
                </Button>
              </div>
              <span className="font-semibold">₹{book.price * quantity}</span>
            </div>

            {/* Seller Contact Information */}
            {sellerData && sellerData.showPhone && (
              <Card className="border-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Contact Seller</p>
                        <p className="text-sm text-muted-foreground">
                          {sellerData.phone}
                        </p>
                      </div>
                    </div>
                    <Button onClick={handleCallSeller} className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Book Condition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Pages are clean and intact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Binding is secure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Minor wear on cover</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>No highlighting or annotations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <Heart 
                  className="w-5 h-5 mr-2" 
                  fill={favorites.includes(book.id) ? "currentColor" : "none"} 
                />
                Add to Cart
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-muted-foreground">Within 5-7 days</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">7 Days Return</p>
                  <p className="text-muted-foreground">If damaged</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-muted-foreground">100% protected</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Book Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>Book Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{book.description}</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span>{book.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pages</span>
                  <span>{book.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publisher</span>
                  <span>{book.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Published Date</span>
                  <span>{book.publishedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISBN</span>
                  <span>{book.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seller</span>
                  <span>{book.seller}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetails;