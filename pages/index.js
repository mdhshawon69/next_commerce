import React from "react";
import { FooterBanner, HeroBanner, Product } from "../components/index";
import { client } from "../lib/client";

const Homepage = ({ products, banner }) => {
  return (
    <>
      <HeroBanner bannerData={banner.length && banner[0]} />
      <div className='products-heading'>
        <h2>Best selling products</h2>
        <p>Speakers of many varients</p>
      </div>
      <div className='products-container'>
        {products?.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
      <FooterBanner bannerData={banner && banner[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);
  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      banner,
    },
  };
};

export default Homepage;
