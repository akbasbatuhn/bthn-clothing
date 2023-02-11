import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (cartItems, productToDelete) => {
  const newCartItems = deleteAnItemFromList(cartItems, productToDelete);
  // console.log(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems));
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
