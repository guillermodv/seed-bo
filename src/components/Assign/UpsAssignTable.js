import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row, Table} from 'react-bootstrap';
import {Dropdown} from '@indec/react-commons';

import {User} from '../../model';
import {getRowClassName} from '../../util';
import {upsPropTypes} from '../../util/propTypes';

const UpsAssignTable = ({ups, subCoordinators, onChange}) => (
    <Row>
        <Col sm={12}>
            <Table striped>
                <thead>
                    <tr>
                        <th>UPS</th>
                        <th>Subcoordinador</th>
                    </tr>
                </thead>
                <tbody>
                    {ups.map(u => (
                        <tr key={u.ups} className={getRowClassName(u)}>
                            <td className="text-center">{u.ups}</td>
                            <td>
                                <Dropdown
                                    control="subCoordinator"
                                    value={u.subCoordinator}
                                    options={subCoordinators}
                                    getOptionLabel={option => `${option.surname}, ${option.name} (${option.username})`}
                                    onChange={e => onChange(e, u.ups)}
                                    isClearable
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
);

UpsAssignTable.propTypes = {
    onChange: PropTypes.func.isRequired,
    ups: PropTypes.arrayOf(upsPropTypes),
    subCoordinators: PropTypes.arrayOf(PropTypes.instanceOf(User)).isRequired
};

UpsAssignTable.defaultProps = {
    ups: []
};

export default connect(state => ({
    sessionRoles: state.session.profile.roles
}))(UpsAssignTable);
