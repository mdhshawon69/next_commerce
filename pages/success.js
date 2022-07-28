/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantities = useSelector((state) => state.cart.totalQuantities);

  useEffect(() => {
    localStorage.clear();
    cartItems = [];
    totalPrice = 0;
    totalQuantities = 0;
    runFireworks();
  }, []);

  return (
    <div>
      <div className='success-wrapper'>
        <div className='success'>
          <p className='icon'>
            <BsBagCheckFill />
          </p>
          <h2>Thank you for your order</h2>
          <p className='email-msg'>Check your email inbox for the receipt.</p>
          <p className='description'>
            If you have any question, please mail us at{" "}
            <a href='mailto:next69@commerce.com' className='email'>
              next69@commerce.com
            </a>
          </p>
          <Link href='/'>
            <button type='button' width='300px' className='btn'>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
