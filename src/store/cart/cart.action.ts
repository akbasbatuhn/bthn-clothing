import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

// helper func
const removeCartItem = (
  cartItemList: CartItem[],
  productToRemove: CategoryItem
): CartItem[] => {
  // check if product has more than 1 quantity
  const existingCartItem = cartItemList.find(
    (product) => product.id === productToRemove.id
  );

  // if not, remove item
  if (existingCartItem && existingCartItem.quantity === 1) {
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
const addCartItem = (
  cartItemList: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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

const deleteAnItemFromList = (
  cartItemList: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  // remove it from list
  return cartItemList.filter((product) => product.id !== productToRemove.id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const deleteItemFromCart = (
  cartItems: CartItem[],
  productToDelete: CartItem
) => {
  const newCartItems = deleteAnItemFromList(cartItems, productToDelete);
  return setCartItems(newCartItems);
};
