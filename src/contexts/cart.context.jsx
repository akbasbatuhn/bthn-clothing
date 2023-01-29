import { useState, createContext, useEffect } from "react";

// helper func
const removeCartItem = (cartItemList, productToRemove) => {
  // check if product has more than 1 quantity
  const existingCartItem = cartItemList.find(
    (product) => product.id === productToRemove.id
  );

  // if not, remove item
  if (existingCartItem.quantity === 1) {
    return cartItemList.filter((product) => product.id !== productToRemove.id);
  }

  // if has, decrease quantity by 1
  return cartItemList.map((product) =>
    product.id === productToRemove.id
      ? { ...product, quantity: product.quantity - 1 }
      : product
  );
};

// helper func
const addCartItem = (cartItemList, productToAdd) => {
  // is productToAdd in cartList
  const isCartContainThatProduct = cartItemList.find(
    (product) => product.id === productToAdd.id
  );

  // if there is, add 1 quantity
  if (isCartContainThatProduct) {
    return cartItemList.map((product) =>
      product.id === productToAdd.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  // if not, add item to cart
  return [...cartItemList, { ...productToAdd, quantity: 1 }];
};

const deleteAnItemFromList = (cartItemList, productToRemove) => {
  // remove it from list
  return cartItemList.filter((product) => product.id !== productToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteAnItemFromList(cartItems, productToDelete));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    totalPrice,
    deleteItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
