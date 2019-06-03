import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Col, Row, ButtonGroup} from 'react-bootstrap';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Dropdown, IconButton} from '@indec/react-commons';
import {includes, some} from 'lodash';
import {roles, types} from '../../constants';
import {areaPropTypes, upsPropTypes, statePropTypes} from '../../util/propTypes';
import {User} from '../../model';
import {AssignButton} from '../common';

const rolesToShowUpsAndArea = [roles.NATIONAL_COORDINATOR, roles.NATIONAL_COORDINATOR_RO, roles.COORDINATOR];

const handleAssignmentType = user => {
    if (some(rolesToShowUpsAndArea, role => includes(user.roles, role))) {
        return [{_id: types.UPS, name: 'UPS/SubCoordinador'}, {_id: types.AREA, name: 'Area'}];
    }
    return [{_id: types.AREA, name: 'Area'}];
};

const SearchParams = ({
    states,
    upsOptions,
    areaOptions,
    searchParams,
    profile,
    onChange,
    onChangeType,
    onChangeUps,
    onChangeArea,
    onSubmit,
    onAssign,
    disabled
}) => (
    <Fragment>
        <Row>
            <Col sm={12}>
                <hr className="hr-title"/>
            </Col>
        </Row>
        <Row>
            <Col sm={4}>
                <Dropdown
                    label="Jurisdiccion"
                    control="state"
                    value={searchParams.state}
                    onChange={onChange}
                    options={states}
                    isClearable
                />
            </Col>
            <Col sm={4}>
                <Dropdown
                    label="Tipo de asignación"
                    control="type"
                    value={searchParams.type}
                    onChange={onChangeType}
                    options={handleAssignmentType(profile)}
                    isClearable
                />
            </Col>
            <Col sm={4} className="text-right">
                <br/>
                <ButtonGroup>
                    <IconButton
                        icon={faSearch}
                        onClick={onSubmit}
                        disabled={!searchParams.state || !searchParams.type}
                    >
                        Buscar
                    </IconButton>
                    <AssignButton
                        onSubmit={onAssign}
                        disabled={disabled}
                        roles={searchParams.type === types.AREA
                            ? [roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]
                            : [roles.NATIONAL_COORDINATOR, roles.COORDINATOR]}
                    />
                </ButtonGroup>
            </Col>
        </Row>
        {searchParams.type === types.AREA && (
            <Row>
                <br/>
                <Col sm={4}>
                    <Dropdown
                        label="UPS"
                        control="ups"
                        value={searchParams.ups}
                        onChange={onChangeUps}
                        getOptionLabel={option => option.ups}
                        getOptionValue={option => option.ups}
                        options={upsOptions}
                        isClearable
                    />
                </Col>
                <Col sm={4}>
                    <Dropdown
                        label="Area"
                        control="area"
                        value={searchParams.area}
                        onChange={onChangeArea}
                        getOptionLabel={option => option.area}
                        getOptionValue={option => option.area}
                        options={areaOptions}
                        isClearable
                    />
                </Col>
            </Row>
        )}
    </Fragment>
);

SearchParams.propTypes = {
    onChange: PropTypes.func.isRequired,
    onChangeType: PropTypes.func.isRequired,
    onChangeUps: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onAssign: PropTypes.func.isRequired,
    onChangeArea: PropTypes.func.isRequired,
    profile: PropTypes.instanceOf(User).isRequired,
    states: PropTypes.arrayOf(statePropTypes),
    upsOptions: PropTypes.arrayOf(upsPropTypes),
    areaOptions: PropTypes.arrayOf(areaPropTypes),
    searchParams: PropTypes.shape({
        state: PropTypes.number,
        type: PropTypes.number,
        ups: PropTypes.number,
        area: PropTypes.number
    }),
    disabled: PropTypes.bool
};

SearchParams.defaultProps = {
    states: [],
    upsOptions: [],
    areaOptions: [],
    searchParams: {},
    disabled: false
};

export default SearchParams;
