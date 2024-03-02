import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';
import img1 from '../imgs/broshi.webp';
import img2 from '../imgs/kolca.webp';
import img3 from '../imgs/podveski.webp';
import img4 from '../imgs/braslety.webp';
import img5 from '../imgs/kole.webp';
import img6 from '../imgs/brendy.webp';

const NextArrow = () => <div style={{display: "none"}}/>
const PrevArrow = () => <div style={{display: "none"}}/>

const MySlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={img1} className="d-block w-50" alt="..." />
        </div>
        <div>
          <img src={img2} className="d-block w-50" alt="..." />
        </div>
        <div>
          <img src={img3} className="d-block w-50" alt="..." />
        </div>
        <div>
          <img src={img4} className="d-block w-50" alt="..." />
        </div>
        <div>
          <img src={img5} className="d-block w-50" alt="..." />
        </div>
        <div>
          <img src={img6} className="d-block w-50" alt="..." />
        </div>
      </Slider>
    </div>
  );
};

export default MySlider;
