import React from 'react';
import Slider from "react-slick";
const HomeMaiSlider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    var homeMainSliderImages = {
        src11: "https://img.freepik.com/psd-premium/cadre-cameras-maquette-table_23-2148391708.jpg?w=996",
        src12: "https://cdn.pixabay.com/photo/2014/10/16/09/15/lens-490806_1280.jpg",
        src13: "https://cdn.pixabay.com/photo/2020/02/08/14/28/camera-4830248_1280.jpg",
        src21: "https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_1280.jpg",
        src22: "https://media.istockphoto.com/id/1198444825/photo/charging-of-smart-phone-from-power-bank.jpg?s=612x612&w=0&k=20&c=sqmFz3k_GHfNhoSbpP0ko9Csh1Z5C_HcLAUAWCk9_gU=",
        src23: "https://cdn.pixabay.com/photo/2017/10/12/22/17/business-2846221_640.jpg"
    }
    return (
        <div className='HomeMainSlider m-0 p-0'>
            <div className="homeMainSliderDetails d-flex align-items-center justify-content-center">
                <div className="details">
                    E-COMMERCE WEB TEMPLATE
                </div>
                <p className='opacity col-3 text-center'>in this template i applied router(react-router-dom), react-cli-component, act with fake rest api(post, get, delete, put) ,Use(sate, effect), toast, formik, Yup, react slick slider + write using jsx, context, bootstrap,sass </p>
            </div>
            <Slider {...settings} className='d-flex align-items-center justify-content-center'>
                <div >
                    <div className='images-overlay'>
                    </div>
                    <div className="slide_1 row p-0 m-0">
                        <div className="slide_1_img_1 col-md-8 p-0 m-0"><img className='w-100 h-100' src={homeMainSliderImages.src11} alt="p-1" /></div>
                        <div className="slide_1_img_2 col-md-4 p-0 m-0">
                            <img className='w-100 h-50' src={homeMainSliderImages.src12} alt="p-1" />
                            <img className='w-100 h-50' src={homeMainSliderImages.src13} alt="p-1" />
                        </div>
                    </div>
                </div>
                <div >
                    <div className='images-overlay'></div>
                    <div className="slide_2 row p-0 m-0">
                        <div className="slide_1_img_1 col-md-8 p-0 m-0"><img className='w-100 h-100' src={homeMainSliderImages.src21} alt="p-1" /></div>
                        <div className="slide_1_img_2 col-md-4 p-0 m-0">
                            <img className='w-100 h-50' src={homeMainSliderImages.src22} alt="p-1" />
                            <img className='w-100 h-50' src={homeMainSliderImages.src23} alt="p-1" />
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default HomeMaiSlider;
