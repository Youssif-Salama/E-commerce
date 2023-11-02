import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
const Categories = () => {
    const [categories, setCategories] = useState([]);
    async function getCategories() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setCategories(data.data);
    }
    useEffect(_ => {
        getCategories();
    }, [])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3
    };
    return (
        <div>
            <Slider {...settings}>
                {categories.map(category => {
                    return <div key={category._id}>
                        <img className='w-100 category-img' src={category.image} alt="category-img" />
                        <h6 className='text-info opacity'>{category.name}</h6>
                    </div>
                })}
            </Slider>
        </div>
    );
}

export default Categories;
