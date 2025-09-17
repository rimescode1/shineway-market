"use client";
import useProductHook from "@/hooks/useProductHook";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@headlessui/react";
import {
  CheckCircle2,
  CrossIcon,
  MinusCircle,
  PlusCircle,
  XCircle,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const Shop = () => {
  const { location, loading, error, country, availableProducts, currency } =
    useProductHook();
  const { state, addItem, updateQuantity, removeItem } = useCart();

  // Get quantities from cart items instead of local state
  const getQuantityFromCart = (productId) => {
    const cartItem = state.items.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = Math.max(0, newQuantity);

    if (quantity === 0) {
      // Remove item if quantity is 0
      removeItem(productId);
    } else {
      // Update quantity in cart
      updateQuantity(productId, quantity);
    }
  };

  const handleAddToCart = (product) => {
    const currentQuantity = getQuantityFromCart(product.id);

    if (currentQuantity === 0) {
      // Add new item to cart
      addItem({
        id: product.id,
        name: product.name,
        price: product.countrySupport[country].price,
        bp: product.countrySupport[country].bp,
        image: product.image,
        currencySymbol: currency.currencySymbol,
      });
    }
    // If item already exists, quantity is already managed by the input fields
  };

  if (error) {
    return <p> error...{error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular herbal products, carefully selected for
              their quality and effectiveness.
            </p>
          </div>
          {availableProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 text-black">
              {availableProducts.map((product, index) => {
                const quantity = getQuantityFromCart(product.id);
                const productPrice = product.countrySupport[country].price;
                const subTotal = quantity * productPrice;
                const isInCart = quantity > 0;

                return (
                  <div key={product.id}>
                    <div className="border border-gray-200 shadow rounded-md relative p-2 bg-gray-100">
                      <div className="flex flex-row gap-2">
                        <img
                          src={product.image}
                          className="w-20 h-20 object-cover"
                          alt={product.name}
                        />
                        <div>
                          <p className="font-bold">{product.name}</p>
                          <p>
                            {currency.currencySymbol}
                            {productPrice.toLocaleString()}
                          </p>
                          <p>
                            BP{" "}
                            <span className="font-bold">
                              {product.countrySupport[country].bp}
                            </span>
                          </p>
                        </div>
                      </div>

                      {isInCart ? (
                        // Show quantity controls for items already in cart
                        <>
                          <div className="flex items-center justify-center my-2 gap-2">
                            <Button
                              className="cursor-pointer text-yellow-500"
                              onClick={() =>
                                handleQuantityChange(product.id, quantity - 1)
                              }
                            >
                              <MinusCircle />
                            </Button>
                            <Input
                              type="number"
                              min="0"
                              className="outline-1 rounded mx-1 px-1.5 w-20 text-center border"
                              value={quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  product.id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                            />
                            <Button
                              className="cursor-pointer text-green-700"
                              onClick={() =>
                                handleQuantityChange(product.id, quantity + 1)
                              }
                            >
                              <PlusCircle />
                            </Button>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p>
                              Sub Total:
                              <span className="font-bold">
                                {currency.currencySymbol}
                                {subTotal.toLocaleString()}
                              </span>
                            </p>
                            <Button
                              onClick={() =>
                                handleQuantityChange(product.id, 0)
                              }
                              className="cursor-pointer absolute top-2 right-2"
                              title="Remove from cart"
                            >
                              <XCircle
                                className="text-red-700 font-bold"
                                size={30}
                              />
                            </Button>
                          </div>
                        </>
                      ) : (
                        // Show add to cart button for items not in cart
                        <div className="flex flex-col items-center mt-4">
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 transition-colors"
                          >
                            <ShoppingCart size={18} />
                            Add to Cart
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
    </div>
  );
};

export default Shop;
