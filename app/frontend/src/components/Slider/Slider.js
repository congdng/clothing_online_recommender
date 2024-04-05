import React from 'react'
import { Link } from 'react-router-dom'
import Appbutton from '../../pieces/Button/Appbutton'
import './Slider.css'
const Slider = ( props ) => {
  const {title, subtitle, img, buttontext} = props.slide
  const {className} = props
    return (
    <div className={className}>
        <div className='slidecont'>
            <div className='slidetitle'>
                <h3>{subtitle}</h3>
                <h1>{title}</h1>
            </div>
            <Link to='/'>
                <Appbutton
                text={buttontext}
                icon='fa-solid fa-shop'>
                </Appbutton>
            </Link>
        </div>
        <img src={img} alt=''/>
    </div>
  )
}

export default Slider