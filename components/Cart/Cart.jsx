/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { urlFor } from "../../lib/client";
import { cartActions } from "../../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const totalQuantities = useSelector((state) => state.cart.totalQuantities);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartRef = useRef();
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          className='cart-heading'
          type='button'
          onClick={() => dispatch(cartActions.showCart())}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart :</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
                className='btn'
                onClick={() => dispatch(cartActions.showCart())}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className='product' key={item._id}>
                <img
                  src={urlFor(item.image[0])}
                  alt='product-image'
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.productTotalPrice}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() =>
                            dispatch(
                              cartActions.toggleCartItemQuantity({
                                id: item._id,
                                value: "dec",
                              })
                            )
                          }>
                          <AiOutlineMinus />
                        </span>
                        <span className='num'>{item.quantity}</span>
                        <span
                          className='plus'
                          onClick={() =>
                            dispatch(
                              cartActions.toggleCartItemQuantity({
                                id: item._id,
                                value: "inc",
                              })
                            )
                          }>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <div
                      type='button'
                      className='remove-item'
                      onClick={() =>
                        dispatch(cartActions.removeProduct({ id: item._id }))
                      }>
                      <TiDeleteOutline />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn'>
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
