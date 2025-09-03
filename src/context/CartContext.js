"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create context
const CartContext = createContext();

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return calculateTotals(updatedItems);
      }

      // Add new item with quantity 1
      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return calculateTotals(newItems);
    }

    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return calculateTotals(filteredItems);
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove items with 0 quantity

      return calculateTotals(updatedItems);
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        totalBP: 0,
        itemCount: 0,
      };

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
}

// Helper function to calculate totals
function calculateTotals(items) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalBP = items.reduce((sum, item) => sum + item.bp * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return {
    items,
    total,
    totalBP,
    itemCount,
  };
}

// Cart provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    totalBP: 0,
    itemCount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("herbal_cart");
    if (savedCart) {
      try {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("herbal_cart", JSON.stringify(state));
  }, [state]);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
