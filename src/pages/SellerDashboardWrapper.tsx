import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SellerRegistrationForm from "@/components/SellerRegistrationForm";
import SellerDashboard from "@/pages/SellerDashboard";
import { SellerData } from "@/components/SellerRegistrationForm";

const SellerDashboardWrapper = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{email: string, userType: string} | null>(null);
  const [isSellerRegistered, setIsSellerRegistered] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      setUser(userData);
      
      // Check if user is already registered as a seller
      const sellerDataString = localStorage.getItem(`seller_${userData.email}`);
      if (sellerDataString) {
        setIsSellerRegistered(true);
      } else {
        setShowRegistrationForm(true);
      }
    } else {
      // Redirect to login if not logged in
      navigate("/");
    }
  }, [navigate]);

  const handleSellerRegistration = (sellerData: SellerData) => {
    if (user) {
      // Save seller data to localStorage
      localStorage.setItem(`seller_${user.email}`, JSON.stringify(sellerData));
      setIsSellerRegistered(true);
      setShowRegistrationForm(false);
    }
  };

  const handleCancelRegistration = () => {
    // Redirect to home page if user cancels registration
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background">
      {showRegistrationForm && (
        <SellerRegistrationForm 
          onSubmit={handleSellerRegistration} 
          onCancel={handleCancelRegistration} 
        />
      )}
      
      {isSellerRegistered && <SellerDashboard />}
    </div>
  );
};

export default SellerDashboardWrapper;