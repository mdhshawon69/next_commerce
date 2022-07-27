import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../lib/client";

const HeroBanner = ({ bannerData }) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{bannerData.smallText}</p>
        <h3>{bannerData.midText}</h3>
        <h1>{bannerData.largeText1}</h1>
        <img
          src={urlFor(bannerData.image)}
          alt='headphones'
          className='hero-banner-image'
        />

        <div>
          <Link href={`/product/ID/${bannerData.product}`}>
            <button type='button'>{bannerData.buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{bannerData.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
