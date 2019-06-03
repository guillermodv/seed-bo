/* global localStorage, window */
import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Nav, Navbar, NavItem, Alert
} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faUser, faArrowsAlt, faAlignJustify, faPencilAlt,
    faPowerOff, faExclamationTriangle, faUnlockAlt, faStickyNote, faSync
} from '@fortawesome/free-solid-svg-icons';
import {includes, isEmpty} from 'lodash';
import {TokenService} from '@indec/heimdall/client';
import {Role} from '@indec/react-commons';
import {roles} from '../../constants';
import {User} from '../../model';

const logOut = () => {
    TokenService.clear();
    localStorage.clear();
    window.location = '/';
};

const Header = ({profile, anErrorOccurred, history}) => {
    const redirect = to => {
        history.push(to);
    };

    if (profile && !profile._id) {
        logOut();
    }

    return (
        <header className="hidden-print">
            {profile && !isEmpty(profile._id) && (
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <NavItem onClick={() => redirect('/')}>
                                <strong className="logo-header">
                                    MMUVRA
                                </strong>
                            </NavItem>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {!includes(profile.roles, roles.POLLSTER) && (
                            <Nav>
                                <NavItem onClick={() => redirect('/users')}>
                                    <FontAwesomeIcon icon={faUser}/>
                                    &nbsp;Usuarios
                                </NavItem>
                                <Role
                                    roles={[
                                        roles.NATIONAL_COORDINATOR, roles.NATIONAL_COORDINATOR_RO
                                    ]}
                                    sessionRoles={profile.roles}
                                >

                                    <NavItem onClick={() => redirect('/unlock')}>
                                        <FontAwesomeIcon icon={faUnlockAlt}/>
                                        &nbsp;Apertura
                                    </NavItem>
                                </Role>
                                <Role
                                    roles={[roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]}
                                    sessionRoles={profile.roles}
                                >
                                    <NavItem onClick={() => redirect('/assign')}>
                                        <FontAwesomeIcon icon={faArrowsAlt}/>
                                    &nbsp;Asignaciones
                                    </NavItem>
                                </Role>
                                <NavItem onClick={() => redirect('/fieldMaterials')} >
                                    <FontAwesomeIcon icon={faAlignJustify}/>
                                    &nbsp;Muestra
                                </NavItem>
                                <NavItem onClick={() => redirect('/monitoring')} >
                                    <FontAwesomeIcon icon={faPencilAlt}/>
                                    &nbsp;Monitoreo
                                </NavItem>
                                <NavItem onClick={() => redirect('/review')} >
                                    <FontAwesomeIcon icon={faStickyNote}/>
                                    &nbsp;Revisión
                                </NavItem>
                                <Role
                                    roles={[
                                        roles.NATIONAL_COORDINATOR, roles.NATIONAL_COORDINATOR_RO, roles.COORDINATOR
                                    ]}
                                    sessionRoles={profile.roles}
                                >
                                    <NavItem onClick={() => redirect('/logs')}>
                                        <FontAwesomeIcon icon={faSync}/>
                                        &nbsp;Sincronizaciones
                                    </NavItem>
                                </Role>
                            </Nav>
                        )}
                        <Nav pullRight>
                            <NavItem onClick={() => logOut()}>
                                <FontAwesomeIcon icon={faPowerOff}/>
                                    &nbsp;Cerrar sesión
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}
            {anErrorOccurred && (
                <Alert bsStyle="danger" bsSize="large" className="text-center">
                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                    &nbsp;
                    Hubo un error con la comunicación hacia el servidor, intente nuevamente más tarde
                    &nbsp;
                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                </Alert>
            )}
        </header>
    );
};

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    profile: PropTypes.instanceOf(User),
    anErrorOccurred: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

Header.defaultProps = {
    history: null,
    profile: null,
    anErrorOccurred: null
};

export default withRouter(connect(
    state => ({
        profile: state.session.profile,
        anErrorOccurred: state.error.anErrorOccurred
    })
)(Header));
