import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import './Steps_Row.css';

const Steps_Row = ({ gutter, style, children, classes }) => {
    const rowStyle = { style };

    return (
        <Row gutter={gutter} style={rowStyle} className={`${classes} step1_row `}>
            {children}
        </Row>
    );
};

Steps_Row.propTypes = {
    gutter: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
        PropTypes.object,
    ]),
    style: PropTypes.string,
    children: PropTypes.node,
};


export default Steps_Row;