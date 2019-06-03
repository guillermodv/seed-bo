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
    faUser, faPowerOff, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import {includes, isEmpty} from 'lodash';
import {TokenService} from '@indec/heimdall/client';
import {appLabel, roles} from '../../constants';
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
                                    {appLabel.APPNAME}
                                </strong>
                            </NavItem>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {!includes(profile.roles, roles.POLLSTER) && (
                            <Nav>
                                <NavItem onClick={() => redirect('/some')}>
                                    <FontAwesomeIcon icon={faUser}/>
                                    &nbsp;Some
                                </NavItem>
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
