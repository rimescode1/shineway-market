"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Menu, User, Leaf, MapPin } from "lucide-react";
import { FloatingLeaves, HoverLeaf } from "@/components/AnimatedLeaves";

import { useLocation } from "@/hooks/useLocation";
import Image from "next/image";
import React from "react";
import useProductHook from "@/hooks/useProductHook";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";

const StickyNavbar = () => {
  const { countryName } = useProductHook();
  const { state } = useCart();

  return (
    <section className=" z-50 bg-white/80 backdrop-blur-md border-b  border-green-100 sticky top-2 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link className="flex flex-row items-center" href="/">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Image
                  src="/logo.png"
                  width={100}
                  height={100}
                  alt="Shiny logo"
                  className="aspect-video h-20 w-20 object-cover"
                />
              </div>
              <span className="text-xl md:text-2xl font-bold text-block bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                Shiny Market
              </span>
            </Link>
          </div>

          <div className="flex items-center text-black space-x-4">
            {countryName && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4" />
                <span className="capitalize">{countryName}</span>
              </div>
            )}

            <HoverLeaf>
              <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <User className="w-6 h-6" />
              </button>
            </HoverLeaf>

            <HoverLeaf>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Link>
            </HoverLeaf>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyNavbar;

/* <section className=" z-40 bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 left-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-16">
         
            <div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link className="flex flex-row items-center" href="/">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    width={100}
                    height={100}
                    alt="Shiny logo"
                    className="aspect-video h-20 w-20 object-cover"
                  />
                </div>
                <span className="text-xl md:text-2xl font-bold text-block bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                  Shiny Market
                </span>
              </Link>
            </div>

           
            <div className="flex items-center text-black space-x-4">
         
              {countryName && (
                <div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="capitalize">{countryName}</span>
                </div>
              )}

              <HoverLeaf>
                <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                  <User className="w-6 h-6" />
                </button>
              </HoverLeaf>

              <HoverLeaf>
                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-700" />
                  {state.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {state.itemCount}
                    </span>
                  )}
                </Link>
              </HoverLeaf>
            </div>
          </div>
        </div>
      </section> */
