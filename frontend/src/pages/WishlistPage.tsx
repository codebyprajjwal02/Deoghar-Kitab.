import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

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

const WishlistPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      const parsedWishlist: WishlistItem[] = JSON.parse(savedWishlist);
      setWishlist(parsedWishlist);
    }
  }, []);

  const removeFromWishlist = (id: number) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const moveToCart = (item: WishlistItem) => {
    // Get existing cart from localStorage or initialize empty array
    const existingCart = localStorage.getItem("cart");
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if book already exists in cart
    const existingItemIndex = cart.findIndex((cartItem: CartItem) => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // If book exists, update quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // If book doesn't exist, add new item
      cart.push({
        id: item.id,
        title: item.title,
        author: item.author,
        price: item.price,
        image: item.image,
        condition: item.condition,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Remove from wishlist
    removeFromWishlist(item.id);
    
    // Show success message
    alert(`Moved "${item.title}" to cart!`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <Card>
            <CardContent className="py-12">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any books to your wishlist yet.
              </p>
              <Button onClick={() => navigate("/browse")}>
                Browse Books
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate("/browse")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground">Books you're interested in buying</p>
            </div>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              {wishlist.length} items
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="group h-full flex flex-col">
                  <CardHeader className="p-0 relative">
                    <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      {item.condition}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-foreground hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold mb-1 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.author}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-bold text-primary">₹{item.price}</span>
                      <Button 
                        size="sm" 
                        className="hover:scale-105 transition-transform"
                        onClick={() => moveToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Move to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WishlistPage;