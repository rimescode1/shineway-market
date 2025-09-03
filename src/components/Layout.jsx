"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Menu, User, Leaf, MapPin } from "lucide-react";
import { FloatingLeaves, HoverLeaf } from "@/components/AnimatedLeaves";
// import { LocationModal } from "@/components/LocationModal";
import { useLocation } from "@/hooks/useLocation";
import Image from "next/image";

export const Layout = ({ children }) => {
  const { location, loading, error, hasPermission, requestLocation } =
    useLocation();
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    if (!loading && !hasPermission) {
      setShowLocationModal(true);
    }
  }, [loading, hasPermission]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <FloatingLeaves />

      {/* Header */}

      {/* Main Content */}
      <main className="relative z-10">{children}</main>

      {/* Location Modal */}
      {/* <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onRequestLocation={() => {
          requestLocation();
          setShowLocationModal(false);
        }}
        loading={loading}
        error={error}
      /> */}
    </div>
  );
};
