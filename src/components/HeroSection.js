"use client";
import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-x-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-100/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Leaf className="w-12 h-12" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <Leaf className="w-4 h-4" />
            <span>100% Natural & Organic</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Nature&apos;s Finest
          <br />
          <motion.span
            className="inline-block"
            animate={{
              backgroundPosition: ["0%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage:
                "linear-gradient(45deg, #22c55e, #10b981, #059669)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Herbal Products
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover premium herbal products sourced from nature&apos;s bounty.
          Enhance your wellness journey with our carefully curated collection of
          organic herbs, supplements, and natural remedies.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Shop Now</span>
            <motion.div className="group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <motion.button
            className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "500+", label: "Natural Products" },
            { number: "50+", label: "Countries Served" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
