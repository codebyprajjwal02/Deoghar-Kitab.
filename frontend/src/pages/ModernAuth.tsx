import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, BookOpen, User, Lock, Mail, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import LoadingAnimation from "@/components/LoadingAnimation";

interface RegisteredUser {
  name: string;
  email: string;
  password: string;
}

// Floating blob component with mouse interaction
const FloatingBlob = ({ 
  size, 
  color, 
  initialX, 
  initialY, 
  delay = 0,
  parallaxIntensity = 0.1 
}: { 
  size: number; 
  color: string; 
  initialX: string; 
  initialY: string; 
  delay?: number;
  parallaxIntensity?: number;
}) => {
  const blobRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (blobRef.current) {
        const rect = blobRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * parallaxIntensity;
        const deltaY = (e.clientY - centerY) * parallaxIntensity;
        
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [parallaxIntensity]);

  return (
    <motion.div
      ref={blobRef}
      className={`absolute rounded-full ${color} blur-3xl`}
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.3 }}
      transition={{ 
        duration: 2, 
        delay,
        ease: "easeOut"
      }}
    />
  );
};

// Glassmorphism card with enhanced styling
const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl overflow-hidden"
    style={{
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
    }}
  >
    {children}
  </motion.div>
);

const ModernAuth = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [userType, setUserType] = useState<"user" | "admin">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // Check if user credentials are stored in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedEmail && savedPassword) {
      setLoginData({
        email: savedEmail,
        password: savedPassword,
      });
      setRememberMe(true);
    }
  }, []);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType === "admin") {
      navigate("/admin/login");
      return;
    }
    
    setIsLoading(true);
    setShowLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const registeredUsersString = localStorage.getItem("registeredUsers");
      const registeredUsers = registeredUsersString ? JSON.parse(registeredUsersString) : [];
      
      const user = registeredUsers.find((u: RegisteredUser) => u.email === loginData.email);
      
      if (!user) {
        setError("No account found with this email. Please sign up first.");
        setIsLoading(false);
        setShowLoading(false);
        return;
      }
      
      if (user.password !== loginData.password) {
        setError("Incorrect password. Please try again.");
        setIsLoading(false);
        setShowLoading(false);
        return;
      }
      
      setError("");
      localStorage.setItem("user", JSON.stringify({
        name: user.name,
        email: user.email,
        userType: userType
      }));
      
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", loginData.email);
        localStorage.setItem("rememberedPassword", loginData.password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
    }, 1500);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setShowLoading(true);
    
    setTimeout(() => {
      if (signupData.password !== signupData.confirmPassword) {
        setError("Passwords do not match. Please try again.");
        setIsLoading(false);
        setShowLoading(false);
        return;
      }
      
      if (signupData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setIsLoading(false);
        setShowLoading(false);
        return;
      }
      
      const registeredUsersString = localStorage.getItem("registeredUsers");
      const registeredUsers = registeredUsersString ? JSON.parse(registeredUsersString) : [];
      
      const existingUser = registeredUsers.find((u: RegisteredUser) => u.email === signupData.email);
      if (existingUser) {
        setError("An account with this email already exists. Please sign in instead.");
        setIsLoading(false);
        setShowLoading(false);
        return;
      }
      
      setError("");
      
      const newUser = {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      };
      
      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      
      localStorage.setItem("user", JSON.stringify({
        name: signupData.name,
        email: signupData.email,
        userType: "user"
      }));
    }, 1500);
  };

  const handleLoadingComplete = () => {
    navigate("/home");
  };

  if (showLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated Background Blobs */}
      <FloatingBlob 
        size={300} 
        color="bg-blue-400" 
        initialX="10%" 
        initialY="15%" 
        delay={0}
        parallaxIntensity={0.05}
      />
      <FloatingBlob 
        size={250} 
        color="bg-purple-400" 
        initialX="80%" 
        initialY="10%" 
        delay={0.3}
        parallaxIntensity={0.08}
      />
      <FloatingBlob 
        size={200} 
        color="bg-indigo-400" 
        initialX="70%" 
        initialY="70%" 
        delay={0.6}
        parallaxIntensity={0.06}
      />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Deoghar Kitab
            </h1>
            <p className="text-gray-600 mt-2">
              {authMode === "signin" ? "Welcome back to your book journey" : "Start your reading adventure"}
            </p>
          </motion.div>

          {/* Auth Card */}
          <GlassCard>
            <CardHeader className="text-center pb-6 pt-8">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                {authMode === "signin" ? "Sign In" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {authMode === "signin" 
                  ? "Access your book collection and marketplace" 
                  : "Join thousands of book lovers worldwide"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl text-red-700 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* User Type Toggle */}
              <div className="flex rounded-xl bg-white/20 backdrop-blur-sm p-1 mb-6 border border-white/30">
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    userType === "user"
                      ? "bg-white/80 shadow-sm text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setUserType("user")}
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Reader
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    userType === "admin"
                      ? "bg-white/80 shadow-sm text-purple-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => {
                    setUserType("admin");
                    if (authMode === "signin") {
                      setTimeout(() => {
                        navigate("/admin/login");
                      }, 300);
                    }
                  }}
                >
                  <Shield className="w-4 h-4 inline mr-2" />
                  Admin
                </button>
              </div>
              
              {authMode === "signin" ? (
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        className="pl-12 h-14 bg-white/50 backdrop-blur-sm border-white/30 focus:bg-white/70 focus:border-blue-300 transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className="pl-12 pr-12 h-14 bg-white/50 backdrop-blur-sm border-white/30 focus:bg-white/70 focus:border-blue-300 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSignupSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="signup-name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={handleSignupChange}
                        className="pl-12 h-14 bg-white/50 backdrop-blur-sm border-white/30 focus:bg-white/70 focus:border-purple-300 transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        className="pl-12 h-14 bg-white/50 backdrop-blur-sm border-white/30 focus:bg-white/70 focus:border-purple-300 transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        className="pl-12 pr-12 h-14 bg-white/50 backdrop-blur-sm border-white/30 focus:bg-white/70 focus:border-purple-300 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="signup-confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="signup-confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        className="pl-12 pr-12 h-14 bg-white/50 backdrop-blur-sm border-white/30 focus:bg-white/70 focus:border-purple-300 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 bg-white/50 backdrop-blur-sm"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Terms of Service</a> and <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col pb-8 px-8">
              <div className="text-sm text-center text-gray-600">
                {authMode === "signin" ? "New to Deoghar Kitab?" : "Already have an account?"}{" "}
                <button
                  onClick={() => {
                    setAuthMode(authMode === "signin" ? "signup" : "signin");
                    setError("");
                  }}
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  {authMode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </div>
            </CardFooter>
          </GlassCard>
          
          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 text-sm text-gray-500"
          >
            <p>© 2025 Deoghar Kitab Reads. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernAuth;