import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Paginate.css';
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    const totalPages = pages;
    const activePages = page;
    const createPaginationItem = (x) => {
        return (
            <LinkContainer
                key={x}
                to={
                    !isAdmin
                        ? keyword
                            ? `/shop/search/${keyword}/page/${x}`
                            : `/shop/page/${x}`
                        : `/admin/productlist/page/${x}`
                }
            >
                <Pagination.Item active={x === page}>{x}</Pagination.Item>
            </LinkContainer>
        );
    };
    const paginationItems = [];
    const midpoint = Math.round(totalPages / 2);
    if (
        activePages == 1 ||
        activePages == totalPages ||
        activePages == 2 ||
        activePages == totalPages - 1
    ) {
        paginationItems.push(createPaginationItem(1));
        paginationItems.push(createPaginationItem(2));
        paginationItems.push(<Pagination.Ellipsis />);
        for (let i = midpoint; i <= midpoint + 4; i++) {
            paginationItems.push(createPaginationItem(i));
        }
        paginationItems.push(<Pagination.Ellipsis />);
        paginationItems.push(createPaginationItem(totalPages - 1));
        paginationItems.push(createPaginationItem(totalPages));
    } else {
        paginationItems.push(createPaginationItem(1));
        paginationItems.push(<Pagination.Ellipsis />);
        for (let i = activePages; i <= midpoint + 4; i++) {
            paginationItems.push(createPaginationItem(i));
        }
        paginationItems.push(<Pagination.Ellipsis />);
        paginationItems.push(createPaginationItem(totalPages));
    }
    return pages > 1 && <Pagination>{paginationItems}</Pagination>;
};

export default Paginate;
