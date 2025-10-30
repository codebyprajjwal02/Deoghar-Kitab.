import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Wallet, 
  Smartphone, 
  Lock, 
  CheckCircle,
  ArrowLeft,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";

// Define the book type
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  condition: string;
}

// Mock book data - in a real app this would come from an API or context
const mockBooks: Book[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 299,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    condition: "Good",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: 249,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    condition: "Excellent",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 199,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    condition: "Fair",
  },
];

const PaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();
  const [book, setBook] = useState<Book | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    address: "",
    city: "",
    zip: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment
    setOrderPlaced(true);
  };

  const handleContinueShopping = () => {
    navigate("/home");
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Thank you for your purchase. Your order has been placed successfully.
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <p className="font-medium">Order ID: #ORD-{Math.floor(Math.random() * 1000000)}</p>
                <p className="text-sm text-muted-foreground">Estimated delivery: 5-7 business days</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/profile")}>
                View Order Details
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading payment details...</p>
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
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="aspect-[3/4] w-20 overflow-hidden rounded-md">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <p className="text-sm">{book.condition} Condition</p>
                      <p className="font-semibold mt-1">₹{book.price}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{book.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹{Math.round(book.price * 0.18)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>₹{book.price + Math.round(book.price * 0.18)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Payment Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-6">
                    {/* Payment Method */}
                    <div>
                      <h3 className="font-medium mb-3">Payment Method</h3>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 border rounded-lg p-4">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="w-5 h-5" />
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-4">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                            <Smartphone className="w-5 h-5" />
                            UPI
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-4">
                          <RadioGroupItem value="wallet" id="wallet" />
                          <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer">
                            <Wallet className="w-5 h-5" />
                            Wallet
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {/* Payment Form */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              placeholder="John Doe"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              name="expiry"
                              placeholder="MM/YY"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === "upi" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input
                            id="upiId"
                            placeholder="yourname@upi"
                            required
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You will be redirected to your UPI app to complete the payment
                        </p>
                      </div>
                    )}
                    
                    {paymentMethod === "wallet" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {["Paytm", "PhonePe", "Google Pay", "Amazon Pay"].map((wallet) => (
                            <div key={wallet} className="border rounded-lg p-4 text-center cursor-pointer hover:bg-muted transition-colors">
                              <div className="font-medium">{wallet}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-medium mb-3">Shipping Address</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            placeholder="123 Main Street"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              placeholder="City"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input
                              id="zip"
                              name="zip"
                              placeholder="123456"
                              value={formData.zip}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Security Notice */}
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <Lock className="w-5 h-5 text-blue-500" />
                      <p className="text-sm text-blue-700">
                        Your payment details are securely encrypted and protected
                      </p>
                    </div>
                    
                    <Button type="submit" className="w-full h-12 text-lg">
                      Pay ₹{book.price + Math.round(book.price * 0.18)}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;