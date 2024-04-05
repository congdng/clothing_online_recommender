import React from 'react';
import { footercontent } from '../../constants/appConstant';
import './Footer.css';
import FooterColumn from './FooterColumn/FooterColumn';
const Footer = () => {
    const footerColumn = footercontent?.map((content, i) => {
        return <FooterColumn key={i} data={content}></FooterColumn>;
    });
    return (
        <div className="footer">
            <div className="grid">
                <div className="columns">
                    <FooterColumn firstcolumn></FooterColumn>
                    {footerColumn}
                </div>
            </div>
        </div>
    );
};

export default Footer;
