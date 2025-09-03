"use client";
import React from "react";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { Button, Input } from "@headlessui/react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to see them here.
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

  return (
    <div className="min-h-screen bg-gray-50 text-black py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-2  items-center justify-between py-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-green-600 font-medium">
                    {item.currencySymbol}
                    {item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center mt-4 md:mt-0 space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <MinusCircle className="h-5 w-5 text-gray-500" />
                  </Button>

                  {/* Replace the span with an Input field */}
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-12 text-center border rounded py-1"
                  />

                  <Button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <PlusCircle className="h-5 w-5 text-gray-500" />
                  </Button>
                </div>

                <p className="w-20 text-right font-medium">
                  {item.currencySymbol}
                  {(item.price * item.quantity).toLocaleString()}
                </p>

                <Button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
            <Button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Clear Cart
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">
                {state.items[0]?.currencySymbol || "$"}
                {state.total.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Bonus Points:</span>
              <span className="font-medium">{state.totalBP}</span>
            </div>
            <div className="flex justify-between pt-4 border-t">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-green-600">
                {state.items[0]?.currencySymbol || "$"}
                {state.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link
            href="/shop"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/checkout"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
