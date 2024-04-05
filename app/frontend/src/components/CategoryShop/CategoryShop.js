import React from 'react';
import { Link } from 'react-router-dom';
import Appbutton from '../../pieces/Button/Appbutton';
import './CategoryShop.css';
import ProductCard from '../ProductCard/ProductCard';
import Scroll from '../Scroll/Scroll';
const CategoryShop = (props) => {
    const { img, title, subtitle, category, products } = props;
    // props.category = 'shirt'
    const productslide = products.map((product, i) => (
        <ProductCard product={product} key={i}/>
    ));
    return (
        <>
            <div className={`${category} containertype`}>
                <div className="frame">
                    <div className="framecont">
                        <h2>{title}</h2>
                        <h4>{subtitle}</h4>
                        <Link to={`./category/${category}`}>
                            <Appbutton
                                text={'View All'}
                                icon="fas fa-chevron-right"
                                className="reverse"
                            ></Appbutton>
                        </Link>
                    </div>
                    <img src={img} alt=""></img>
                </div>
            </div>
            <Scroll productData={productslide}></Scroll>
        </>
    );
};

export default CategoryShop;
