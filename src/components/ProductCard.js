"use client";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, Leaf } from "lucide-react";
import { HoverLeaf } from "./AnimatedLeaves";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({ product, location }) => {
  return (
    <motion.div
      className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          // width={300}
          // height={300}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Organic Badge */}
        {product.organic && (
          <motion.div
            className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Leaf className="w-3 h-3" />
            <span>Organic</span>
          </motion.div>
        )}

        {/* Wishlist Button */}
        <motion.button
          className="absolute top-3 right-3 p-2 font-bold bg-yellow-500 backdrop-blur-sm rounded-full text-black hover:text-red-500 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {product.countrySupport[location].bp} BP
        </motion.button>

        {/* Floating Leaves on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400/30"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Leaf className="w-4 h-4" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold flex flex-row gap-2 text-green-600">
            <p>{product.countrySupport[location].currency}</p>
            <p>
              {Number(
                product.countrySupport[location].price.toFixed(2)
              ).toLocaleString()}
            </p>
          </div>

          <Link href="/shop">
            <motion.button
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
