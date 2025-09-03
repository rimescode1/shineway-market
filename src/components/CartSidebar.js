"use client";
import React, { useState } from "react";

import { ShoppingCart, X, MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, removeItem, updateQuantity } = useCart();

  return (
    <>
      {/* Cart Icon Button */}
      <button onClick={() => setIsOpen(true)} className="relative p-2">
        <ShoppingCart className="h-6 w-6 text-gray-700" />
        {state.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {state.itemCount}
          </span>
        )}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto">
            {state.items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 border-b"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-green-600 text-sm">
                          {item.currencySymbol}
                          {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <MinusCircle className="h-4 w-4 text-gray-500" />
                        </Button>
                        <span className="text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <PlusCircle className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>

                      <Button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-green-600">
                  {state.items[0]?.currencySymbol || "$"}
                  {state.total.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <Link
                  href="/cart"
                  className="block w-full bg-gray-200 text-gray-800 text-center py-2 rounded font-medium hover:bg-gray-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  className="block w-full bg-green-500 text-white text-center py-2 rounded font-medium hover:bg-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
