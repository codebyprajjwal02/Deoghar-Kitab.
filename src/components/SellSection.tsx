import { motion } from "framer-motion";
import { Upload, DollarSign, Camera, BookOpen } from "lucide-react";
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

const SellSection = () => {
  const { t } = useLanguage();

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

            {/* Sell Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg shadow-soft"
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.sell.bookTitle}</label>
                  <Input placeholder={t.sell.titlePlaceholder} className="focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.sell.author}</label>
                  <Input placeholder={t.sell.authorPlaceholder} className="focus:ring-2 focus:ring-primary" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.sell.condition}</label>
                    <Select>
                      <SelectTrigger className="focus:ring-2 focus:ring-primary">
                        <SelectValue placeholder={t.sell.select} />
                      </SelectTrigger>
                      <SelectContent className="bg-card z-50">
                        <SelectItem value="excellent">{t.browse.excellent}</SelectItem>
                        <SelectItem value="good">{t.browse.good}</SelectItem>
                        <SelectItem value="fair">{t.browse.fair}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.sell.price}</label>
                    <Input type="number" placeholder="299" className="focus:ring-2 focus:ring-primary" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.sell.description}</label>
                  <Textarea
                    placeholder={t.sell.descriptionPlaceholder}
                    rows={4}
                    className="focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.sell.uploadPhotos}</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer group">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
                    <p className="text-sm text-muted-foreground">
                      {t.sell.uploadText}
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full hover:scale-105 transition-transform">
                  {t.sell.listBookBtn}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellSection;
