import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx';

const CartIcon = () => {
const dispatch = useDispatch();

const cartCount = useSelector(selectCartCount);
const isCartOpen = useSelector(selectIsCartOpen);

//creating a toggle function is used when you want to create an inverted action if it is open, close it, if it is closed then open it.
const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
    <ShoppingIcon  />
    <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;