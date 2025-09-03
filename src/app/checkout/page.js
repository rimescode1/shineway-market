"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Button, Input } from "@headlessui/react";
import {
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const CheckoutPage = () => {
  const { state, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen text-black bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart before checking out.
          </p>
          <Link
            href="/shop"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen text-black bg-gray-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will
            be shipped soon.
          </p>
          <div className="space-y-4">
            <Link
              href="/shop"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors mr-4"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black bg-gray-50 py-8 px-4">
      <p className=" text-3xl bg-red-700 text-white p-2 rounded-md text-center my-4 ">
        This is a test page, please dont enter your card details here
      </p>
      <div className="max-w-6xl mx-auto">
        <Link
          href="/cart"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {item.currencySymbol}
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">
                    {state.items[0]?.currencySymbol || "$"}
                    {state.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-medium">
                    {state.items[0]?.currencySymbol || "$"}10.00
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span>Tax:</span>
                  <span className="font-medium">
                    {state.items[0]?.currencySymbol || "$"}
                    {(state.total * 0.08).toFixed(2)}
                  </span>
                </div> */}
                <div className="flex justify-between pt-4 border-t font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">
                    {state.items[0]?.currencySymbol || "$"}
                    {state.total.toLocaleString()}
                    {/* {state.items[0]?.currencySymbol || "$"}
                    {(state.total + 10 + state.total * 0.08).toFixed(2)} */}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Bonus Points Earned:</span>
                  <span className="font-medium text-green-600">
                    +{state.totalBP}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Information
                </h2>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="Postal code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Input
                    type="text"
                    name="cardName"
                    placeholder="Name on card"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Place Order • ${state.items[0]?.currencySymbol || "$"}${(
                    state.total +
                    10 +
                    state.total * 0.08
                  ).toFixed(2)}`
                )}
              </Button>

              <div className="flex items-center justify-center text-sm text-gray-500">
                <Lock className="h-4 w-4 mr-1" />
                Your payment is secure and encrypted
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
