import React from 'react'
import './Appbutton.css'

const Appbutton = (props) => {
    const {href, text, icon, clickEvent, className='', disabled} = props
  return (
    <button 
    className={className + ' appbutton'}
    onClick={()=> clickEvent && clickEvent()}
    disabled={disabled}>
        {icon && <i className={icon}></i>}
        {text && <span>{text}</span>}
    </button>
  )
}

export default Appbutton