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
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

// Define the book type
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  condition: string;
  image: string;
  description: string;
  category: string;
  pages: number;
  publisher: string;
  publishedDate: string;
  isbn: string;
  seller: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

// Mock book data - in a real app this would come from an API
const mockBooks: Book[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 299,
    originalPrice: 399,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    description: "A gripping tale of racial injustice and childhood innocence in the American South. This Pulitzer Prize-winning novel explores themes of morality, prejudice, and the loss of innocence through the eyes of young Scout Finch.",
    category: "Fiction",
    pages: 376,
    publisher: "J.B. Lippincott & Co.",
    publishedDate: "1960",
    isbn: "978-0-06-112008-4",
    seller: "John Doe",
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: 249,
    originalPrice: 349,
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description: "A dystopian social science fiction novel and cautionary tale about totalitarianism. The story follows protagonist Winston Smith's rebellion against the oppressive regime of Big Brother and the Party.",
    category: "Science Fiction",
    pages: 328,
    publisher: "Secker & Warburg",
    publishedDate: "1949",
    isbn: "978-0-452-28423-4",
    seller: "Sarah Smith",
    rating: 4.9,
    reviews: 256,
    inStock: true,
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 199,
    originalPrice: 299,
    condition: "Fair",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    description: "A romantic novel that critiques the British landed gentry at the end of the 18th century. The story follows the character development of Elizabeth Bennet and her interactions with the proud Mr. Darcy.",
    category: "Romance",
    pages: 432,
    publisher: "T. Egerton",
    publishedDate: "1813",
    isbn: "978-0-14-143951-8",
    seller: "Mike Johnson",
    rating: 4.7,
    reviews: 189,
    inStock: true,
  },
];

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

  useEffect(() => {
    // Find the book by ID
    const foundBook = mockBooks.find(b => b.id === parseInt(id || "1"));
    if (foundBook) {
      setBook(foundBook);
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
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