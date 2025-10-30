import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Plus, 
  Book,  
  User, 
  Package,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Upload,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define interfaces for better type safety
interface SellerData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

interface SellerBook {
  id: number;
  title: string;
  author: string;
  price: number;
  condition: string;
  status: string;
  date: string;
  sales: number;
  revenue: number;
  sellerEmail: string;
  category?: string;
  description?: string;
}

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"add" | "manage" | "analytics">("add");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    condition: "good",
    description: "",
    category: "ncert",
  });
  const [bookImages, setBookImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [user, setUser] = useState<{email: string, userType: string} | null>(null);
  const [sellerData, setSellerData] = useState<SellerData | null>(null);

  // Load seller books from localStorage or use mock data
  const [sellerBooks, setSellerBooks] = useState<SellerBook[]>(() => {
    const savedBooks = localStorage.getItem("sellerBooks");
    if (savedBooks) {
      return JSON.parse(savedBooks);
    }
    // Mock data for initial state
    return [
      {
        id: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 299,
        condition: "Good",
        status: "Published",
        date: "2023-05-15",
        sales: 5,
        revenue: 1495,
        sellerEmail: "example@example.com",
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        price: 249,
        condition: "Excellent",
        status: "Published",
        date: "2023-05-18",
        sales: 3,
        revenue: 747,
        sellerEmail: "example@example.com",
      },
      {
        id: 3,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 199,
        condition: "Fair",
        status: "Pending",
        date: "2023-05-20",
        sales: 0,
        revenue: 0,
        sellerEmail: "example@example.com",
      },
    ];
  });

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      setUser(userData);
      
      // Load seller data
      const sellerDataString = localStorage.getItem(`seller_${userData.email}`);
      if (sellerDataString) {
        setSellerData(JSON.parse(sellerDataString));
      }
    } else {
      // Redirect to login if not logged in
      navigate("/");
    }
  }, [navigate]);

  // Save seller books to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("sellerBooks", JSON.stringify(sellerBooks));
  }, [sellerBooks]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setBookImages(files);
      
      // Create previews for selected images
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle book submission logic here
    console.log("Book submitted:", formData, bookImages);
    
    // Add new book to seller's books
    const newBook = {
      id: Date.now(), // Use timestamp for unique ID
      title: formData.title,
      author: formData.author,
      price: parseInt(formData.price),
      condition: formData.condition,
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      sales: 0,
      revenue: 0,
      sellerEmail: user?.email || "",
    };
    
    const updatedBooks = [...sellerBooks, newBook];
    setSellerBooks(updatedBooks);
    
    // Reset form
    setFormData({
      title: "",
      author: "",
      price: "",
      condition: "good",
      description: "",
      category: "ncert",
    });
    
    // Reset images
    setBookImages([]);
    setImagePreviews([]);
    
    // Show success message
    alert("Book added successfully! It will be reviewed and published shortly.");
  };

  const filteredBooks = sellerBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || book.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Filter books for current seller only
  const sellerSpecificBooks = sellerBooks.filter(book => book.sellerEmail === user?.email);

  const stats = [
    { title: "Total Books", value: sellerSpecificBooks.length.toString(), icon: Book, change: "+2" },
    { title: "Published", value: sellerSpecificBooks.filter(b => b.status === "Published").length.toString(), icon: BookOpen, change: "+1" },
    { title: "Pending Approval", value: sellerSpecificBooks.filter(b => b.status === "Pending").length.toString(), icon: Filter, change: "+0" },
    { title: "Total Sales", value: sellerSpecificBooks.reduce((sum, book) => sum + book.sales, 0).toString(), icon: Package, change: "+3" },
    { title: "Revenue", value: `₹${sellerSpecificBooks.reduce((sum, book) => sum + book.revenue, 0)}`, icon: DollarSign, change: "+₹450" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Seller Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <span className="text-sm font-medium">{sellerData?.name || user?.email}</span>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "add" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("add")}
          >
            Add New Book
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "manage" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Books
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "analytics" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </div>

        {/* Add Book Form */}
        {activeTab === "add" && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Book</CardTitle>
              <CardDescription>List a new book for sale</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Book Title</label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="author" className="text-sm font-medium">Author</label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium">Price (₹)</label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="condition" className="text-sm font-medium">Condition</label>
                    <Select name="condition" value={formData.condition} onValueChange={(value) => handleSelectChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                    <Select name="category" value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ncert">NCERT Books</SelectItem>
                        <SelectItem value="reference">Reference Books</SelectItem>
                        <SelectItem value="competitive">Competitive Exams</SelectItem>
                        <SelectItem value="government">Government Exams</SelectItem>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="nonfiction">Non-Fiction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the book's condition, any damage, etc."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Book Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="mt-2">Drag and drop images here, or click to select files</p>
                    <p className="text-sm text-gray-500">Upload clear photos of the book cover and condition</p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-4"
                    />
                  </div>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newPreviews = [...imagePreviews];
                              newPreviews.splice(index, 1);
                              setImagePreviews(newPreviews);
                              
                              const newFiles = [...bookImages];
                              newFiles.splice(index, 1);
                              setBookImages(newFiles);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  List Book for Sale
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Manage Books */}
        {activeTab === "manage" && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Manage Books</CardTitle>
                  <CardDescription>View and manage your listed books</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search books..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Listed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.filter(book => book.sellerEmail === user?.email).map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>₹{book.price}</TableCell>
                      <TableCell>{book.condition}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            book.status === "Published" ? "default" : 
                            book.status === "Pending" ? "secondary" : 
                            "destructive"
                          }
                        >
                          {book.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{book.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredBooks.filter(book => book.sellerEmail === user?.email).length} of {sellerSpecificBooks.length} books
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Previous</Button>
                <Button variant="outline">Next</Button>
              </div>
            </CardFooter>
          </Card>
        )}

        {/* Analytics */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Your sales performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-muted-foreground">Sales chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sellerSpecificBooks
                      .sort((a, b) => b.sales - a.sales)
                      .slice(0, 5)
                      .map((book, index) => (
                        <div key={book.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{book.title}</p>
                            <p className="text-xs text-muted-foreground">{book.author}</p>
                          </div>
                          <Badge variant="secondary">{book.sales} sales</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Book className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New book listed</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Package className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Book sold</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment received</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;