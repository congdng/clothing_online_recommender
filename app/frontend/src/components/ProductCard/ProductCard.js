import React from 'react';
import { Link } from 'react-router-dom';
import Appbutton from '../../pieces/Button/Appbutton';
import Rating from '../Rating/Rating';
import './ProductCard.css';
const ProductCard = (props) => {
    const { product } = props;
    return (
        <>
            <div className="product">
                <div className="top">
                    <Link to={`/product/${product._id}`}>
                        <img
                            src={
                                typeof product.info !== 'undefined'
                                    ? product.info[0].imageLink
                                    : product.imageLink
                            }
                        />
                    </Link>
                    <div className="controls">
                        {
                            <Appbutton
                                clickEvent={() => {}}
                                text="View"
                                className="big"
                            ></Appbutton>
                        }
                    </div>
                </div>
                <div className="bottom">
                    <div className="name">
                        <span>
                            {typeof product.info !== 'undefined'
                                ? product.info[0].name
                                : product.name}
                        </span>
                        <Rating
                            value={
                                typeof product.info !== 'undefined'
                                    ? product.info[0].rating
                                    : product.rating
                            }
                            text={`${
                                typeof product.info !== 'undefined'
                                    ? product.info[0].numReviews
                                    : product.numReviews
                            } reviews`}
                        />
                        <h4 className="org_price">
                            $
                            {typeof product.info !== 'undefined'
                                ? product.info[0].price_org
                                : product.price_org}
                        </h4>
                        <h4 className="sale_price">
                            $
                            {typeof product.info !== 'undefined'
                                ? product.info[0].price_sale
                                : product.price_sale}
                        </h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
