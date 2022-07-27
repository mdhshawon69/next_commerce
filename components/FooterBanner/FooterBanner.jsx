import React from "react";
import Link from "next/link";
import { urlFor } from "../../lib/client";

const FooterBanner = ({ bannerData }) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{bannerData.discount}</p>
          <h3>{bannerData.largeText1}</h3>
          <h3>{bannerData.largeText2}</h3>
          <p>{bannerData.saleTime}</p>
        </div>
        <div className='right'>
          <p>{bannerData.smallText}</p>
          <h3>{bannerData.midText}</h3>
          <p>{bannerData.desc}</p>
          <Link href={`/product`}>
            <button type='button'>{bannerData.buttonText}</button>
          </Link>
        </div>
        <img
          src={urlFor(bannerData.image)}
          alt='banner'
          className='footer-banner-image'
        />
      </div>
    </div>
  );
};

export default FooterBanner;
