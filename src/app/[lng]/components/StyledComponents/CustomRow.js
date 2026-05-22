import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import './CustomRow.css';

const CustomRow = ({ gutter, style, children, classes }) => {
    const rowStyle = { style };

    return (
        <Row gutter={gutter} style={rowStyle} className={`${classes} custom-row `}>
            {children}
        </Row>
    );
};

CustomRow.propTypes = {
    gutter: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
        PropTypes.object,
    ]),
    style: PropTypes.string,
    children: PropTypes.node,
};


export default CustomRow;