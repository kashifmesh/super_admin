import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import './CustomRow.css';

const AdminRow = ({ gutter, style, children, classes }) => {
    const rowStyle = { style };

    return (
        <Row gutter={gutter} style={rowStyle} className={`${classes} admin-row `}>
            {children}
        </Row>
    );
};

AdminRow.propTypes = {
    gutter: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
        PropTypes.object,
    ]),
    style: PropTypes.string,
    children: PropTypes.node,
};


export default AdminRow;