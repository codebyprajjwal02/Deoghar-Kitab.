import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SellerRegistrationForm from "@/components/SellerRegistrationForm";
import SellerDashboard from "@/pages/SellerDashboard";
import { SellerData } from "@/components/SellerRegistrationForm";

// Define the seller type for the global list
interface RegisteredSeller extends SellerData {
  email: string;
  status: string;
  registeredDate: string;
}

const SellerDashboardWrapper = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{email: string, userType: string} | null>(null);
  const [isSellerRegistered, setIsSellerRegistered] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(true); // Always show form initially
  const [isAdminApproved, setIsAdminApproved] = useState(false);

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
        
        // Check if admin has approved the seller
        const allSellersString = localStorage.getItem("all_sellers");
        if (allSellersString) {
          try {
            const allSellers: RegisteredSeller[] = JSON.parse(allSellersString);
            const seller = allSellers.find(s => s.email === userData.email);
            if (seller && seller.status === "approved") {
              setIsAdminApproved(true);
              setShowRegistrationForm(false);
            }
            // If pending or rejected, keep showRegistrationForm as false but show a message
          } catch (error) {
            console.error("Error parsing sellers data:", error);
          }
        }
      }
      // If no seller data, keep showRegistrationForm as true to show the form
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
      
      // Also save to a global sellers list for admin to see
      const existingSellers = localStorage.getItem("all_sellers");
      const allSellers: RegisteredSeller[] = existingSellers ? JSON.parse(existingSellers) : [];
      
      // Check if seller already exists in the list
      const sellerExists = allSellers.some((seller) => seller.email === user.email);
      
      if (!sellerExists) {
        const newSeller: RegisteredSeller = {
          ...sellerData,
          email: user.email,
          status: "pending", // Pending approval by admin
          registeredDate: new Date().toISOString().split('T')[0]
        };
        allSellers.push(newSeller);
        localStorage.setItem("all_sellers", JSON.stringify(allSellers));
      }
      
      // Show message that registration is pending approval
      alert("Your seller registration is submitted and pending admin approval.");
      navigate("/home");
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
      
      {isSellerRegistered && isAdminApproved && <SellerDashboard />}
      
      {isSellerRegistered && !isAdminApproved && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto mt-8">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Seller Registration Pending</h2>
            <p className="text-yellow-700 mb-4">
              Your seller registration is pending admin approval. You will receive access to the seller dashboard once approved.
            </p>
            <button 
              onClick={() => navigate("/home")}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboardWrapper;