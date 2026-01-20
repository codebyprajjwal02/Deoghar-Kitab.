import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Upload, DollarSign, Camera, BookOpen, User, AlertCircle } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import SellerRegistrationForm from "@/components/SellerRegistrationForm";

interface UserData {
  id: string;
  name: string;
  email: string;
  userType: string;
}

interface SellerData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

const SellSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [userSellerStatus, setUserSellerStatus] = useState<'user' | 'pending' | 'seller' | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      setIsLoggedIn(true);
      setUser(userData);
      
      // Check user's seller status
      checkSellerStatus(userData.id);
    }
  }, []);

  const checkSellerStatus = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3003/api/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        
        if (userData.userType === 'seller') {
          setUserSellerStatus('seller');
        } else if (userData.sellerRequest && userData.sellerRequest.requested && !userData.sellerRequest.approved) {
          setUserSellerStatus('pending');
        } else {
          setUserSellerStatus('user');
        }
      }
    } catch (error) {
      console.error('Error checking seller status:', error);
    }
  };

  const handleSellBooks = () => {
    if (!isLoggedIn) {
      alert("Please sign in to sell books");
      navigate("/");
      return;
    }
    
    if (userSellerStatus === 'seller') {
      // User is already a seller, redirect to seller dashboard
      navigate("/seller");
    } else if (userSellerStatus === 'pending') {
      // User has a pending request, show message
      alert("Your seller request is pending approval. You will be notified when approved.");
    } else if (userSellerStatus === 'user') {
      // User is not a seller, open seller registration form
      setShowSellerForm(true);
    }
  };

  const handleSellerFormSubmit = (sellerData: SellerData) => {
    setShowSellerForm(false);
    alert("Seller request submitted successfully. Please wait for admin approval.");
    // Update user status to pending
    setUserSellerStatus('pending');
  };

  const handleCancelRequest = async () => {
    if (window.confirm("Are you sure you want to cancel your seller request?")) {
      try {
        const response = await fetch(`http://localhost:3003/api/users/${user.id}/cancel-seller-request`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          alert("Seller request cancelled successfully.");
          setUserSellerStatus('user');
        } else {
          alert("Failed to cancel seller request. Please try again.");
        }
      } catch (error) {
        console.error('Error cancelling seller request:', error);
        alert("Error cancelling seller request. Please try again.");
      }
    }
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
          
          {isLoggedIn && userSellerStatus === 'pending' && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg inline-block">
              <p className="text-yellow-800 flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Your seller request is pending approval. You will be notified when approved.</span>
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={handleCancelRequest}
              >
                Cancel Request
              </Button>
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
                    ? (userSellerStatus === 'seller' 
                        ? "List your books and start earning money today!" 
                        : userSellerStatus === 'pending' 
                          ? "Your seller request is pending approval" 
                          : "Apply to become a seller to start selling your books")
                    : "Sign in to start selling your books on Deoghar Kitab"}
                </p>
              </div>
              
              <Button 
                onClick={handleSellBooks}
                className="w-full hover:scale-105 transition-transform"
                size="lg"
                disabled={userSellerStatus === 'pending'}
              >
                {isLoggedIn 
                  ? (userSellerStatus === 'seller' 
                      ? "Go to Seller Dashboard" 
                      : userSellerStatus === 'pending' 
                        ? "Request Pending" 
                        : "Become a Seller")
                  : "Sign In to Sell Books"}
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Seller Registration Form Modal */}
        {showSellerForm && user && (
          <SellerRegistrationForm 
            onSubmit={handleSellerFormSubmit} 
            onCancel={() => setShowSellerForm(false)} 
          />
        )}
      </div>
    </section>
  );
};

export default SellSection;