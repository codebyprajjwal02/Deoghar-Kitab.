import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrowseBooks from "@/components/BrowseBooks";
import SellSection from "@/components/SellSection";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{email: string, userType: string} | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Show personalized content for logged-in users */}
      {isLoggedIn && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h2 className="text-xl font-semibold text-blue-800">Welcome back, {user?.email}!</h2>
            <p className="text-blue-600">
              {user?.userType === "admin" 
                ? "You're logged in as an administrator. Access the admin dashboard to manage the platform." 
                : "You're logged in and ready to browse or sell books."}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {user?.userType !== "admin" && (
                <>
                  <button 
                    onClick={() => navigate("/seller")}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Go to Seller Dashboard
                  </button>
                  <button 
                    onClick={() => {
                      const browseSection = document.getElementById("browse");
                      if (browseSection) {
                        browseSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="inline-block bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
                  >
                    Browse Books
                  </button>
                </>
              )}
              {user?.userType === "admin" && (
                <button 
                  onClick={() => navigate("/admin")}
                  className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                >
                  Go to Admin Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      <BrowseBooks />
      <SellSection />
      <WhyChoose />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;