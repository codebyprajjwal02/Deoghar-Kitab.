import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrowseBooks from "@/components/BrowseBooks";
import SellSection from "@/components/SellSection";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <BrowseBooks />
      <SellSection />
      <WhyChoose />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
