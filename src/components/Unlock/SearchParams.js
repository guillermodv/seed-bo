import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {IconButton, Dropdown} from '@indec/react-commons';

import {areaPropTypes, statePropTypes, upsPropTypes} from '../../util/propTypes';

const SearchParams = ({
    onChangeState, onChangeUps, onChange, onSubmit, searchParams, states, upsOptions, areaOptions
}) => (
    <Row>
        <Col sm={3}>
            <Dropdown
                label="Jurisdiccion"
                onChange={onChangeState}
                value={searchParams.state}
                control="state"
                options={states}
                isClearable
            />
        </Col>
        <Col sm={3}>
            <Dropdown
                label="UPS"
                onChange={onChangeUps}
                value={searchParams.ups}
                control="ups"
                options={upsOptions}
                getOptionLabel={option => option.ups}
                getOptionValue={option => option.ups}
                isClearable
            />
        </Col>
        <Col sm={3}>
            <Dropdown
                label="Area"
                onChange={onChange}
                value={searchParams.area}
                control="area"
                options={areaOptions}
                getOptionValue={option => option.area}
                getOptionLabel={option => option.area}
                isClearable
            />
        </Col>
        <Col sm={3}>
            <br/>
            <IconButton icon={faSearch} onClick={onSubmit} disabled={!searchParams.state || !searchParams.ups}>
                Buscar
            </IconButton>
        </Col>
    </Row>
);

SearchParams.propTypes = {
    onChange: PropTypes.func.isRequired,
    onChangeState: PropTypes.func.isRequired,
    onChangeUps: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    searchParams: PropTypes.shape({
        state: PropTypes.number,
        ups: PropTypes.number,
        area: PropTypes.number
    }),
    areaOptions: PropTypes.arrayOf(areaPropTypes),
    states: PropTypes.arrayOf(statePropTypes),
    upsOptions: PropTypes.arrayOf(upsPropTypes)
};

SearchParams.defaultProps = {
    searchParams: {},
    areaOptions: [],
    states: [],
    upsOptions: []
};

export default SearchParams;
