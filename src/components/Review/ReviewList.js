import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row, Table} from 'react-bootstrap';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {IconLinkButton} from '@indec/react-commons';

import {getStatusLabel} from '../../util';

const formatUrl = (areaId, searchParams) => {
    if (searchParams.area) {
        return `/review/${areaId}/${searchParams.state}/${searchParams.ups}/${searchParams.area}/editor`;
    }
    if (searchParams.ups) {
        return `/review/${areaId}/${searchParams.state}/${searchParams.ups}/editor`;
    }
    if (searchParams.state) {
        return `/review/${areaId}/${searchParams.state}/editor`;
    }
    return `/review/${areaId}/editor`;
};

const ReviewList = ({areas, searchParams}) => (
    <Row>
        <Col sm={12}>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Area</th>
                        <th>Supervisor</th>
                        <th>Actualizador</th>
                        <th>Estado</th>
                        <th>Edición</th>
                        <th>Radio</th>
                        <th>Viviendas</th>
                    </tr>
                </thead>
                <tbody>
                    {areas.map(area => (
                        <tr key={area._id + area.area + area.radio}>
                            <td className="text-center">{area.area}</td>
                            <td className="text-center">{area.supervisor?.name}</td>
                            <td className="text-center">{area.pollster?.name}</td>
                            <td className="text-center">{getStatusLabel(area.status)}</td>
                            <td className="text-center">
                                <IconLinkButton
                                    to={formatUrl(area._id, searchParams)}
                                    icon={faSignInAlt}
                                />
                            </td>
                            <td className="text-center">
                                {area.data.map(datum => (
                                    <Fragment key={datum.radio}>
                                        {datum.radio}
                                        <br/>
                                    </Fragment>
                                ))}
                            </td>
                            <td className="text-center">
                                {area.data.map(datum => (
                                    <Fragment key={datum.radio}>
                                        {datum.dwellingCount}
                                        <br/>
                                    </Fragment>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
);

ReviewList.propTypes = {
    areas: PropTypes.arrayOf(
        PropTypes.shape({
            area: PropTypes.number,
            radio: PropTypes.number,
            dwellingCount: PropTypes.number,
            supervisor: PropTypes.string,
            pollster: PropTypes.string,
            status: PropTypes.number
        })
    ),
    searchParams: PropTypes.shape({
        department: PropTypes.string,
        fraction: PropTypes.string,
        locality: PropTypes.string,
        radio: PropTypes.string,
        state: PropTypes.string
    })
};

ReviewList.defaultProps = {
    areas: [],
    searchParams: {}
};

export default connect(state => ({
    searchParams: state.review.searchParams,
    areas: state.review.areas
}))(ReviewList);
