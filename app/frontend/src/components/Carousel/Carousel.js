import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider';
import './Carousel.css';
import { slideContent } from '../../constants/appConstant';
const Carousel = (props) => {
    const [duration] = useState(6000);
    const [play, setPlay] = useState(true);
    const [position, setPosition] = useState(0);
    const [check, setCheck] = useState(0);
    const slides = slideContent?.map((slide, i) => {
        return (
            <Slider
                key={i}
                className={`slide ${slide.class} ${
                    position % slideContent.length === i && 'active'
                }`}
                slide={slide}
                position={position}
            />
        );
    });
    const carouselnavigate = slideContent.map((slide, i) => {
        return (
            <div
                key={i}
                className={`carouselitem ${
                    position % slideContent.length === i && 'activecarouselitem'
                }`}
                onClick={() => {
                    setPosition(i);
                    setPlay(false);
                    setTimeout(() => {
                        setPlay(true);
                    }, 0);
                }}
            >
                <i className="fa-solid fa-grip-lines"></i>
            </div>
        );
    });
    useEffect(() => {
        setPosition(0);
    }, []);
    useEffect(() => {
        let timer;
        let check;
        if (play) {
            timer = setInterval(() => {
                setPosition((prev) => prev + 1);
                setCheck(0);
            }, duration);
            check = setInterval(() => {
                setCheck((prev) => prev + 1);
            }, 1);
        } else {
            clearInterval(timer);
            clearInterval(check);
            setCheck(0);
        }
        return () => {
            clearInterval(timer);
            clearInterval(check);
            setCheck(0);
        };
    }, [play, duration]);
    return (
        <div className="carouselbanner">
            <div className="slides">{slides}</div>
            <div className="carouselcontrols">
                {carouselnavigate}
                <div className="pause">
                    <i
                        onClick={() => setPlay(!play)}
                        className={play ? 'fas fa-pause' : 'fas fa-play'}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
