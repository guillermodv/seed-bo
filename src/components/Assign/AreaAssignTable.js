import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row, Table} from 'react-bootstrap';
import {Dropdown} from '@indec/react-commons';

import {User} from '../../model';
import {getRowClassName} from '../../util';

const AreaAssignTable = ({
    assignments, supervisors, pollsters, onChange
}) => (
    <Row>
        <Col sm={12}>
            <Table striped>
                <thead>
                    <tr>
                        <th>UPS</th>
                        <th>Area</th>
                        <th>Supervisor</th>
                        <th>Actualizador</th>
                        <th>Total de viviendas</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map(assign => (
                        <tr key={assign.area} className={getRowClassName(assign)}>
                            <td className="text-center">{assign.ups}</td>
                            <td className="text-center">{assign.area}</td>
                            <td>
                                <Dropdown
                                    control="supervisor"
                                    onChange={e => onChange(e, assign)}
                                    value={assign.supervisor}
                                    options={supervisors}
                                    getOptionLabel={option => `${option.surname}, ${option.name} (${option.username})`}
                                    isClearable
                                />
                            </td>
                            <td>
                                <Dropdown
                                    control="pollster"
                                    onChange={e => onChange(e, assign)}
                                    value={assign.pollster}
                                    options={pollsters}
                                    getOptionLabel={option => `${option.surname}, ${option.name} (${option.username})`}
                                    isClearable
                                />
                            </td>
                            <td className="text-center">{assign.dwellingCount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
);

AreaAssignTable.propTypes = {
    onChange: PropTypes.func.isRequired,
    assignments: PropTypes.arrayOf(
        PropTypes.shape({
            ups: PropTypes.number.isRequired,
            area: PropTypes.number.isRequired,
            dwellingsCount: PropTypes.number.isRequired,
            subCoordinator: PropTypes.string,
            supervisor: PropTypes.string,
            pollster: PropTypes.string
        })
    ),
    supervisors: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    pollsters: PropTypes.arrayOf(PropTypes.instanceOf(User))
};

AreaAssignTable.defaultProps = {
    supervisors: [],
    pollsters: [],
    assignments: []
};

export default connect(state => ({
    sessionRoles: state.session.profile.roles
}))(AreaAssignTable);
