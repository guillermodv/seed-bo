import React from 'react';
import PropTypes from 'prop-types';
import {Pagination, Col, Row} from 'react-bootstrap';
import {times, uniqueId} from 'lodash';

import {DEFAULT_PAGE_SIZE} from '../../constants';

uniqueId('pagination');

const Paginate = ({
    onClick, size, current, total
}) => {
    const currentAmount = DEFAULT_PAGE_SIZE * (current + 1);
    const PAGE_SIZE_MINUS_ONE = DEFAULT_PAGE_SIZE - 1;
    const seeing = currentAmount > total ? total : currentAmount;
    return (
        <Row>
            <Col sm={1} md={1}>
                <br/>
                <code>
                    {currentAmount > seeing ? currentAmount - PAGE_SIZE_MINUS_ONE : seeing - PAGE_SIZE_MINUS_ONE}
                    &nbsp;-&nbsp;
                    {seeing}
                    &nbsp;de&nbsp;
                    {total}
                </code>
            </Col>
            <Col smOffset={1} mdOffset={1} sm={10} md={10} className="text-center">
                <Pagination>
                    <Pagination.First onClick={() => onClick(0)}/>
                    <Pagination.Prev onClick={() => onClick(current - 1 < 0 ? 0 : current - 1)}/>
                    {times(size, i => (
                        <Pagination.Item
                            key={uniqueId()}
                            active={current === i}
                            onClick={() => onClick(i)}
                            onTouchStart={() => onClick(i)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => onClick(current > size - 2 ? size - 1 : current + 1)}/>
                    <Pagination.Last onClick={() => onClick(size - 1)}/>
                </Pagination>
            </Col>
        </Row>
    );
};

Paginate.propTypes = {
    onClick: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default Paginate;
