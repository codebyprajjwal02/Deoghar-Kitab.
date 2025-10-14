import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 299,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: 249,
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 199,
    condition: "Fair",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 349,
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1550399504-8953e1a1f1cb?w=400&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Moby Dick",
    author: "Herman Melville",
    price: 279,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop",
  },
  {
    id: 6,
    title: "War and Peace",
    author: "Leo Tolstoy",
    price: 399,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop",
  },
];

const BrowseBooks = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <section id="browse" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Browse <span className="text-primary">Books</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your next favorite story from our curated collection of second-hand books
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by title or author..."
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="bg-card z-50">
              <SelectItem value="fiction">Fiction</SelectItem>
              <SelectItem value="nonfiction">Non-Fiction</SelectItem>
              <SelectItem value="mystery">Mystery</SelectItem>
              <SelectItem value="romance">Romance</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent className="bg-card z-50">
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent className="bg-card z-50">
              <SelectItem value="low">Under ₹200</SelectItem>
              <SelectItem value="mid">₹200 - ₹400</SelectItem>
              <SelectItem value="high">Above ₹400</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                      favorites.includes(book.id)
                        ? "bg-primary text-white"
                        : "bg-white/90 text-foreground hover:bg-primary hover:text-white"
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={favorites.includes(book.id) ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-md text-foreground hover:bg-primary hover:text-white transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  {book.condition}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">{book.title}</h3>
                <p className="text-muted-foreground mb-4">{book.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">₹{book.price}</span>
                  <Button size="sm" className="hover:scale-105 transition-transform">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseBooks;
