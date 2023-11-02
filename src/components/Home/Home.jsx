import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainProduct from '../miniComponents/MainProduct/MainProduct';
import Categories from '../miniComponents/Categories/Categories';
import HomeMaiSlider from '../miniComponents/HomeMainSlider/HomeMaiSlider';
const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); 
    async function getProducts() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        setProducts(data.data);
        if (products.length > 0) {
            setLoading(false);
        }
        else {
            setLoading(true);
        }
    }
    useEffect(_ => {
        getProducts();
    }, [])
    return (
        <div>
            {!loading ? <div className="loader_container">
                <div className='loader'>loading</div>
            </div> :<>
            <HomeMaiSlider />
            <Categories />
            <div className="container">
                    <div className="row d-flex align-items-center justify-content-around mt-2">
                        {products.map(product => {
                            return <MainProduct key={product._id} productId={product.id} name={product.brand.name} imageCover={product.imageCover} title={product.title} price={product.price} rating={product.ratingsAverage} />
                        })}
                    </div>
            </div></>}
        </div>
    );
}

export default Home;
