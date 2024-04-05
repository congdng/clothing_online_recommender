import React from 'react';
import { Link } from 'react-router-dom';
import './FooterColumn.css';
const PageFooterColumn = (props) => {
    const icons = [
        'https://i.imgur.com/4JoWdxf.png',
        'https://i.imgur.com/oWHKLnj.jpg',
        'https://i.imgur.com/SCFSSVs.png',
        'https://i.imgur.com/kuSZEpB.png',
    ];
    const { data, firstcolumn } = props;
    return (
        <div className="column">
            {firstcolumn ? (
                <>
                    <div>
                        <h3>Payment is supprorted by:</h3>
                        <div>
                            {icons?.map((icon, i) => {
                                return <img key={i} src={icon} alt="" />;
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h3>{data.title}</h3>
                    <div className="col">
                        {data.links.map((link, index) => {
                            return (
                                <Link key={index} to={`${link.link}`}>
                                    {link.text}
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default PageFooterColumn;
