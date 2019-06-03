import React from 'react';
import PropTypes from 'prop-types';
import {Polar} from 'react-chartjs-2';
import {
    filter, sumBy, reject, includes
} from 'lodash';
import {roles} from '../../constants';

const parseData = (users, state) => {
    const filteredUSers = filter(
        reject(users, u => (
            includes(u.roles, roles.NATIONAL_COORDINATOR) || includes(u.roles, roles.NATIONAL_COORDINATOR_RO))
        ),
        u => (state ? u.state === state : true)
    );
    const pollsters = sumBy(filteredUSers, u => includes(u.roles, roles.POLLSTER));
    const coordinators = sumBy(filteredUSers, u => includes(u.roles, roles.COORDINATOR));
    const subcoordinators = sumBy(filteredUSers, u => includes(u.roles, roles.SUB_COORDINATOR));
    const supervisors = sumBy(filteredUSers, u => includes(u.roles, roles.SUPERVISOR));
    const raes = sumBy(filteredUSers, u => includes(u.roles, roles.RAE));

    return {
        datasets: [{
            data: [
                supervisors,
                pollsters,
                subcoordinators,
                coordinators,
                raes
            ],
            backgroundColor: [
                '#018bc9',
                '#3b2681',
                '#dc006a',
                '#000',
                '#575759'
            ]
        }],
        labels: [
            'Jefe de Equipo',
            'Encuestadores',
            'Subcoordinadores',
            'Coordinadores',
            'Responsable Entrevista'
        ]
    };
};

const PersonsByRole = ({users, state}) => {
    const data = parseData(users, state);
    return (
        <Polar
            data={data}
            width={350}
            height={350}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12
                    }
                }
            }}
        />
    );
};

PersonsByRole.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({})),
    state: PropTypes.number
};

PersonsByRole.defaultProps = {
    users: null,
    state: null
};

export default PersonsByRole;
