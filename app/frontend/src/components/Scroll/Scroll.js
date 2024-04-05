import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import './Scroll.css';
const Scroll = (props) => {
    const { productData } = props;
    const Arrow = ({ className }) => {
        return <i className={className}></i>;
    };

    const leftArrow = Arrow({ className: 'fas fa-chevron-left' });
    const rightArrow = Arrow({ className: 'fas fa-chevron-right' });
    return (
        <>
            <ScrollMenu
                wheel={false}
                translate={1}
                arrowLeft={leftArrow}
                arrowRight={rightArrow}
                hideSingleArrow={true}
                dragging={true}
                alignCenter={false}
                arrowDisabledClass={'hidearrow'}
                arrowClass="arrow"
            >
                {productData}
            </ScrollMenu>
        </>
    );
};

export default Scroll;
