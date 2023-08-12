import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx';

const CartIcon = () => {
const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

//creating a toggle function is used when you want to create an inverted action if it is open, close it, if it is closed then open it.
const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
    <ShoppingIcon  />
    <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;