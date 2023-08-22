import { CART_ACTION_TYPE } from "./cart.types";
import { createAction } from '../../utils/reducer/reducer.utils';

//helper function that finds similar product id in the cart, if found incriment it by 1
const addCartItem = (cartItems, productToAdd) => {

    //step 1: find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
        );

    //step 2: if found, increment quantity by one
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
        {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        )
    }

    //step 3:return new array with modified cartItems/newCartItem
    return [...cartItems, {...productToAdd, quantity:1 }];
};


const removeCartItem = (cartItems, cartItemToRemove) => {

    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //check if quantity is equal to one, if it is remove that item from the cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    };

    //return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        );
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, boolean);

//action creators
export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
  };

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
      const newCartItems = removeCartItem(cartItems, cartItemToRemove);
      return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
    };

export const clearItemFromCart = (cartItems, cartItemToClear) => {
      const newCartItems = clearCartItem(cartItems, cartItemToClear);
      return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
    };