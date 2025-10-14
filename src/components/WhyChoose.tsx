import { motion } from "framer-motion";
import { Wallet, Recycle, Users } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Save Money",
    description: "Buy quality books at a fraction of the original price and make your reading more affordable",
  },
  {
    icon: Recycle,
    title: "Declutter & Earn",
    description: "Turn your unused books into cash while helping others discover great stories",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a passionate community of book lovers committed to sustainable reading",
  },
];

const WhyChoose = () => {
  return (
    <section id="why" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary">Deoghar Kitab</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More than just a marketplace — a movement towards sustainable and accessible reading
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card p-8 rounded-lg shadow-soft hover:shadow-hover transition-all duration-300 text-center h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-block mb-6"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <feature.icon className="w-10 h-10 text-primary" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
