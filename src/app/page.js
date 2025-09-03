"use client";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import { HeroSection } from "../components/HeroSection";
import { motion } from "framer-motion";
import { Leaf, Star, Shield, Truck, Award, Users, Globe } from "lucide-react";
import Image from "next/image";
import { useLocation } from "@/hooks/useLocation";
import { mockProducts } from "@/constant/productList";
import useProductHook from "@/hooks/useProductHook";
import Link from "next/link";

const features = [
  {
    icon: Leaf,
    title: "Natural & Organic",
    description: "Sourced from certified organic farms worldwide",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Rigorous testing ensures the highest standards",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Safe & Tested",
    description: "Lab-tested for purity and potency",
    color: "from-blue-400 to-indigo-500",
  },
];

export default function Home() {
  const { location, loading, error, country, availableProducts, countryName } =
    useProductHook();

  const filterCountry = availableProducts.filter((item) => item.countrySupport);

  console.log(filterCountry, "LDLDLDLDLLDDLDLDLKDJFHFGFT");

  if (error) {
    return <p> error...{error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" bg-gray-200   ">
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Welcome to
              <br />
              <span className=" text-red-600">SHINY MARKET PLACE</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to bringing you the finest natural products
              with uncompromising quality and purity.
            </p>
            <p className=" text-black">
              Our Online market Place is available in Nigeria, Tanzania and
              Kenya at the moment
            </p>
            <p className=" text-black  font-bold text-2xl">
              Your are in{" "}
              <span className=" text-red-500 uppercase">{countryName}</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-green-100 group hover:bg-white/70 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular herbal products, carefully selected for
              their quality and effectiveness.
            </p>
          </motion.div>

          {availableProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {availableProducts.slice(0, 6).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard
                      product={product}
                      location={country.toLowerCase()}
                    />
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/shop">View All Products</Link>
                </motion.button>
              </motion.div>
            </>
          ) : (
            <div className=" flex justify-center items-center text-black ">
              <div className=" border p-4 rounded bg-white">
                PRODUCT IS NOT AVAILABLE IN YOUR REGION,
                <span className=" uppercase font-extrabold"> {country}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="py-16 px-4 bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
      
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <Leaf className="w-16 h-16" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Natural Wellness
            </h2>
            <p className="text-green-100 mb-8 text-lg">
              Subscribe to our newsletter for exclusive offers, health tips, and
              new product launches.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 backdrop-blur-sm"
              />
              <motion.button
                className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section> */}
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      width={100}
                      height={100}
                      alt="Shiny logo"
                      className=" aspect-video h-20 w-20 object-cover "
                    />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                    Shiny Market
                  </span>
                </motion.div>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                SHINEWAY is a Pharmaceutical company which began her operations
                in the year 1970, Producing over 400 different Pharmaceutical
                Products. Shineway is known for producing Traditional Chinese
                Medicine, with seven factories across China, has two
                Headquarters, situated in Hong Kong and Shjiazhuang, Hebei.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <motion.div
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, backgroundColor: "#059669" }}
                >
                  <Users className="w-5 h-5" />
                </motion.div>
                <motion.div
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, backgroundColor: "#059669" }}
                >
                  <Globe className="w-5 h-5" />
                </motion.div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              {/* <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["About Us", "Products", "Blog", "Contact", "FAQ"].map(
                  (link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="text-gray-300 hover:text-green-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  )
                )}
              </ul> */}
            </div>

            {/* Categories */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {[
                  "Herbs & Spices",
                  "Supplements",
                  "Teas",
                  "Essential Oils",
                  "Superfoods",
                ].map((category) => (
                  <li key={category}>
                    <motion.a
                      href="#"
                      className="text-gray-300 hover:text-green-400 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {category}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 HerbalMarket. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
