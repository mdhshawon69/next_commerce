/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Head from "next/head";

import { client, urlFor } from "../../lib/client";
import Product from "../../components/Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const ProductDetails = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const qty = useSelector((state) => state.cart.qty);

  const buyNow = () => {
    dispatch(cartActions.onAdd({ product: product, quantity: qty }));
    dispatch(cartActions.showCart());
  };

  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <meta name={product.name} content={product.details} />
      </Head>

      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              className='product-detail-image'
              src={urlFor(product.image && product.image[index])}
              alt=''
            />
          </div>
          <div className='small-images-container'>
            {product.image?.map((item, i) => (
              <img
                src={urlFor(item)}
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{product.name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{product.details}</p>
          <p className='price'>${product.price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span
                className='minus'
                onClick={() => dispatch(cartActions.decQty())}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span
                className='plus'
                onClick={() => dispatch(cartActions.incQty())}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() =>
                dispatch(cartActions.onAdd({ product: product, quantity: qty }))
              }>
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={buyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item, i) => (
              <Product key={i} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return {
    props: {
      product,
      products,
    },
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default ProductDetails;
