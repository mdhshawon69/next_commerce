import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const Navbar = () => {
  const showCart = useSelector((state) => state.cart.showCart);
  const totalQuantities = useSelector((state) => state.cart.totalQuantities);
  const dispatch = useDispatch();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Next Commerce</Link>
      </p>
      <button
        type='button'
        className='cart-icon'
        onClick={() => dispatch(cartActions.showCart())}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
